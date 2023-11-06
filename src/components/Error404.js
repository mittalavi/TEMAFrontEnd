import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Image404 } from "../assets/404_image.svg";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        height="100%"
        flex={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <Image404 width={"45%"} />
        <Box width={"45%"}>
          <Box display={"flex"} flexDirection={"column"} marginBottom={"2rem"}>
            <Typography variant="h4" component="h1" align="left">
              Error – page not found
            </Typography>
            <Typography variant="h6" component="h2" align="left">
              The page you are looking for might have been removed, had its name
              changed or is temporarily unavailable.
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              background: (theme) =>
                `linear-gradient(45deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 60%)`,
              textAlign: "left",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Back to home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Error404;
