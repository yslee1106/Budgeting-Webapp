/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
function navbar(theme, ownerState) {
  const { palette, functions, breakpoints } = theme;
  const { absolute } = ownerState;

  const { white, text_light, transparent } = palette;
  const { rgba, pxToRem } = functions;

  return {
    boxShadow: "none",
    backdropFilter: absolute ? "none" : `saturate(200%) blur(${pxToRem(30)})`,
    backgroundColor:
      absolute
      ? `${transparent.main} !important`
      : rgba(white.main, 0.8),

    color: text_light,
    top: absolute ? 0 : pxToRem(12),
    minHeight: pxToRem(75),
    display: "grid",
    alignItems: "center",
    paddingTop: pxToRem(5),
    paddingBottom: pxToRem(5),
    paddingRight: absolute ? pxToRem(8) : 0,
    paddingLeft: absolute ? pxToRem(16) : 0,
  };
}

const navbarIconButton = () => ({
  px: 1,
});

const navbarMobileMenu = ({ breakpoints }) => ({
  display: "inline-block",
  lineHeight: 0,

  [breakpoints.up("xl")]: {
    display: "none",
  },
});

export { navbar, navbarIconButton, navbarMobileMenu };
