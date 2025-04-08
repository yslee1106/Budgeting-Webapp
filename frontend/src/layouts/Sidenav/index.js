import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SidenavCollapse from "layouts/Sidenav/SidenavCollapse";
import SidenavRoot from "layouts/Sidenav/SidenavRoot";

import Logo from 'layouts/Logo';

// Material Dashboard 2 React context
import { useMaterialUIController, setMiniSidenav } from "context/theme";

function Sidenav({ brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ name, icon, noCollapse, key, href }) => {
    return (
      <Link
        href={href}
        key={key}
        target="_blank"
        rel="noreferrer"
        sx={{ textDecoration: "none" }}
      >
        <SidenavCollapse
          name={name}
          icon={icon}
          active={key === collapseName}
          noCollapse={noCollapse}
        />
      </Link>
    )
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ miniSidenav }}
    >
      <Box
        sx={{
          pt: '2rem',
          pb: '1.5rem',
          px: '2rem',
          textAlign: "center"
        }}>
        <Logo color='#ffffff' size='sm' />
      </Box>
      <Divider
        sx={{
          backgroundColor: (theme) => theme.palette.white.main,
          mx: '1.5rem'
        }} />
      <List>{renderRoutes}</List>
      <Box
        sx={{
          position: 'absolute',
          bottom: '0%',
          left: '45%',
          transform: 'translate(-50%, -50%)',
        }}>
        <Link>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon sx={{ color: '#ffffff', fontSize: 12 }}>help</Icon>
            <Typography sx={{ color: '#ffffff', fontSize: 12, textDecoration: 'underline' }}>
              Help
            </Typography>
          </Box>

        </Link>

      </Box>
    </SidenavRoot>
  );
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
