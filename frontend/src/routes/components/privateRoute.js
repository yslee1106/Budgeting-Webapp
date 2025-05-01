// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'context/authentication';

const PrivateRoute = () => {
  const { accessToken } = useAuth(); // Get token from context
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;