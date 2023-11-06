import React, { useEffect } from "react";
import { Grid, Paper, Card, CardContent } from "@mui/material";
import DetailList from "./DetailList";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getUser, userActions } from "./store/features/user/userSlice";
import { useParams } from "react-router-dom";
import AllGroupsOfAUserList from "./AllGroupsOfAUserList";

const UserDetails = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.auth.payload);
  const roleArr = useSelector((state) => state.auth.userInfo.roles); // to be decided by api response
  const role = roleArr.find((role) => role === "ROLE_ADMIN");

  useEffect(() => {
    dispatch(getUser(username));
    return () => {
      dispatch(userActions.payloadReset());
    };
  }, [dispatch, username]);

  // //console.log(payload);

  return (
    <>
      <Grid m={"1rem 0 0 1rem"}>
        <Paper elevation={3} sx={{borderRadius:'0.5rem'}}>
          <Card sx={{borderRadius:'0.5rem'}}>
            <CardContent>
              <DetailList data={payload} />

              {/* <Grid container s sx={{ ml: 2 }}>
                  <Grid item xs={4}>
                    
                  </Grid>
                </Grid> */}
            </CardContent>
          </Card>
        </Paper>
        {!role && <AllGroupsOfAUserList />}
      </Grid>
    </>
  );
};

export default UserDetails;
