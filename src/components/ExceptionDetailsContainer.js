import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import ExceptionHistory from "./ExceptionHistory";
import ExceptionResolutionSteps from "./ExceptionResolutionSteps";
import ExceptionDetailsGrid from "./ExceptionDetailsGrid";
import ExceptionDetailsContainerHeader from "./ExceptionDetailsContainerHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import set from "date-fns/set";

function ExceptionDetailsContainer() {
  const { id } = useParams();
  const [exceptionDetails, setExceptionDetails] = useState({});
  const [exceptionHistory, setExceptionHistory] = useState([]);

  // const fetchAllExceptions = async () => {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_BASE_URL}api/get/${id}`
  //   );
  //   if (response.data) {
  //     setExceptionDetails(response.data);
  //   }
  //   //console.log("response data here");
  //   //console.log(response.data);
  //   // return response.data;
  // };
  //console.log('exception container rendering')

  const fetchAllExceptionHistory = async () => {
    const response = await axios.get(
      // 'http://10.196.22.105:8082/api/getHistory/Ex10'
      `${process.env.REACT_APP_BASE_URL}api/getHistory/${id}`
    );

    if (response.data) {
      setExceptionHistory(response.data);
      //console.log(response.data);
    }
    // //console.log(response.data);
  };

  useEffect(() => {
    axios
      .get(
        // 'http://10.196.22.105:8082/api/getHistory/Ex10'
        `${process.env.REACT_APP_BASE_URL}api/getHistory/${id}`
      )
      .then((response) => {
        setExceptionHistory(response.data);
      });
    // fetchAllExceptionHistory();
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/get/${id}`)
      .then((response) => {
        setExceptionDetails(response.data);
      });
    // fetchAllExceptions();
  }, [id]);

  const updateContainerData = () => {
    //console.log("re render entire component");
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/get/${id}`)
      .then((response) => {
        setExceptionDetails(response.data);
        fetchAllExceptionHistory();
      });
  };

  useEffect(() => {
    //console.log("exceptionHistory", exceptionHistory);
  }, [exceptionHistory]);

  useEffect(() => {
    //console.log("exceptionDetails", exceptionDetails);
  }, [exceptionDetails]);

  return (
    <Container sx={{ mb: 3, mt: 3 }}>
      <Grid container>
        <Grid item md={12}>
          <Paper elevation={3}>
            <Card>
              <CardContent sx={{ p: 5 }}>
                {/* {//console.log(
                  "Before sending props in header : ",
                  exceptionDetails
                )} */}
                <ExceptionDetailsContainerHeader
                  data={exceptionDetails}
                  updateparent={updateContainerData}
                  exceptionhistorydata={[...exceptionHistory]}
                />

                <ExceptionDetailsGrid data={exceptionDetails} />

                <Grid container sx={{ ml: 0, mb: 4 }}>
                  <Grid item xs={2}>
                    <Typography
                      //sx={{ display: 'inline' }}
                      //color="text.primary"
                      //component="span"
                      sx={{ fontWeight: "bold" }}
                      variant="body1"
                    >
                      Resolution Steps:
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    {/* {//console.log(
                    //   "Before sending props in resolution: ",
                    //   exceptionDetails
                    // )} */}
                    <ExceptionResolutionSteps
                      datasteps={exceptionDetails.resolutionSteps}
                      datacount={exceptionDetails.resolutionCount}
                      updateparent={updateContainerData}
                      exceptionHistory={exceptionHistory}
                    />
                  </Grid>
                </Grid>

                <Grid container sx={{ ml: 4 }}>
                  <Grid item xs={3}>
                    {/* {//console.log(
                      "Before sending props in history: ",
                      exceptionDetails
                    )} */}
                    <Typography
                      //sx={{ display: 'inline' }}
                      //color="text.primary"
                      //component="span"
                      sx={{
                        mr: 0,
                        fontWeight: "bold",
                        pl: 3,
                        textAlign: "start",
                      }}
                      variant="body1"
                    >
                      History:
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <ExceptionHistory data={[...exceptionHistory]} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExceptionDetailsContainer;
