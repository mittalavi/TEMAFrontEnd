import {
  Autocomplete,
  TextField,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addusersInTheGroup,
  userGroupActions,
} from "./store/features/userGroup/userGroupSlice";

const AddUserToAGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const message = useSelector((state) => state.group.message);
  const isError = useSelector((state) => state.group.isError);
  const isLoading = useSelector((state) => state.group.isLoading);
  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);

  const [users, setUsers] = useState([]);
  const [selectedusers, setSelectedUsers] = useState([]);
  const [newFetch, setnewFetch] = useState(true);
  const dispatch = useDispatch();

  // displaying messages sent by backend
  useEffect(() => {
    if (!isLoading) {
      if (message) {
        toast(message, {
          type: isError ? "error" : "success",
        });
        if (!isError) {
          setnewFetch(true);
          navigate(-1);
        }
        dispatch(userGroupActions.messageReset());
      }
    }
  }, [message, isError, dispatch, isLoading,navigate]);

  useEffect(() => {
    if (newFetch) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}usergroups/${groupId}/usersnotingroup`,
          {
            "Access-Control-Allow-Origin": true,
            Authorization: "Bearer " + accessToken,
          }
        )
        .then((response) => {
          return setUsers(response.data.data);
        });
    }
    setnewFetch(false);
  }, [groupId, newFetch, dispatch, accessToken]);


  const handleOnSubmit = (e) => {
    e.preventDefault();
    //console.log(selectedusers);
    const object ={
        groupId:groupId,
        username:selectedusers
    }
    dispatch(addusersInTheGroup(object));
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Select users to Add to group
      </Typography>
      <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 3 }}>
        <Autocomplete
          // fullWidth
          multiple
          value={selectedusers}
          // disablePortal
          id="users"
          options={users?.map((user) => user.username)}
          renderInput={(params) => <TextField {...params} label="users" />}
          onChange={(e, newValue) => {
            setSelectedUsers(newValue);
          }}
        ></Autocomplete>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Users
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddUserToAGroup;