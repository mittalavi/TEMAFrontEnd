import { Tooltip, useTheme } from "@mui/material";
import { ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const ListItemCustom = ({
  handleClickOpen,
  handleClickClose,
  item,
  open = false,
  parent = false,
  openParent = true,
  handleDrawerClose,
}) => {
  const theme = useTheme();
  return (
    <Tooltip title={item.name} placement="right-end">
      <ListItem
        component={Link}
        to={item.url}
        sx={{
          minHeight: 48,
          justifyContent: openParent ? "initial" : "center",
          px: 2,
          color: theme.palette.primary.main,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: openParent ? 2 : "auto",
            justifyContent: "center",
            color: theme.palette.primary.main,
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          onClick={() => {
            handleDrawerClose();
          }}
          primary={item.name}
          sx={{ opacity: openParent ? 1 : 0, mr: 1 }}
        />
        <Box>
          {parent && openParent ? (
            open ? (
              <ExpandLessIcon
                onClick={(e) => {
                  if (e && e.preventDefault()) e.preventDefault();
                  handleClickClose();
                }}
              />
            ) : (
              <ExpandMoreIcon
                onClick={(e) => {
                  if (e && e.preventDefault()) e.preventDefault();
                  handleClickOpen();
                }}
              />
            )
          ) : (
            <></>
          )}
        </Box>
      </ListItem>
    </Tooltip>
  );
};

export default ListItemCustom;
