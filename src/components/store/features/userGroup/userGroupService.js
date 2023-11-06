import axios from "axios";
import { async } from "q";

const registerUserGroup = async (userGroupData, accessToken) => {
  //console.log(accessToken);
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + "usergroups/registerusergroup",
    userGroupData,
    {
      "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    }
  );
  return response.data;
};

const getUserGroup = async (groupId) => {
  const response = await axios
    .get(`${process.env.REACT_APP_BASE_URL}usergroups/findusergroup/${groupId}`)
    .then((response) => {
      const prefill = response.data.data;
      let defaults = {
        groupId: prefill.groupId,
        groupName: prefill.groupName,
        description: prefill.description,
      };
      return defaults;
    });
  return response;
};

const updateUserGroup = async (userGroupData, accessToken) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_URL}usergroups/updategroup/${userGroupData.groupId}`,
    userGroupData,
    {
      "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    }
  );
  return response.data;
};

const unmapUserAndGroup = async (username, groupId, accessToken) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}usergroups/removeusergroup/${username}/${groupId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  return response.data;
};

const deleteUserGroup = async (groupId, accessToken) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}usergroups/delete/${groupId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  return response.data;
};

const addusersInTheGroup = async (groupId, username, accessToken) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}usergroups/addusers/${groupId}/`,
    { username: username },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  return response.data;
};

const getAllUserGroups = async (username, accessToken) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}users/${username}/groups`,
    {
      "Access-Control-Allow-Origin": true,
      Authorization: "Bearer " + accessToken,
    }
  )
  return response.data;
};

const userGroupService = {
  registerUserGroup,
  getUserGroup,
  updateUserGroup,
  deleteUserGroup,
  unmapUserAndGroup,
  addusersInTheGroup,
  getAllUserGroups
};

export default userGroupService;
