import Budget from "pages/budget";
import Profile from 'pages/profile';

// @mui icons
import Icon from "@mui/material/Icon";

export const PrivateRouteList = [
  {
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Budget />,
  },
  {
    name: "Account",
    key: "account",
    icon: <Icon fontSize="small">payment</Icon>,
    route: "/budget",
    component: <Budget />,
  },
  {
    name: "Budget",
    key: "budget",
    icon: <Icon fontSize="small">savings</Icon>,
    route: "/budget",
    component: <Budget />,
  },
  {
    name: "Calendar",
    key: "calendar",
    icon: <Icon fontSize="small">calendar_today</Icon>,
    route: "/budget",
    component: <Budget />,
  },
  {
    name: "Taxes",
    key: "taxes",
    icon: <Icon fontSize="small">assured_workload</Icon>,
    route: "/taxes",
    component: <Budget />,
  },
  {
    name: "Investment",
    key: "investment",
    icon: <Icon fontSize="small">show_chart</Icon>,
    route: "/investment",
    component: <Budget />,
  },
  {
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];
