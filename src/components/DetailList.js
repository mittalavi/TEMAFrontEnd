import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

function DetailList({ data }) {
  let column = Object.keys(data);
  // get table heading data

  column = column?.filter((column) => column !== "password" && column!=="userGroups");
  const ThData = () => {
    return column?.map((data, index) => {
      return <th key={index}>{data}</th>;
    });
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      {column?.map((key, index) => (
        <ListItem key={index} sx={{
          fontSize: '1rem',
          py: 0.5,
        }}>
          <Typography
            sx={{
              mr: 1,
              textTransform: "capitalize",
              fontWeight: "bold",
              ":after": { content: "' : '" },
            }}
          >
            {key}
          </Typography>
          <ListItemText primary={data[key]} />
        </ListItem>
      ))}
    </Box>
  );
}

export default DetailList;
