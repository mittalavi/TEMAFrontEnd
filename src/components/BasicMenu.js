import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //For List Options

  const AllUserGroups = [
    { title: "G1" },
    { title: "G2" },
    { title: "G3" },
    { title: "G4" },
  ];

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Assign
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",

          "margin-bottom": "20px",
        }}
        sx={{
          mb: 5,

          mt: 2,

          ".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiMenu-paper.MuiPopover-paper.MuiMenu-paper":
            {
              minWidth: "240px",
            },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

        // TransitionComponent={Fade}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={AllUserGroups?.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select User Group"
              InputProps={{
                ...params.InputProps,

                type: "search",
              }}
            />
          )}
        />
      </Menu>
    </div>
  );
}
