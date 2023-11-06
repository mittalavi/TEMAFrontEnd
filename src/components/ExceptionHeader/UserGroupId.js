import React, { useEffect, useState , useMemo } from "react";
import axios from "axios";
import { TableCell } from "@mui/material";

const BaseUrl = process.env.REACT_APP_BASE_URL+"api/";

const UserGroupId = ({ exceptionID , updateData}) => {
  const [userGroupName, setUserGroupName] = useState("----");

  useEffect(() => {
    const dataToSend = {
      exceptionId: exceptionID,
    };

    axios
      .get(BaseUrl + "getUserGroupId/" + exceptionID, dataToSend)
      .then((response) => {
        
        //console.log(response.data);
        const responseData = response.data;

        if (responseData === "NA") {
            setUserGroupName("----");
        } else {
            setUserGroupName(responseData);
        }

       
      })  
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  }, [exceptionID]); 

  return useMemo(() => <TableCell>{userGroupName}</TableCell>, [userGroupName]);
};

export default UserGroupId;
