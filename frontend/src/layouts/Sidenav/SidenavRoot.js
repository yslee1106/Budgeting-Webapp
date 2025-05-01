import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }) => {
  const { palette, boxShadows, breakpoints, functions } = theme;
  const { miniSidenav } = ownerState;

  const sidebarWidth = 250;
  const { primary } = palette;
  const { xxl } = boxShadows;
  const { pxToRem } = functions;

  // styles for the sidenav when miniSidenav={false}
  const drawerOpenStyles = () => ({
    background: primary.main,
    transform: "translateX(0)",

    [breakpoints.up("xl")]: {
      boxShadow: xxl,
      marginBottom: "inherit",
      left: "0",
      width: sidebarWidth,
      transform: "translateX(0)",
    },
  });

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = () => ({
    background: primary.main,
    transform: `translateX(${pxToRem(-320)})`,

    [breakpoints.up("xl")]: {
      boxShadow: xxl,
      marginBottom: "inherit",
      left: "0",
      width: pxToRem(96),
      overflowX: "hidden",
      transform: "translateX(0)",
    },
  });

  return {
    "& .MuiDrawer-paper": {
      boxShadow: xxl,
      border: "none",

      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
    },
  };
});
