import React from "react";
import { TableCell, Button } from "@mui/material";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import ConstructionIcon from "@mui/icons-material/Construction";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const getStatusButtonProps = (status) => {
    switch (status) {
      case "Open":
        return { color: "#A5F1F5", label: "Open", icon: <SearchIcon /> };
      case "Closed":
        return { color: "#167e65", label: "Closed", icon: <CloseIcon /> };
      case "Resolved":
        return {
          color: "#5c5cff",
          label: "Resolved",
          icon: <ConstructionIcon />,
        };
      case "Pending":
        return { color: "#FFF4DF", label: "Pending", icon: <BorderColorIcon /> };
  
      default:
        return { color: "transparent", label: status };
    }
  };

const Status = ({row}) => {
  const { color, label, icon } = getStatusButtonProps(row.status);
  return (
    <TableCell>
      <Button
        variant="text"
        startIcon={icon}
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        {label}
      </Button>
    </TableCell>
  );
};

export default Status;
