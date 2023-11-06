import React ,{useMemo}from "react";
import { TableCell } from "@mui/material";

const UserGroupIdChild = ({ userGroupName }) => {
  // Check if the userGroupName is not available or loading
  if (userGroupName === null) {
    return <TableCell>Loading...</TableCell>;
  }

  return <TableCell>{userGroupName || "NA"}</TableCell>;
};

export default UserGroupIdChild;
