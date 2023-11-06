import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ConstructionIcon from "@mui/icons-material/Construction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { amber } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Box from "@mui/material/Box";
import NorthIcon from "@mui/icons-material/North";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VerifiedIcon from "@mui/icons-material/Verified";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useParams } from "react-router-dom";
// function alertToast(){
//   const notify = () => toast("Wow so easy!");

//   return notify;
// }
function Buttons({ exceptiondata, updateparentcontent, historydata }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [OnClickBool, setOnClickBool] = React.useState(false);
  const open = Boolean(anchorEl);
  const [userGroups, setUserGroups] = useState([]);
  const roleArr = useSelector((state) => state.auth.userInfo.roles); // to be decided by api response
  const role = roleArr.find((role) => role === "ROLE_ADMIN");
  const username = useSelector((state) => state.auth.userInfo.username);

  const groupsArr = useSelector((state) => state.group.userGroups);
  console.log("groupsArr", groupsArr);
  const groupArr = groupsArr.filter(
    (group) => group.groupId === "EscalationGroup"
  );

  const isCurrentLoggedInUserPartOfEscalationGroup =
    groupArr.length > 0 ? true : false;

  // const username="abc"

  // const [exceptionHistory, setExceptionHistory] = useState([]);
  // const [exceptionHistory, setExceptionHistory] = useState([]);
  const [selectedUserGroup, setSelectedUserGroup] = useState(undefined);
  useEffect(() => {
    //console.log("Inside button useeffect of history", historydata);
    //   //console.log(historydata[1] );
  }, [historydata]);

  useEffect(() => {
    //console.log(historydata);
    //console.log(historydata[1] );
    //console.log("Inside button useeffect of exceptiondata", exceptiondata);
  }, [exceptiondata]);
  // const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  const { id } = useParams();
  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  //console.log(historydata[0]["userId"] );

  function shouldRenderClaimButton(historydata, escalationGroupPresent) {
    if (!escalationGroupPresent) {
      //console.log("inside not escalated grp");
      if (
        historydata?.length === 1 &&
        historydata[0].userId === null &&
        groupsArr.filter((group) => group.groupId === historydata[0].groupId)
          .length > 0
      ) {
        //console.log("inside first if history len 1 ");
        return true; // Render Claim button for this condition
      }
      if (
        historydata?.length === 2 &&
        historydata[0].userId !== null &&
        historydata[1].userId === null &&
        groupsArr.filter((group) => group.groupId === historydata[1].groupId)
          .length > 0
      ) {
        //console.log("inside 2 if history len 2 ");

        return true; // Render Claim button for this condition
      }
    } else {
      if (
        historydata?.length === 2 &&
        historydata[1].userId === null &&
        groupsArr.filter((group) => group.groupId === historydata[1].groupId)
          .length > 0
      ) {
        //console.log("inside first else history len 2 ");

        return true; // Render Claim button for this condition
      }
      if (
        historydata?.length === 3 &&
        historydata[1].userId !== null &&
        historydata[2].userId === null &&
        groupsArr.filter((group) => group.groupId === historydata[2].groupId)
          .length > 0
      ) {
        //console.log("inside first else history len 3 ");

        return true; // Render Claim button for this condition
      }
    }
    return false;
  }

  function shouldRenderResolveButton(
    historydata,
    exceptiondata,
    escalationGroupPresent
  ) {
    if (!escalationGroupPresent) {
      if (
        historydata?.length === 1 &&
        historydata[0].userId !== null &&
        exceptiondata.resolutionSteps.length === exceptiondata.resolutionCount
      ) {
        return true; // Render Resolve button for this condition
      }
    } else {
      if (
        historydata?.length === 2 &&
        historydata[1].userId !== null &&
        exceptiondata.resolutionSteps.length === exceptiondata.resolutionCount
      ) {
        return true; // Render Resolve button for this condition
      }
    }
    return false;
  }

  function shouldRenderCloseButton(
    historydata,
    exceptiondata,
    escalationGroupPresent
  ) {
    if (!escalationGroupPresent) {
      if (
        historydata?.length === 2 &&
        historydata[0].userId !== null &&
        historydata[1].userId !== null &&
        exceptiondata.resolutionSteps.length ===
          exceptiondata.resolutionCount &&
        exceptiondata.status === "Resolved"
      ) {
        return true; // Render Close button for this condition
      }
    } else {
      if (
        historydata?.length === 3 &&
        historydata[1].userId !== null &&
        historydata[2].userId !== null &&
        exceptiondata.resolutionSteps.length ===
          exceptiondata.resolutionCount &&
        exceptiondata.status !== "Closed"
      ) {
        return true; // Render Close button for this condition
      }
    }
    return false;
  }

  function shouldRenderEscalateButton(
    historydata,
    exceptiondata,
    escalationGroupPresent
  ) {
    if (!escalationGroupPresent) {
      if (
        historydata?.length === 1 &&
        historydata[0].userId !== null &&
        exceptiondata.resolutionSteps.length !== exceptiondata.resolutionCount
      ) {
        return true; // Render Escalate button for this condition
      }
    }
    return false;
  }

  useEffect(() => {
    if (role) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}usergroups/allgroupnames`, {
          //when new grp added then....
          "Access-Control-Allow-Origin": true,
          Authorization: "Bearer " + accessToken,
        })
        .then((response) => {
          setUserGroups(response.data.data);
          //console.log("Inside fetch grp list ", response);
          //     //console.log(response);
          // //console.log("inside fetchUserGroupList");
        });
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    //console.log("handle click is called");
    // fetchUserGroupList();
  };

  function resolveToast() {
    toast("Exception Resolved and Sent to 4 Eye Check !!", {
      type: "success",

      autoClose: 2000,
    });
  }
  function fourEyeCheckToast() {
    toast("4 Eye Check Completed and Exception Closed!!", {
      type: "success",

      autoClose: 2000,
    });
  }
  function claimToast() {
    toast("Exception Claimed !!", {
      type: "success",

      autoClose: 2000,
    });
  }
  function escalateToast() {
    toast("Exception Escalated !!", {
      type: "success",

      autoClose: 2000,
    });
  }
  const handleClose = () => {
    //console.log("handle close is called");
    setAnchorEl(null);
  };

  const handleAssignGroup = () => {
    // e.preventDefault();
    const dataToSend = {
      exceptionId: id,
      groupId: selectedUserGroup,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/assignException`, dataToSend)
      .then((response) => {
        //console.log("Assignment successful", response.data);
        updateparentcontent();
      })
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  const handleClaimClick = (count) => {
    // setSelectedExceptionId(exceptionID);                                                  //username required
    // setSelectedUserId(username);
    // if (escalationGroupPresent) {
    //   handleResolutionCountCustom(exceptiondata.resolutionCount);
    // }
    // else{

    // }

    //console.log("handlClaim clicked in buttons.js with count", )

    // //console.log(
    //   `Assigned exception ${exceptionID} to user with ID:${username}`
    // );

    const dataToSend = {
      exceptionId: id,
      userId: username,
      resolutionCount: count,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/claimUser`, dataToSend)
      .then((response) => {
        //console.log("Assignment successful", response.data);
        updateparentcontent();
      })
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  const handleEscalateClick = () => {
    //console.log(`Escalated exception ${id} `);

    const dataToSend = {
      exceptionId: id,
      resolutionCount: exceptiondata.resolutionCount,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/groupToEscalation`,
        dataToSend
      )
      .then((response) => {
        //console.log("Assignment successful", response.data);
        // updateData();
        updateparentcontent();
      })
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  const handleEscalateResolveClick = (count) => {
    //console.log(`Resolved exception by ${id} `);

    const dataToSend = {
      exceptionId: id,
      resolutionCount: exceptiondata.resolutionSteps.length.toString(),
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/escalationToFourEyeCheck`,
        dataToSend
      )
      .then((response) => {
        //console.log("Assignment successful", response.data);
        updateparentcontent();
      })
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  const handleResolveClick = (count) => {
    //console.log(`Resolved exception by ${id} `);

    const dataToSend = {
      exceptionId: id,
      resolutionCount: count,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/groupToFourEyeCheck`,
        dataToSend
      )
      .then((response) => {
        //console.log("Assignment successful", response.data);
        updateparentcontent();
      })
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  const handleFourEyeCheckClick = () => {
    //console.log(`Resolved exception by ${id} `);

    const dataToSend = {
      exceptionId: id,
      resolutionCount: exceptiondata.resolutionSteps.length.toString(),
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/groupToFourEyeCheck`,
        dataToSend
      )
      .then((response) => {
        //console.log("Assignment successful", response.data);
        updateparentcontent();
      })
      .catch((error) => {
        console.error("Assignment failed", error);
      });
  };

  // useEffect(
  //   (OnClickBool) => {
  //     //Runs only on the first render
  //     // Buttons();
  //     //console.log(OnClickBool);
  //   },
  //   [OnClickBool]
  // );
  //check status for assigned exception
  // eslint-disable-next-line no-lone-blocks

  if (role === "ROLE_ADMIN") {
    return (
      <Stack
        direction="row"
        sx={{ justifyContent: "flex-end", p: 1 }}
        spacing={2}
        alignItems="flex-start"
      >
        {historydata.length === 1 &&
        historydata[0].groupId === "other" &&
        historydata[0].userId === null ? (
          <>
            <Button
              variant="contained"
              startIcon={<CheckIcon />}
              style={{ background: "#9500ae" }}
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Assign
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
                "margin-bottom": "20px",
              }}
              // onSubmit={handleOnSubmit}

              sx={{
                mb: 5,
                mt: 2,
                ".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiMenu-paper.MuiPopover-paper.MuiMenu-paper":
                  {
                    minWidth: "240px",
                  },
                ".MuiAutocomplete-root": {
                  display: "inline-block",
                  minWidth: "160px",
                },
                // ".MuiFormControl-root.MuiFormControl-fullWidth.MuiTextField-root":{
                //   marginLeft:"20px",
                //   marginTop:"20px"

                // },
                ".MuiButtonBase-root.MuiFab-root.MuiFab-circular.MuiFab-sizeSmall.MuiFab-success.MuiFab-root.MuiFab-circular.MuiFab-sizeSmall.MuiFab-success":
                  {
                    marginBottom: "-32px",
                    marginTop: "-10px",
                    marginLeft: "19px",
                  },
                // display:"flex"
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={userGroups?.map((option) => option.groupId)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search User Group"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
                sx={{ ml: 1 }}
                onChange={(e, selectedUserGroup) => {
                  setSelectedUserGroup(selectedUserGroup);
                  //console.log("onchange", selectedUserGroup);
                }}
              />
              <Fab
                size="small"
                color="success"
                aria-label="add"
                onClick={() => {
                  //console.log("onclick", selectedUserGroup);
                  handleClose();
                  handleAssignGroup();
                  // assignedToast();
                }} //call assign to user group api +clickbool==true
                // type="submit"
              >
                {/* <TaskAltIcon /> */}
                {/* <CheckCircleIcon/> */}
                <HowToRegIcon />
              </Fab>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            startIcon={<DoneAllIcon />}
            style={{ background: "#33ab9f" }}
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined} //Already Assigned Toast
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            disabled
          >
            Assigned
          </Button>
        )}

        {/* <Button variant="contained" startIcon={<BorderColorIcon />}>
            Update
          </Button> */}
      </Stack>
    );
  } else {
    //user role
    return (
      //one more if else for claim and resolve

      // <Button
      //   variant="contained"
      //   startIcon={<CheckIcon />}
      //   style={{ background: "#9500ae" }}
      //   id="fade-button"
      //   aria-controls={open ? "fade-menu" : undefined}
      //   aria-haspopup="true"
      //   aria-expanded={open ? "true" : undefined}
      //   onClick={handleClick}
      // >
      //   Resolve
      // </Button>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-around", p: 2 }}
        spacing={2}
      >
        {shouldRenderClaimButton(
          historydata,
          isCurrentLoggedInUserPartOfEscalationGroup
        ) && (
          <Button
            variant="contained"
            startIcon={<BeenhereIcon />} //Claimed Toast
            color="secondary"
            onClick={() => {
              claimToast();
              handleClaimClick(
                exceptiondata.status === "Resolved"
                  ? "0"
                  : isCurrentLoggedInUserPartOfEscalationGroup
                  ? exceptiondata.resolutionCount.toString()
                  : "0"
              );
              // handleResolutionCountCustom(0);
            }} //handleassign with update parent
          >
            Claim
          </Button>
        )}
        {shouldRenderResolveButton(
          historydata,
          exceptiondata,
          isCurrentLoggedInUserPartOfEscalationGroup
        ) && (
          <Button
            variant="contained"
            startIcon={<ConstructionIcon />}
            color="success"
            onClick={() => {
              resolveToast();
              handleResolveClick("-1");
              // handleResolutionCountCustom(-1);
            }} //handleresolved call with update parent
          >
            Resolve
          </Button>
        )}
        {shouldRenderCloseButton(
          historydata,
          exceptiondata,
          isCurrentLoggedInUserPartOfEscalationGroup
        ) && (
          <Button
            variant="contained"
            startIcon={<ConstructionIcon />}
            color="success"
            onClick={() => {
              fourEyeCheckToast();

              isCurrentLoggedInUserPartOfEscalationGroup
                ? handleEscalateResolveClick()
                : handleFourEyeCheckClick();
            }} //handleresolved call with update parent
          >
            Complete 4 Eye Check!!
          </Button>
        )}
        {shouldRenderEscalateButton(
          historydata,
          exceptiondata,
          isCurrentLoggedInUserPartOfEscalationGroup
        ) && (
          <Button
            variant="contained"
            startIcon={<NorthIcon />}
            onClick={() => {
              escalateToast();
              handleEscalateClick();
            }}
            color="error"
          >
            {" "}
            Escalate{" "}
          </Button>
        )}
      </Stack>
    );
  }
}

export default Buttons;
