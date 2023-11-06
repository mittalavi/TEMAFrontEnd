import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
//import { Scrollbar } from "react-scrollbars-custom";
import { Scrollbars } from "react-custom-scrollbars-2";

export default function ExceptionResolutionSteps({
  datasteps,
  datacount,
  updateparent,
  exceptionHistory,
}) {
  const [activeStep, setActiveStep] = useState(0); //parseInt(props.data.resolutionCount),10
  const { id } = useParams();
  const [lasthistory, setLastHistory] = useState({});
  const username = useSelector((state) => state.auth.userInfo.username);
  const roleArr = useSelector((state) => state.auth.userInfo.roles); // to be decided by api response
  const role = roleArr.find((role) => role === "ROLE_ADMIN");

  useEffect(() => {
    // if (exceptionHistory !== null) {
    setLastHistory(exceptionHistory[exceptionHistory.length - 1]);
    // }
  }, [exceptionHistory]);

  useEffect(() => {
    //console.log(
    //   "Inside Resolution Component initialResolutionCount",
    //   datacount
    // );
    setActiveStep(datacount);
  }, [datacount]);

  const handleActiveStepCount = (activestep) => {
    const ob = { count: `${activestep}` };
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}api/updateResolutionCount/${id}`,
        ob,

        {
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        updateparent();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //   useEffect(() => {
  //     //console.log("Inside Resolution Component initialResolutionCount",datacount)
  //  })

  // useEffect(() => {
  //   //console.log("resolution steps are rerendering");
  // }, [data.resolutionCount]);

  // useEffect(() => {
  //   //console.log("active step value = ", activeStep);
  //   if (activeStep === datasteps?.length) {
  //     updateparent();
  //   } else {
  //     //console.log("inside else of handlenext");
  //   }
  // }, [activeStep]);

  // useEffect(() => {}, [data]);

  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    //console.log("inside handleNext before", activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
    handleActiveStepCount(activeStep + 1);

    // //console.log("datatype of res active step", typeof activeStep);
    // //console.log("datatype of parseint",typeof parseInt(props.data.resolutionCount));
  };

  //fetch activestep and update it
  //onclick count++

  //user role && status check && resolve button then complete step button
  //highlight active steps
  //escalate button for user role
  //scrollbar

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {datasteps?.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          //console.log("inside stepper lable activestep", activeStep);
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === datasteps?.length ? ( //props.data.resolutionSteps
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>

          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep !== -1 ? (
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          ) : null}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
            {/* (isClaimButtonClickedBefore || shouldShowSteps) */}
            {username === lasthistory?.userId &&
              (activeStep === -1 ||
              role === "ROLE_ADMIN" ? null : activeStep !==
                datasteps?.length - 1 ? (
                <Button onClick={handleNext}>Complete This Step</Button>
              ) : (
                <Button onClick={handleNext}>Finish</Button>
              ))}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
