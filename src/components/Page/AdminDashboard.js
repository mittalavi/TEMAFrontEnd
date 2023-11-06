import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import CardComponent from "../CardComoponent";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  const [flag,setFlag] = useState(true);

  const [groups, setGroups] = useState([]);
  const [openAssigned, setOpenAssigned] = useState(true);
  const [openCompleted, setOpenCompleted] = useState(true);
  const [openEscalated, setOpenEscalated] = useState(true);
  const [escalatedResponse, setEscalatedResponse] = useState(true);

  useEffect(() => {
    if(flag){
      axios
      .get(`${process.env.REACT_APP_BASE_URL}usergroups/allgroupnames`)
      .then((response) => {
        setGroups(response.data.data);
      });
      setFlag(false);
    }
  }, [flag]);

  useEffect(() => {
    console.log(groups);
  }, [groups]);

  useEffect(() => {
    console.log(escalatedResponse,typeof escalatedResponse);
  }, [escalatedResponse]);

  useEffect(() => {
    const escalated = {
      DataAnomalyGroup: 20,
      TradeSettlementGroup: 30,
      CounterPartyRelationshipTeam: 40,
    };
  
    if (groups?.length > 0) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}history/escalated/groups`, {
          "Access-Control-Allow-Origin": true,
          authorization: accessToken,
        })
        .then((response) => {
          // console.log('in response of escalated')
          setEscalatedResponse(response.data.data);
        })
        .catch((error) => {
          // console.log(error);
          // console.log('in error of escalated')
          // setEscalatedResponse(escalated)
        });
    }
  }, [groups, accessToken]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
          User group stats
        </Typography>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 2,
          }}
        >
          <Container maxWidth="xl">
            <Stack
              direction="row"
              spacing={2}
              margin={2}
              alignItems={"center"}
              onClick={() => {
                setOpenAssigned((state) => !state);
              }}
            >
              <IconButton aria-label="expand row" size="small">
                {!openAssigned ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>

              <Typography
                variant="h6"
                sx={{ mb: 1, textAlign: "left", cursor: "pointer" }}
              >
                {" "}
                Assigned Exceptions
              </Typography>
            </Stack>
            {openAssigned && (
              <Grid
                container
                spacing={3}
                flexDirection={"row"}
                flexWrap={"wrap"}
              >
                {groups?.map((group, index) => (
                  <Grid item xs={12} lg={6} key={index}>
                    <CardComponent
                      title="Exceptions"
                      group={group}
                      link="assigned"
                      sx={{ height: "100%" }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            <Stack
              direction="row"
              spacing={2}
              margin={2}
              mt={4}
              alignItems={"center"}
              onClick={() => {
                setOpenCompleted((state) => !state);
              }}
            >
              <IconButton aria-label="expand row" size="small">
                {!openCompleted ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>

              <Typography variant="h6" sx={{ cursor: "pointer" }}>
                {" "}
                Completed Exceptions
              </Typography>
            </Stack>
            {openCompleted && (
              <Grid
                container
                spacing={3}
                flexDirection={"row"}
                flexWrap={"wrap"}
              >
                {groups?.map((group, index) => (
                  <Grid item xs={12} lg={6} key={index}>
                    <CardComponent
                      title="Exceptions"
                      link="completed"
                      group={group}
                      sx={{ height: "100%" }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            <Stack
              direction="row"
              spacing={2}
              margin={2}
              alignItems={"center"}
              onClick={() => {
                setOpenEscalated((state) => !state);
              }}
            >
              <IconButton aria-label="expand row" size="small">
                {!openEscalated ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>

              <Typography
                variant="h6"
                sx={{ mb: 1, textAlign: "left", cursor: "pointer" }}
              >
                {" "}
                Escalated Exceptions
              </Typography>
            </Stack>
            {openEscalated && (
              <Grid
                container
                spacing={3}
                flexDirection={"row"}
                flexWrap={"wrap"}
              >
                {Object.keys(escalatedResponse).map((name, index) => {
                  console.log("render fucntion: ",escalatedResponse[name],name);
                  return (
                    <Grid item xs={12} lg={6} key={index}>
                      <CardComponent
                        title="Escalated"
                        name={name}
                        dataescalated={escalatedResponse[name]}
                        sx={{ height: "100%" }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
