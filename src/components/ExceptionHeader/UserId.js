import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableCell } from "@mui/material";

const BaseUrl = process.env.REACT_APP_BASE_URL+"api/";

const UserId = ({ exceptionID}) => {
  const [userName, setUserName] = useState("----");

  useEffect(() => {
    const dataToSend = {
      exceptionId: exceptionID,
    };

    axios
      .get(BaseUrl + "getUserId/" + exceptionID, dataToSend)
      .then((response) => {
        
        //console.log(response.data);
        const responseData = response.data;

        if (responseData === "NA") {
          setUserName("----");
        } else {
          setUserName(responseData);
        }
        
      })  
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  }, [exceptionID]);

  return <TableCell>{userName}</TableCell>;
};

export default UserId;
