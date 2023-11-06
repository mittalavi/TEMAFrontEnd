import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";

function ExceptionDetailGrid({data}) {
 
  useEffect(() => {}, [data]);


  const hashmap = new Map([
    ["exceptionType", "Exception Type : "],
    ["counterParty", "Counter Party : "],
    ["tradeId", "Trade Id : "],
    ["tradeDate", "Trade Date : "],
    ["createdBy", "Created By : "],
    ["createdAt", "Created At : "],
    ["updatedBy", "Updated By : "],
    ["updatedAt", "Updated At : "],
    ["status", "Status : "],
    ["priority", "Priority : "],
  ]);

 

  function getStatusChipProps (status){
    switch (status) {
      case "Open":
        return { color: "#5c5cff" }; //#A5F1F5 
      case "Closed":
        return { color: "#167e65"};
      case "Resolved":
        return {
          color: "#5c5cff",
           variant :'h6'
        };
      case "Pending":
        return { color: "#5c5cff"};
  
      default:
        return { color: "transparent"};
    }
  };
  return (
    <Box
      sx={{
        display: "grid",
        gap: 0,
        gridTemplateColumns: "repeat(2, 1fr)",
        mb:5,
      }}
    >
      
      {Array.from(hashmap.keys()).map((key) => (
        <ListItem key={key}>
          <Typography sx={{ mr: 1  , fontWeight: 'bold'}} variant="subtitle1" >
          
            {hashmap.get(key)}
          </Typography>
          {key === "status" ? (
            <ListItemText primary={ <Chip label={data[key]} sx={getStatusChipProps(data[key])}  />} />
          ) : key === "priority" ? (
            <ListItemText
              primary={
                <Box sx={{ color:"inherit" }}><Typography variant="subtitle1" >{ data[key]}</Typography></Box>
              }
            />
            
          ) : (
            <ListItemText primary={data[key]}  />
          )}
        </ListItem>
      ))}
    </Box>
  );
}

export default ExceptionDetailGrid;



