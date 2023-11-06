import { Button, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AddButton = ({ usergrp = true }) => {
  return (
    <Stack
      spacing={4}
      direction={"row"}
      justifyContent="flex-end"
      marginBottom={2}
    >
      <Button variant="contained" component={Link} to="add-user">
        Add User
      </Button>
      {usergrp && (
        <Button variant="contained" component={Link} to="add-user-group">
          Add User Group
        </Button>
      )}
    </Stack>
  );
};

export default AddButton;
