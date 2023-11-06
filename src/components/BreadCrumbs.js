import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, ListItem, useTheme } from "@mui/material";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnamescrude = location.pathname.split("/")?.filter((x) => x);
  const pathnames = pathnamescrude?.map((path)=> path.split("-").join(" "))
  
  const theme = useTheme();

  return (
    <Breadcrumbs aria-label="breadcrumb" maxItems={4} sx={{ pl: 3 }}>
      {pathnames?.map((item, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnamescrude.slice(0, index + 1).join("/")}`;
        return (
          <ListItem
            key={index}
            component={Link}
            to={to}
            sx={{
              color: last?theme.palette.primary.main:'black',
              textTransform: "capitalize",
              padding: 0,
            }}
          >
            {item}
          </ListItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
