import Login from 'pages/authentication/login';
import Signup from 'pages/authentication/signup';

export const PublicRouteList = [
  {
    type: "collapse",
    name: "login",
    key: "login",
    route: "/login",
    component: <Login />,
  },
  {
    type: "collapse",
    name: "signup",
    key: "signup",
    route: "/signup",
    component: <Signup />,
  },
];