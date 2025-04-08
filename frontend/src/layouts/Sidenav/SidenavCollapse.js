import PropTypes from "prop-types";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import Box from '@mui/material/Box';

import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "layouts/Sidenav/styles/sidenavCollapse";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context/theme";

function SidenavCollapse({ icon, name, active, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;

  return (
    <ListItem component="li"
    sx={{ p: 0 }}>
      <Box
        {...rest}
        sx={(theme) =>
          collapseItem(theme, { active })
        }
      >
        <ListItemIcon
          sx={(theme) =>
            collapseIconBox(theme, { active })
          }
        >
          {typeof icon === "string" ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
          ) : (
            icon
          )}
        </ListItemIcon>

        <ListItemText
          primary={name}
          sx={(theme) =>
            collapseText(theme, { miniSidenav, active })
          }
        />
      </Box>
    </ListItem>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default SidenavCollapse;
