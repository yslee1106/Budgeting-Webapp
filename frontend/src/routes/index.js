import { Routes, Route } from 'react-router-dom';
import { PublicRouteList } from 'routes/publicRoutes';
import { PrivateRouteList } from 'routes/privateRoutes';
import Login from 'pages/authentication/login';
import ErrorPage from 'pages/error';
import Budget from 'pages/budget';
import PrivateRoute from 'routes/components/privateRoute';
// import NotFound from 'components/NotFound';

const PublicRoutes = () =>
  PublicRouteList.map((route) => {
    if (route.route) {
      return <Route exact path={route.route} element={route.component} key={route.key} />;
    }
    return null;
  });

const PrivateRoutes = () =>
  PrivateRouteList.map((route) => {
    if (route.route) {
      return <Route exact path={route.route} element={route.component} key={route.key} />;
    }
    return null;
  });

const AllRoutes = () => (
  <Routes>

    {PublicRoutes()}
    <Route element={<PrivateRoute />}>
      {PrivateRoutes()}
      {/* Change to Home Page */}
      <Route path="/" element={<Budget />} />
    </Route>

    {/* Error Page */}
    <Route path="*" element={<ErrorPage />} />

  </Routes>
);

export default AllRoutes;