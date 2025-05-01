import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarIconButton,
  navbarMobileMenu,
} from "layouts/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
} from "context/theme";

function DashboardNavbar({ absolute }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, fixedNavbar } = controller;

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  // Styles for the navbar icons
  const iconsStyle = () => ({
    color: (theme) => theme.palette.primary.main,
    fontSize: '20px'
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { absolute })}
    >
      <Toolbar>
        <Box color="inherit"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end', // Aligns children to right
            width: '100%', // Ensure full width
            gap: '6px'
          }}>
          
          {/* Profile */}
          <Link to="/profile">
            <IconButton sx={navbarIconButton} size="small" disableRipple>
              <Icon sx={iconsStyle}>account_circle</Icon>
            </IconButton>
          </Link>

          {/* SideNav Trigger */}
          <IconButton
            size="small"
            disableRipple
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon sx={iconsStyle} fontSize="medium">
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>

          {/* Settings */}
          <IconButton
            size="small"
            disableRipple
            color="inherit"
            sx={navbarIconButton}
          >
            <Icon sx={iconsStyle}>settings</Icon>
          </IconButton>

          {/* Notifications */}
          <IconButton
            size="small"
            disableRipple
            color="inherit"
            sx={navbarIconButton}
            aria-controls="notification-menu"
            aria-haspopup="true"
            variant="contained"
          >
            <Icon sx={iconsStyle}>notifications</Icon>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
};

export default DashboardNavbar;
