import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Buttons from "./Buttons";

function ExceptionDetailsContainerHeader({
  data,
  updateparent,
  exceptionhistorydata,
  setIsClaimButtonClickedBefore,
}) {
  //console.log(typeof updateparent);
  // useEffect(() => {
  //   console.log(
  //     "inside container header props",
  //     data,
  //     updateparent,
  //     exceptionhistorydata
  //   );
  // }, []);
  // useEffect(() => {}, [updateparent]);
  // useEffect(() => {}, [exceptionhistorydata]);
  return (
    <div>
      <Grid container sx={{ textAlign: "left", flexWrap: "nowrap" }}>
        <Grid item xs={7} sx={{ p: 1, ml: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Exception Id :
            <Typography sx={{ display: "inline" }} variant="h6">
              {" "}
              {data.exceptionId}
            </Typography>
          </Typography>
        </Grid>

        <Grid item xs={5}>
          <Buttons
            exceptiondata={data}
            updateparentcontent={updateparent}
            historydata={[...exceptionhistorydata]}
            setIsClaimButtonClickedBefore={setIsClaimButtonClickedBefore}
          />
        </Grid>
      </Grid>

      <Typography
        // variant="subtitle1"
        //   color="text.secondary"
        sx={{
          p: 1,
          ml: 1,
          mb: 1,
          fontWeight: "bold",
          textAlign: "left",
          fontSize: "large",
        }}
      >
        Description :
        <Typography sx={{ display: "inline", fontSize: "large" }}>
          {" "}
          {data.description}
        </Typography>
      </Typography>
    </div>
  );
}

export default ExceptionDetailsContainerHeader;
