import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import SideNav from "layouts/Sidenav";

import theme from "assets/theme";

import AllRoutes from "routes";
import { PrivateRouteList } from 'routes/privateRoutes';

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav } from "context/theme";

// Authentication
import { AuthProvider } from 'context/authentication';

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Create query client (before App component)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
      },
    },
  });

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <SideNav
                brandLogo="logo_dev"
                brandName="Financial Tracker"
                routes={PrivateRouteList}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            </>
          )}
          <AllRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}