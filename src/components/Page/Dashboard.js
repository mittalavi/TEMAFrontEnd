import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import BreadCrumbs from "../BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserGroups } from "../store/features/userGroup/userGroupSlice";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const drawerWidth = 280;

  const username = useSelector((state)=> state.auth.userInfo.username);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllUserGroups(username))
  },[username,dispatch])

  return (
    <Container
      className="dashboard"
      sx={{
        height: "100vh",
        width: "100%",
        maxWidth: "2000px !important",
        overflowY: "auto",
      }}
    >
      <Header open={open} drawerWidth={drawerWidth} />
      <Sidebar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />

      <main
        style={{
          width: "100%",
          padding: "5rem 0rem 2rem 3rem",
        }}
      >
        <BreadCrumbs />
        <Outlet />
      </main>

      {/* <Footer /> */}
    </Container>
  );
};

export default Dashboard;
