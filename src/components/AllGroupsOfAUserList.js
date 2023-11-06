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

import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { unmapUserAndGroup } from "./store/features/userGroup/userGroupSlice";
import { toast } from "react-toastify";
import { userGroupActions } from "./store/features/userGroup/userGroupSlice";

const AllGroupsOfAUserList = () => {
  const message = useSelector((state) => state.group.message);
  const isError = useSelector((state) => state.group.isError);
  const isLoading = useSelector((state) => state.group.isLoading);
  const roleArr = useSelector((state) => state.auth.userInfo.roles); // to be decided by api response
  const role = roleArr.find((role) => role === "ROLE_ADMIN");

  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  const search = useSelector((state) => state.search.searchValue);

  const [userGroups, setUserGroups] = useState([]);
  const [filteredUserGroups, setFilteredUserGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const { username } = useParams();
  const [groupIdToDelete, setGroupIdToDelete] = useState(null);
  const [newFetch, setnewFetch] = useState(true);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGroupIdToDelete(null);
  };

  const handleDeleteUserGroupOfThisUser = () => {
    if (groupIdToDelete) {
      const payload = {
        username: username,
        groupId: groupIdToDelete,
      };
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

  // filter userGroups of this user using searchbar in header
  useEffect(() => {
    setFilteredUserGroups(
      userGroups?.filter(
        (usergroup) =>
          usergroup?.groupId.toLowerCase().match(search?.toLowerCase()) ||
          usergroup?.groupName.toLowerCase().match(search?.toLowerCase()) ||
          usergroup?.description.toLowerCase().match(search?.toLowerCase())
      )
    );
  }, [search, userGroups, dispatch]);

  // fetching all userGroups of this user
  useEffect(() => {
    if (newFetch) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}users/${username}/groups`, {
          "Access-Control-Allow-Origin": true,
          Authorization: "Bearer " + accessToken,
        })
        .then(
          (response) => {
            if (response.data.data) {
              setUserGroups(response.data.data);
            }
          },
          (e) => e.data
        );
      setnewFetch(false);
    }
  }, [setUserGroups, accessToken, username, open, groupIdToDelete, newFetch]);

  const tableStyles = {
    borderRadius: "0.5rem",
  };

  return (
    <>
      <main
        style={{
          marginLeft: role ? "30px" : "0",
          marginTop: role ? "10px" : "30px",
        }}
      >
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
                  <strong>Group ID</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Group Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Group Description</strong>
                </TableCell>
                {/* <TableCell align="center">
                  <strong>Users</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Update</strong>
                </TableCell> */}
                {role && (
                  <TableCell align="center">
                    <strong>Delete</strong>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUserGroups?.map((usergroup, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{usergroup.groupId}</TableCell>
                  <TableCell align="center">{usergroup.groupName}</TableCell>
                  <TableCell align="center">{usergroup.description}</TableCell>
                  {role && (
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setGroupIdToDelete(usergroup.groupId);
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
                          {"Delete User Group From This User?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are You Sure You Want To Delete This User Group Of
                            This User?
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
                            onClick={() => handleDeleteUserGroupOfThisUser()}
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
};

export default AllGroupsOfAUserList;
