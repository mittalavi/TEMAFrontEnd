import React, { useState } from "react";

import {
  FormControl,
  MenuItem,
  Select,
  Button,
  styled,
  Box,
  TextField,
} from "@mui/material";

import SyncIcon from "@mui/icons-material/Sync";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";

const StyledButton = styled(Button)({
  backgroundColor: "primary",

  color: "white",

  padding: "14px 24px",

  "&:hover": {
    backgroundColor: "secondary",
  },
});

const StyledDatePicker = styled(DatePicker)({
  marginRight: 16,
});

const Filter = ({ onSelectFilter, onRefresh }) => {
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const [selectedPriority, setSelectedPriority] = useState("Priority");

  const [selectedCreatedAt, setSelectedCreatedAt] = useState(null);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleCreatedAtChange = (newValue) => {
    setSelectedCreatedAt(newValue);
  };

  const formatSelectedDate = (date) => {
    return date ? dayjs(date).format("YYYY-MM-DD") : null;
  };

  const applyFilters = () => {
    const formattedDate = formatSelectedDate(selectedCreatedAt);

    setSelectedCreatedAt(formattedDate);

    const filters = {
      status: selectedStatus,
      priority: selectedPriority,
      createdAt: formattedDate,
    };

    onSelectFilter(filters);
  };

  const refresh = () => {
    setSelectedStatus("Status");
    setSelectedPriority("Priority");
    setSelectedCreatedAt(null);

    const filters = {
      status: "Status",
      priority: "Priority",
      createdAt: null,
    };

    onSelectFilter(filters);
    onRefresh();
  };

  const formControlsx = {
    margin: "1rem 2rem",
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2rem",
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Box sx={formControlsx}>
          <FormControl sx={{flexGrow:1}}>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              sx={{ flexGrow: 1 }}
            >
              <MenuItem value="Status" disabled>
                Status
              </MenuItem>

              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{flexGrow:1}}>
            <Select
              value={selectedPriority}
              onChange={handlePriorityChange}
              sx={{ flexGrow: 1 }}
            >
              <MenuItem value="Priority" disabled>
                Priority
              </MenuItem>

              <MenuItem value="All">All</MenuItem>

              <MenuItem value="1">1 (Very High)</MenuItem>

              <MenuItem value="2">2 (High)</MenuItem>

              <MenuItem value="3">3 (Medium)</MenuItem>

              <MenuItem value="4">4 (Low)</MenuItem>

              <MenuItem value="5">5 (Very Low)</MenuItem>

              <MenuItem value="Sort">Sort</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{flexGrow:1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                sx={{ flexShrink: 0.5 }}
                value={selectedCreatedAt}
                onChange={handleCreatedAtChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
        <StyledButton variant="contained" onClick={applyFilters}>
          Apply Filters
        </StyledButton>

        <StyledButton
          variant="contained"
          onClick={refresh}
          style={{ marginLeft: "20px" }}
        >
          {<SyncIcon />}
        </StyledButton>
      </Box>
    </div>
  );
};

export default Filter;
