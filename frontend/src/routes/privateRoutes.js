import Budget from "pages/budget";
// import Profile from 'pages/profile';

// @mui icons
import Icon from "@mui/material/Icon";

export const PrivateRouteList = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Budget />,
  },
  {
    type: "collapse",
    name: "Budget",
    key: "budget",
    icon: <Icon fontSize="small">savings</Icon>,
    route: "/budget",
    component: <Budget />,
  },
  {
    type: "collapse",
    name: "Investment",
    key: "investment",
    icon: <Icon fontSize="small">monetization_on</Icon>,
    route: "/investment",
    component: <Budget />,
  },
  {
    type: "collapse",
    name: "Taxes",
    key: "taxes",
    icon: <Icon fontSize="small">request_quote</Icon>,
    route: "/taxes",
    component: <Budget />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Budget />,
  },
];
