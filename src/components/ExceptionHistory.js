import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from "@mui/material/Typography";
import { Scrollbar } from "react-scrollbars-custom";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router";




export default function ExceptionHistory({data}) {

  // const [exceptionHistory, setExceptionHistory] = useState(props.data);
  //  const {id}= useParams();
  // useEffect(() => {console.log("history is re rendering")}, [data]);
  


  // useEffect(() => {
  //   setExceptionHistory(props.data)
  //   //console.log("inside history prop",props.data);
  // }, []);

  // useEffect(() => {
   
  // }, [props.data]);
                                                    //scrollbar+null case handle 

 

  return data?.length === 0 ||
  data === null ||
  data === undefined ? (
    <Typography variant="h6" component="span">
      No History Found!!
    </Typography>
  ) : (
    // <Scrollbar style={{ width: 80, height: 10 }}>
      <Stack alignItems="flex-start">
        <Timeline position="alternate">
          {data?.map((history, index) => (
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {history.startTime}
              </TimelineOppositeContent>

              <TimelineSeparator>
                {index === 0 ? null : <TimelineConnector />}

                <TimelineDot color="success">
                 <AccountBoxIcon/>
                </TimelineDot>

                {index === data.length - 1 ? null : <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  {history.taskName}
                </Typography>
                 {(history.userId===null? <Typography>{`${history.groupId}`}</Typography>:<Typography>{` ${history.userId} in ${history.groupId} `}</Typography>)}
                {/* <Typography>{`${history.groupId} ------> ${history.userId}`}</Typography> */}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Stack>
  // </Scrollbar>
    
  );
}