import ListItemCustom from "./ListItem";

const SingleLevel = ({ item,openParent,handleDrawerClose }) => {
  return (
    <>
      <ListItemCustom
        item={item}
        openParent={openParent}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
};

export default SingleLevel;