// import {
//   Person as PersonIcon,
//   PersonAdd as AddPersonIcon,
//   GroupAdd as AddGroupIcon,
//   Error as ErrorIcon,
//   BarChart as BarChartIcon,
// } from "@mui/icons-material";

// const sidebarLinks=  [
//     {
//       "name": "Users Management",
//       "url": "/dashboard/user-management",
//       "icon": <PersonIcon />,
//       "children": [
//         {
//           "name": "Add user",
//           "url": "/dashboard/user-management/add-user",
//           "icon": <AddPersonIcon />
//         },
//         {
//           "name": "Add user group",
//           "url": "/dashboard/user-management/add-user-group",
//           "icon": <AddGroupIcon />
//         }
//       ]
//     },
//     {
//       "name": "Exception Management",
//       "url": "/dashboard/exception-management",
//       "icon": <ErrorIcon />,
//       "children": [
//         {
//           "name": "Exception Handling",
//           "url": "/dashboard/exception-management/exception-handling",
//           // "icon": <AddPersonIcon />
//         },
//         {
//           "name": "4 Eye Checkup",
//           "url": "/dashboard/exception-management/4-eye-checkup",
//           // "icon": <AddGroupIcon />
//         }
//       ]
//     },
//     {
//       "name": "Reports",
//       "url": "/dashboard/reports",
//       "icon": <BarChartIcon/>
//     },

//   ]

// export {sidebarLinks};

import generateSidebarLinks from "./generateSidebarLinks";
import { useSelector } from "react-redux";

const SidebarLinks = () => {
  const loggedInUserAllRolesArray = useSelector(
    (state) => state.auth.userInfo.roles
  );

  const isLoggedInUserAnAdmin =
    loggedInUserAllRolesArray.includes("ROLE_ADMIN");

  const sidebarLinks = generateSidebarLinks(isLoggedInUserAnAdmin);

  return sidebarLinks;
};

export default SidebarLinks;
