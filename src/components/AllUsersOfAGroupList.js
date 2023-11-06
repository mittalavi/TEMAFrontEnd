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
} from "@mui/material";

import {
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchAction } from "./store/features/search/searchSlice";
import { unmapUserAndGroup } from "./store/features/userGroup/userGroupSlice";
import {toast} from "react-toastify"
import { userGroupActions } from "./store/features/userGroup/userGroupSlice";
import AddButton from "./AddButton";

const AllUsersOfAGroupList = () => {
  const message = useSelector((state) => state.group.message);
  const isError = useSelector((state) => state.group.isError);
  const isLoading = useSelector((state) => state.group.isLoading);

  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  const search = useSelector((state) => state.search.searchValue);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const { groupId } = useParams();
  const [userToDelete, setUserToDelete] = useState(null);
  const [newFetch, setnewFetch] = useState(true);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteUserFromThisUserGroup = () => {
    if (userToDelete) {
      const payload = {
        username:userToDelete,
        groupId:groupId
      }
      dispatch(unmapUserAndGroup(payload));
    }
  };

// displaying messages sent by backend
useEffect(() => {
  if (!isLoading) {
    if (message) {
      toast(message, {
        type: isError ? "error" : "success",
      });
      if (!isError) {
        handleClose();
        setnewFetch(true);
      }
      dispatch(userGroupActions.messageReset());
    }
  }
}, [message, isError, dispatch, isLoading]);


  // filter users of this usergroup using searchbar in header
  useEffect(() => {
    setFilteredUsers(
      users?.filter(
        (user) =>
          user?.username.toLowerCase().match(search.toLowerCase()) ||
          user?.firstName.toLowerCase().match(search.toLowerCase()) ||
          user?.lastName.toLowerCase().match(search.toLowerCase()) ||
          user?.role.toLowerCase().match(search.toLowerCase())
      )
    );

    return () => {
      dispatch(searchAction.reset());
    };
  }, [search, users, dispatch]);

  // fetching all users of this group
  useEffect(() => {
    if (newFetch) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}usergroups/${groupId}/users`, {
          "Access-Control-Allow-Origin": true,
          Authorization: "Bearer " + accessToken,
        })
        .then(
          (response) => {
            setUsers(response.data.data);
          },
          (e) => e.data
        );
        setnewFetch(false);
    }
  }, [setUsers, accessToken, dispatch, groupId,newFetch]);

  const tableStyles = {
    borderRadius: "0.5rem",
  };

  return (
    <>
      <AddButton usergrp={false}/>
      <main style={{ marginLeft: "30px", marginTop: "10px" }}>
        <TableContainer component={Paper} elevation={3} sx={tableStyles}>
          <Table>
            <TableHead
              background="black"
              sx={{
                background: "black",
                ".MuiTableCell-root": {
                  color: "white",
                  textTransform: "Uppercase",
                },
              }}
            >
              <TableRow>
                <TableCell align="center">
                  <strong>Username</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>First Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Role</strong>
                </TableCell>
                {/* <TableCell align="center">
                  <strong>User Group</strong>
                </TableCell> */}
                {/* <TableCell align="center">
                  <strong>Update</strong>
                </TableCell> */}
                <TableCell align="center">
                  <strong>Delete</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers?.map((user, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  {/* <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="info"
                      startIcon={<GroupsIcon />}
                      component={Link}
                      to={`/dashboard/user-management/usergroups/${user.username}`}
                    >
                      Show Groups
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<EditIcon />}
                      component={Link}
                      to={`update-user/${user.username}`}
                    >
                      Update
                    </Button>
                  </TableCell> */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setUserToDelete(user.username);
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
                        {"Delete User From User Group?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are You Sure You Want To Delete This User From This
                          User Group?
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
                          onClick={handleDeleteUserFromThisUserGroup}
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
      </main>
    </>
  );
};

export default AllUsersOfAGroupList;
