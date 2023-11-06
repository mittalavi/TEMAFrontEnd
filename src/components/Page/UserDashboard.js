import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
  Stack,
  IconButton,
  ListItem,
} from "@mui/material";
import CardComponent from "../CardComoponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const username = useSelector((state) => state.auth.userInfo.username);
  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  const roleArr = useSelector((state) => state.auth.userInfo.roles); // to be decided by api response
  const role = roleArr.find((role) => role === "ROLE_USER");

  const [response, setResponse] = useState([]);
  const [openAssigned, setOpenAssigned] = useState(true);
  const [openCompleted, setOpenCompleted] = useState(true);
  const [openClaimedUser, setOpenClaimedUser] = useState(true);
  const [openCompletedUser, setOpenCompletedUser] = useState(true);
  const [claimResponse, setClaimResponse] = useState([]);
  const [completeResponse, setCompleteResponse] = useState([]);

  useEffect(() => {
    setClaimResponse([
      "Ex117",
      "Ex116",
      "Ex304",
      "Ex117",
      "Ex116",
      "Ex304",
      "Ex117",
      "Ex116",
      "Ex304",
    ]);
  }, []);

  // fetching all groups of a user
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}users/${username}/groups`, {
        "Access-Control-Allow-Origin": true,
        authorization: accessToken,
      })
      .then((response) => {
        setResponse(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [username, accessToken]);

  // useEffect(() => {
  //  console.log("response:  ", claimResponse);
  // }, [claimResponse]);


  // fetching claimed exceptions by user
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}history/claim/users/${username}`, {
        "Access-Control-Allow-Origin": true,
        authorization: accessToken,
      })
      .then((response) => {
        //console.log(response.data.data)
        setClaimResponse(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [username, accessToken]);

  // fetching completed exceptions by user
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}history/complete/users/${username}`,
        {
          "Access-Control-Allow-Origin": true,
          authorization: accessToken,
        }
      )
      .then((response) => {
        setCompleteResponse(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [username, accessToken]);

  // fetching escalated exceptions by user
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}history/claim/users/${username}`, {
  //       "Access-Control-Allow-Origin": true,
  //       authorization: accessToken,
  //     })
  //     .then((response) => {
  //       //console.log(response.data.data)
  //       setClaimResponse(response.data.data);
  //     })
  //     .catch((e) => {
  //       //console.log(e);
  //     });
  // }, [username, accessToken]);

  return (
    role === "ROLE_USER" && (
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "50%" }}>
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
                  {openAssigned ? (
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
                  {response?.map((group, index) => (
                    <Grid xs={12} lg={6} key={index}>
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
                  {openCompleted ? (
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
                  {response?.map((group, index) => (
                    <Grid xs={12} lg={6} key={index}>
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
            </Container>
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
            User stats
          </Typography>
          <Container maxWidth="xl">
            <Grid container>
              <Grid xs={12} lg={6}>
                <Stack
                  direction="row"
                  spacing={2}
                  margin={2}
                  alignItems={"center"}
                  onClick={() => {
                    setOpenClaimedUser((state) => !state);
                  }}
                >
                  <IconButton aria-label="expand row" size="small">
                    {openClaimedUser ? (
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
                    Exceptions claimed 
                  </Typography>
                </Stack>
                {openClaimedUser && (
                  <Box sx={{maxHeight: "75vh", overflowY: "auto" }}>
                    {claimResponse?.map((exception, index) => (
                      <ListItem
                        component={Link}
                        to={`/dashboard/exception-management/exception-handling/${exception}`}
                        key={index}
                        sx={{
                          color: "primary.main",
                          textAlign: "center",
                          display: "block",
                          ":hover": {
                            color: "black",
                            textDecoration: "underline",
                          },
                        }}
                      >
                       <span style={{fontSize:'0.8rem'}}>{index+1}</span>
                        <span>{". "}{exception}</span>
                      </ListItem>
                    ))}
                  </Box>
                )}
              </Grid>
              <Grid xs={12} lg={6}>
                <Stack
                  direction="row"
                  spacing={2}
                  margin={2}
                  alignItems={"center"}
                  onClick={() => {
                    setOpenCompletedUser((state) => !state);
                  }}
                >
                  <IconButton aria-label="expand row" size="small">
                    {openCompletedUser ? (
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
                    Exceptions Completed 
                  </Typography>
                </Stack>
                {openCompletedUser && (
                  <Box sx={{ maxHeight: "75vh", overflowY: "auto" }}>
                    {claimResponse?.map((exception, index) => (
                      <ListItem
                        component={Link}
                        to={`/dashboard/exception-management/exception-handling/${exception}`}
                        key={index}
                        sx={{
                          color: "primary.main",
                          textAlign: "center",
                          display: "block",
                          ":hover": {
                            color: "black",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        <span style={{fontSize:'0.8rem'}}>{index+1}</span>
                        <span>{". "}{exception}</span>
                      </ListItem>
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              {/* <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Makeup Lancome Rouge",
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Skincare Soja CO",
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                  {
                    id: "a6ede15670da63f49f752c89",
                    image: "/assets/products/product-6.png",
                    name: "Makeup Lipstick",
                    updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  },
                  {
                    id: "bcad5524fe3a2f8f8620ceda",
                    image: "/assets/products/product-7.png",
                    name: "Healthcare Ritual",
                    updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              /> */}
            </Grid>
          </Container>
        </Box>
      </Box>
    )
  );
};

export default UserDashboard;
