import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { TableCell, Button } from "@mui/material";
import {toast} from 'react-toastify'
 
const BaseUrl = process.env.REACT_APP_BASE_URL + "api/";

const Claim = ({
  exceptionID,
  username,
  updateData,
  listNumber,
  isEscalatedGroupUser,
  resolutionCount,
}) => {
  const handleClaimClick = () => {
    //console.log(
      // `Assigned exception ${exceptionID} to user with ID:${username}`
    // );

    const dataToSend = {
      exceptionId: exceptionID,
      userId: username,
      resolutionCount:
        listNumber === 4 ? "0" : isEscalatedGroupUser ? resolutionCount.toString() : "0",
    };

    axios
      .post(BaseUrl + "claimUser", dataToSend)
      .then((response) => {
        //console.log("Assignment successful", response.data);
        updateData();
      })
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  function claimToast() {
    toast("Exception Claimed !!", {
      type: "success",

      autoClose: 2000,
    });
  }

  return (
    <TableCell>
      <Button
        variant="contained"
        color="success"
        startIcon={<CheckIcon />}
        onClick={()=> {handleClaimClick(); claimToast()}}
      >
        CLAIM
      </Button>
    </TableCell>
  );
};

export default Claim;
