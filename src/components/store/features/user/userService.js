import axios from "axios";

const loginUser = async (userData) => {
  console.log(process.env.REACT_APP_BASE_URL);
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}api/auth/signin`,
    userData
  );
  return response.data;
};

const registerUser = async (userData, accessToken) => {
  //console.log(userData, accessToken);
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}users/registeruser`,
    userData,
    {
      "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    }
  );
  return response.data;
};

const getUser = async (username, accessToken) => {
  const response = await axios
    .get(`${process.env.REACT_APP_BASE_URL}users/finduser/${username}`, {
      "Access-Control-Allow-Origin": true,
      Authorization: "Bearer " + accessToken,
    })
    .then((response1) => {
      return axios
        .get(`${process.env.REACT_APP_BASE_URL}users/${username}/groups`, {
          "Access-Control-Allow-Origin": true,
          Authorization: "Bearer " + accessToken,
        })
        .then((response2) => {
          const prefill = response1.data.data;
          const prefillgroups = response2.data.data;
          const selectedGroups = prefillgroups?.map((grp) => grp.groupId);
          let defaults = {
            username: prefill.username,
            email: prefill.email,
            firstName: prefill.firstName,
            lastName: prefill.lastName,
            userRole: prefill.role,
            userGroups: selectedGroups,
          };
          return defaults;
        });
    });
  return response;
};

const updateUser = async (userData, accessToken) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_URL}users/update/${userData.username}`,
    userData,
    {
      "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    }
  );
  return response.data;
};

const deleteUser = async (username, accessToken) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}users/delete/${username}`,
    {
      "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    }
  );
  return response.data;
};

const logout = async (accessToken) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}api/auth/logout`,
    {
      "Access-Control-Allow-Origin": true,
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    }
  );
  return response.data;
};

const userService = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  logout,
};

export default userService;