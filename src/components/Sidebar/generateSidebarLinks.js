import {
  Person as PersonIcon,
  PersonAdd as AddPersonIcon,
  GroupAdd as AddGroupIcon,
  Error as ErrorIcon,
  BarChart as BarChartIcon,
  DashboardOutlined as DashboardOutlinedIcon 
} from "@mui/icons-material";

const generateSidebarLinks = (isAdmin) => {
  const commonLinks = [
    {
      name: "Dashboard",
      url: `/dashboard`,
      icon: <DashboardOutlinedIcon  />,
    },
    {
        name: "Exception Management",
        url: `/dashboard/exception-management/exception-handling`,
        icon: <ErrorIcon />,
      },
    {
      name: "Reports",
      url: "/dashboard/reports",
      icon: <BarChartIcon />,
    }
  ];

  if (isAdmin) {
    const usersManagementLink = {
      name: "Users Management",
      url: "/dashboard/user-management",
      icon: <PersonIcon />,
      children: [
        {
          name: "Add user",
          url: "/dashboard/user-management/add-user",
          icon: <AddPersonIcon />,
        },
        {
          name: "Add user group",
          url: "/dashboard/user-management/add-user-group",
          icon: <AddGroupIcon />,
        },
      ],
    };
    commonLinks.splice(1,0,usersManagementLink);
  }

  if (!isAdmin) {
    // //console.log(commonLinks)
    commonLinks.find(
      (link) => link.url === `/dashboard/exception-management/exception-handling`
    ).children = [
      {
        name: "Exception Handling",
        url: "/dashboard/exception-management/exception-handling",
        icon: null,
      },
      {
        name: "4 Eye Checkup",
        url: "/dashboard/exception-management/4-eye-checkup",
        icon: null,
      },
    ];
  }

  return commonLinks;
};

export default generateSidebarLinks;
