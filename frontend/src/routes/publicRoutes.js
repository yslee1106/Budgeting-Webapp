import Login from 'pages/authentication/login';
import Signup from 'pages/authentication/signup';

export const PublicRouteList = [
  {
    name: "login",
    key: "login",
    route: "/login",
    component: <Login />,
  },
  {
    name: "signup",
    key: "signup",
    route: "/signup",
    component: <Signup />,
  },
];