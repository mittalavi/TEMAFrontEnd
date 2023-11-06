import { useCallback, useState,useEffect } from "react";
import { Collapse, List } from "@mui/material";
import ListItemCustom from "./ListItem";

const MultiLevel = ({ item, openParent, handleDrawerClose }) => {
  const { children } = item;
  const [open, setOpen] = useState(false);
  
  const handleClickClose = useCallback(() => {
    setOpen(false);
  },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!openParent && open) {
      handleClickClose();
    }
  }, [open, openParent, handleClickClose]);


  return (
    <>
      <ListItemCustom
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        item={item}
        open={open}
        parent={true}
        openParent={openParent}
        handleDrawerClose={handleDrawerClose}
      />
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ opacity: openParent ? 1 : 0, pl: 3 }}
      >
        <List component="div" disablePadding>
          {children?.map((child, key) => (
            <ListItemCustom
              key={key}
              item={child}
              handleDrawerClose={handleDrawerClose}
              handleClickOpen={handleClickOpen}
              handleClickClose={handleClickClose}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default MultiLevel;
