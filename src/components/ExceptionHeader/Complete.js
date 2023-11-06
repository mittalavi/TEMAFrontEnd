import React, { useState } from "react";

import { TableCell, Button } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import axios from "axios";
import {toast} from 'react-toastify';
const BaseUrl = process.env.REACT_APP_BASE_URL + "api/";

const Complete = ({ row, updateData }) => {
  const handleResolveClick = () => {
    //console.log(`Resolved exception ${row.exceptionId}`);

    const dataToSend = {
      exceptionId: row.exceptionId,
      resolutionCount : row.resolutionSteps.length.toString(),
    };

    axios

      .post(BaseUrl + "groupToFourEyeCheck", dataToSend)

      .then((response) => {
        //console.log("Assignment successful", response.data);

        updateData();
      })

      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  function fourEyeCheckToast() {
    toast("4 Eye Check Completed and Exception Closed!!", {
      type: "success",

      autoClose: 2000,
    });
  }
  return (
    <TableCell>
      <Button
        disabled={row["resolutionCount"] !== row["resolutionSteps"].length}
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "#0E4749",
          borderColor: "0E4749",
        }}
        startIcon={<CheckIcon />}
        onClick={()=> {handleResolveClick(); fourEyeCheckToast()}}
      >
        COMPLETE
      </Button>
    </TableCell>
  );
};

export default Complete;