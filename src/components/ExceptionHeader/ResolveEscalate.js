import React, { useEffect, useState } from "react";

import ConstructionIcon from "@mui/icons-material/Construction";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import axios from "axios";

import { TableCell, Button } from "@mui/material";

import { useSelector } from "react-redux";
import {toast} from 'react-toastify'

const BaseUrl = process.env.REACT_APP_BASE_URL + "api/";

const ResolveEscalateButton = ({ row, updateData }) => {
  const [groupNames, setGroupNames] = useState([]);

  const [escalationGroupPresent, setEscalationGroupPresent] = useState(false);

  const username = useSelector((state) => state.auth.userInfo.username);

  useEffect(() => {
    const apiUrl = BaseUrl + `getUserGroups/${username}`;

    axios
      .get(apiUrl)

      .then((response) => {
        let responseGroupNames = [];

        if (response === null) {
          responseGroupNames = [];
        } else {
          responseGroupNames = response.data.map((obj) => obj.id);
        }

        setGroupNames(responseGroupNames);

        const isEscalationGroupPresent =
          responseGroupNames.includes("EscalationGroup");

        setEscalationGroupPresent(isEscalationGroupPresent);
      })

      .catch((error) => {
        console.error("Error fetching group names:", error);
      });
  }, []);

  function resolveToast() {
    toast("Exception Resolved and Sent to 4 Eye Check !!", {
      type: "success",

      autoClose: 2000,
    });
  }
  const handleEscalateClick = () => {
    //console.log(`Escalated exception ${row.exceptionId}`);

    const dataToSend = {
      exceptionId: row.exceptionId,

      resolutionCount: row.resolutionCount.toString(),
    };

    axios

      .post(BaseUrl + "groupToEscalation", dataToSend)

      .then((response) => {
        //console.log("Assignment successful", response.data);

        updateData();
      })

      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  function escalateToast() {
    toast("Exception Escalated !!", {
      type: "success",

      autoClose: 2000,
    });
  }

  const handleResolveClick = () => {
    //console.log(`Resolved exception ${row.exceptionId}`);

    const dataToSend = {
      exceptionId: row.exceptionId,

      resolutionCount: "-1",
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

  const handleEscalateResolveClick = () => {
    //console.log(`Resolved exception ${row.exceptionId}`);

    const dataToSend = {
      exceptionId: row.exceptionId,

      resolutionCount: "-1",
    };

    axios

      .post(BaseUrl + "escalationToFourEyeCheck", dataToSend)

      .then((response) => {
        //console.log("Assignment successful", response.data);

        updateData();
      })

      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  return (
    <TableCell>
      {escalationGroupPresent ? (
        <React.Fragment>
          <Button
            disabled={row["resolutionCount"] !== row["resolutionSteps"].length}
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#304D6D",
              borderColor: "#304D6D",
            }}
            startIcon={<ConstructionIcon />}
            onClick={()=> {handleEscalateResolveClick();resolveToast()}}
          >
            Resolve
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {row["resolutionCount"] !== row["resolutionSteps"].length ? (
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#304D6D",
                borderColor: "#304D6D",
              }}
              startIcon={<ArrowUpwardIcon />}
              onClick={()=> {handleEscalateClick();escalateToast()}}
            >
              Escalate
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#304D6D",
                borderColor: "#304D6D",
              }}
              startIcon={<ConstructionIcon />}
              onClick={()=> {handleResolveClick(); resolveToast()}}
            >
              Resolve
            </Button>
          )}
        </React.Fragment>
      )}
    </TableCell>
  );
};

export default ResolveEscalateButton;
