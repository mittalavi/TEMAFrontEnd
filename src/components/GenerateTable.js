import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
  Collapse,
  Typography,
  Stack,
  TablePagination,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userGroupActions } from "./store/features/userGroup/userGroupSlice";
import { userActions } from "./store/features/user/userSlice";

const GenerateTable = ({
  endpoint,
  tableHeaders,
  mapDataToRow,
  deleteAction,
  updatePath,
  linkPath,
  tableTitle,
  searchEndPoint,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setNewFetch(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setNewFetch(true);
  };

  const message = useSelector((state) =>
    searchEndPoint === "users" ? state.auth.message : state.group.message
  );
  const isError = useSelector((state) =>
    searchEndPoint === "users" ? state.auth.isError : state.group.isError
  );
  const isLoading = useSelector((state) =>
    searchEndPoint === "users" ? state.auth.isLoading : state.group.isLoading
  );

  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  const loggedInUsername = useSelector((state) => state.auth.userInfo.username);
  const search = useSelector((state) => state.search.searchValue);
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newFetch, setNewFetch] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);

  const theme = useTheme();

  // const { username, groupId } = useParams();

  // //console.log("username = ", username)
  // //console.log("groupId = ", groupId)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      //console.log(itemToDelete);
      deleteAction(itemToDelete);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (message) {
        toast(message, {
          type: isError ? "error" : "success",
        });
        if (!isError) {
          handleClose();
          setNewFetch(true);
        }
        dispatch(
          searchEndPoint === "users"
            ? userActions.messageReset()
            : userGroupActions.messageReset()
        );
      }
    }
  }, [message, isError, dispatch, isLoading,searchEndPoint]);

  // useEffect(() => {
  //   setFilteredData(
  //     data?.filter((item) =>
  //       tableHeaders.some((header) =>
  //         item[header.key].toLowerCase().includes(search.toLowerCase())
  //       )
  //     )
  //   );
  // }, [search, data, tableHeaders, dispatch]);

  useEffect(() => {
    // setFilteredData(
    //   data?.filter((item) =>
    //     tableHeaders.some((header) =>
    //       item[header.key].toLowerCase().includes(search.toLowerCase())
    //     )
    //   )
    // );
    // if (searchEndPoint !== "usergroups") {
    if (flag) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}${searchEndPoint}/search/resource?search=${search}`,
          {
            "Access-Control-Allow-Origin": true,
            Authorization: "Bearer " + accessToken,
          }
        )
        .then(
          (response) => {
            setData(response.data.data);
            setTotalPages(response.data.totalRecords);
          },
          (e) => e.data
        );
    }
    setFlag(true);
    // }
  }, [search, accessToken, searchEndPoint, flag]);

  useEffect(() => {
    if (newFetch) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}${endpoint}?pageNumber=${
            page + 1
          }&pageSize=${rowsPerPage}`,
          {
            "Access-Control-Allow-Origin": true,
            Authorization: "Bearer " + accessToken,
          }
        )
        .then(
          (response) => {
            setData(response.data.data);
            setTotalPages(response.data.totalRecords);
          },
          (e) => e.data
        );
    }
    setNewFetch(false);
  }, [accessToken, newFetch, page, endpoint, rowsPerPage]);

  const tableStyles = {
    borderRadius: "0.5rem",
  };

  

  return (
    <>
      <main style={{ marginLeft: "30px", marginTop: "10px" }}>
        <Stack
          direction="row"
          spacing={2}
          margin={1}
          alignItems={"center"}
          onClick={() => setCollapse(!collapse)}
        >
          <IconButton aria-label="expand row" size="small">
            {collapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>

          <Typography
            sx={{
              color: "black",
              lineHeight: 1,
              align: "flex-start",
              cursor: "pointer",
            }}
            variant="h6"
          >
            {tableTitle}
          </Typography>
        </Stack>

        <Collapse in={!collapse} timeout="auto" unmountOnExit>
          <TableContainer component={Paper} elevation={3} sx={tableStyles}>
            <Table>
              <TableHead
                background="black"
                sx={{
                  background: "black",
                  ".MuiTableCell-root": {
                    color: "white",
                    textTransform: "uppercase",
                  },
                }}
              >
                <TableRow>
                  {tableHeaders?.map((header, index) => (
                    <TableCell key={index} align="center">
                      <strong>{header.label}</strong>
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <strong>Update</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Delete</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    {tableHeaders?.map((header, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        component={header.link ? Link : "td"}
                        to={
                          header.link
                            ? `${linkPath}/${
                                linkPath === "usergroups"
                                  ? item.username
                                  : item.groupId
                              }`
                            : ""
                        }
                        sx={
                          header.link
                            ? {
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                                textDecoration: "none",
                                ":hover": {
                                  textDecoration: "underline",
                                },
                              }
                            : {}
                        }
                      >
                        {mapDataToRow(item, header.key)}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="warning"
                        startIcon={<EditIcon />}
                        component={Link}
                        to={`${updatePath}/${item[tableHeaders[0].key]}`}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        disabled={loggedInUsername=== item.username}
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          //console.log('abc')
                          setItemToDelete(
                            searchEndPoint === "users"
                              ? item.username
                              : item.groupId
                          );
                          handleClickOpen();
                        }}
                      >
                        Delete
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{
                          ".MuiBackdrop-root.MuiModal-backdrop": {
                            backgroundColor: "rgba(0, 0, 0, 0.1) !important",
                            boxShadow: "none",
                          },
                        }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Delete Item?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this item?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            color="error"
                            disableElevation
                            onClick={handleClose}
                          >
                            No
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            disableElevation
                            onClick={handleDeleteItem}
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalPages}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Collapse>
      </main>
    </>
  );
};

export default GenerateTable;
