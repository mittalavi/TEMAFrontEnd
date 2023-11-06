import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  CssBaseline,
  Divider,
  IconButton,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { sidebarLinks } from "../Sidebar/sidebarLinks";
import MultiLevel from "./MultiLevel";
import SingleLevel from "./SingleLevel";
import { useSelector } from "react-redux/es/hooks/useSelector";
import generateSidebarLinks from "./generateSidebarLinks";
import SidebarLinks from "./sidebarLinks";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "black",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  // borderRight: '1px solid white'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  background: "black",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ open, setOpen }) {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sidebarLinks = SidebarLinks();

  return (
    <Box sx={{ display: "flex", position: "absolute !important" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
            sx={{ color: "white" }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: "white" }} />
        <List>
          {sidebarLinks?.map((component, index) => {
            return component.children ? (
              <MultiLevel
                key={index}
                item={component}
                openParent={open}
                handleDrawerClose={handleDrawerClose}
              />
            ) : (
              <SingleLevel
                key={index}
                item={component}
                openParent={open}
                handleDrawerClose={handleDrawerClose}
              />
            );
          })}
        </List>
        <Divider sx={{ borderColor: "white" }} />
      </Drawer>
    </Box>
  );
}
