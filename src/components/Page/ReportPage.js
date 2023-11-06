import React from "react";
import AvgResolutionTimeBarChart from "../Charts/AvgResolutionTimeBarChart";
import TotalResolutionTimeBarChart from "../Charts/TotalResolutionTimeBarChart";
import ExceptionTypeChart from "../Charts/ExceptionTypeChart";
import PriorityChart from "../Charts/PriorityChart";
import EscalatedExceptionBarChat from "../Charts/EscalatedExceptionbarChart";
import { Grid,Paper,Typography } from "@mui/material";

const ReportPage = () => {
  return (
    <div>
      <Grid container my={2} spacing={4} pl={2}>
        <Grid item sm={12} lg={6}>
          <Paper elevation={3} sx={{ padding: 1, borderRadius: '15px'}}>
            <Typography sx={{ textAlign: "center" }}>
              Average Resolution Time
            </Typography>
            <AvgResolutionTimeBarChart />
          </Paper>
        </Grid>
        <Grid item sm={12} lg={6}>
           <Paper elevation={3} sx={{ padding: 1, borderRadius: '15px'}}>
            <Typography sx={{ textAlign: "center" }}>
              Total Resolution Time
            </Typography>
            <TotalResolutionTimeBarChart />
          </Paper>
        </Grid>
        <Grid item sm={12} lg={6}>
           <Paper elevation={3} sx={{ padding: 1, borderRadius: '15px'}}>
            <Typography sx={{ textAlign: "center" }}>
              Exception Type Chart
            </Typography>
            <ExceptionTypeChart />
          </Paper>
        </Grid>
        <Grid item sm={12} lg={6}>
           <Paper elevation={3} sx={{ padding: 1, borderRadius: '15px'}}>
            <Typography sx={{ textAlign: "center" }}>
              Exceptions By Priority
            </Typography>
            <PriorityChart />
          </Paper>
        </Grid>
        <Grid item sm={12} lg={6}>
           <Paper elevation={3} sx={{ padding: 1, borderRadius: '15px'}}>
            <Typography sx={{ textAlign: "center" }}>
              Escalation Frequency Chart
            </Typography>
            <EscalatedExceptionBarChat />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportPage;
