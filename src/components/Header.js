import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as CompanyLogo } from "../assets/menu_logo_white.svg";
import {
  Toolbar,
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
  AppBar as MuiAppBar,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Close as CloseIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { logoutUser, userActions } from "./store/features/user/userSlice";
import { searchAction } from "./store/features/search/searchSlice";
import { useDebounce } from "use-debounce";

const Header = ({ drawerWidth, open }) => {
  const location = useLocation();
  const username = useSelector((state) => state.auth.userInfo.username);
  const theme = useTheme();
  const dispatch = useDispatch();

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    paddingLeft: theme.spacing(7),
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      paddingLeft: 0,
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleReset = () => {
    setSearch("");
    dispatch(searchAction.reset());
  };

  const [search, setSearch] = useState("");
  const [searchText] = useDebounce(search, 400);

  useEffect(() => {
    dispatch(searchAction.setvalue(searchText));
  }, [searchText, dispatch]);

  const showSearch =
    location.pathname.match("/dashboard/user-management") &&
    !location.pathname.match("/add-user-group") &&
    !location.pathname.match("/add-user") &&
    !location.pathname.match("/update-user") &&
    !location.pathname.match("/update-user-group");

  return (
    <AppBar
      open={open}
      sx={{
        boxShadow: "none !important",
        zIndex: 10,
        background: "black",
      }}
    >
      <Toolbar
        sx={{
          background: "black",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1800px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Box
          component={Link}
          to="/dashboard"
          sx={{ textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          <CompanyLogo width="100px" />
          <Typography
            sx={{
              color: "white",
              marginLeft: "0.6rem",
              fontSize: "1.4rem",
              fontFamily: theme.typography.fontFamily,
              alignSelf: "flex-end",
              lineHeight: 1,
            }}
            variant="h6 "
          >
            /TEMA
          </Typography>
        </Box>

        <Box width={"50%"} key={"unique"}>
          {showSearch && (
            <TextField
              fullWidth
              placeholder="Search Users & UserGroups"
              value={search}
              autoFocus
              // inputRef={searchRef}
              onChange={handleSearch}
              // defaultValue={""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon
                      onClick={handleReset}
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          color: "black",
                        },
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                background: "white",
                border: "none",
                borderRadius: "0.1rem",
                input: {
                  padding: "0.5rem 1rem",
                },
                fieldset: {
                  border: "none",
                },
              }}
            ></TextField>
          )}
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Tooltip title="View Profile">
            <Box
              component={Link}
              to={username}
              sx={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              Hi, {username}
            </Box>
          </Tooltip>
          <Tooltip title="logout">
            <IconButton
              sx={{ color: "white", paddingLeft: "1rem" }}
              onClick={() => {
                dispatch(logoutUser());
                dispatch(userActions.reset());
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
