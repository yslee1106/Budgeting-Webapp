import Budget from "pages/budget";
// import Profile from 'pages/profile';

// @mui icons
import Icon from "@mui/material/Icon";

export const PrivateRouteList = [
  {
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    // component: <Budget />,
  },
  {
    name: "Budget",
    key: "budget",
    icon: <Icon fontSize="small">savings</Icon>,
    route: "/budget",
    // component: <Budget />,
  },
  {
    name: "Investment",
    key: "investment",
    icon: <Icon fontSize="small">monetization_on</Icon>,
    route: "/investment",
    // component: <Budget />,
  },
  {
    name: "Taxes",
    key: "taxes",
    icon: <Icon fontSize="small">request_quote</Icon>,
    route: "/taxes",
    // component: <Budget />,
  },
  {
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    // component: <Budget />,
  },
];
