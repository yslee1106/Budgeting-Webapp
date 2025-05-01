function collapseItem(theme, ownerState) {
  const { palette, functions } = theme;
  const { active } = ownerState;

  const { text_light, text_dark, transparent, grey, selected } = palette;
  const { pxToRem } = functions;

  return {
    background: active
      ? selected.main
      : transparent.main,
    color: active
      ? text_light.main
      : text_dark.main,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(10)} ${pxToRem(28)}`,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",

    "&:hover, &:focus": {
      backgroundColor: () => {
        let backgroundValue;

        if (!active) {
          backgroundValue = grey[900]
        }

        return backgroundValue;
      },
    },
  };
}

function collapseIconBox(theme, ownerState) {
  const { palette, functions } = theme;
  const { active } = ownerState;

  const { text_light, text_dark } = palette;
  const { pxToRem } = functions;

  return {
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    color: active
      ? text_light.main
      : text_dark.main,
    display: "grid",
    placeItems: "center",

    "& svg, svg g": {
      color: active ? text_light.main : text_dark.main,
    },
  };
}

const collapseIcon = ({ palette: { white, gradients } }, { active }) => ({
  color: active ? white.main : gradients.dark.state,
});

function collapseText(theme, ownerState) {
  const { typography, breakpoints, functions } = theme;
  const { miniSidenav, active } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(10),

    [breakpoints.up("xl")]: {
      opacity: miniSidenav ? 0 : 1,
      maxWidth: miniSidenav ? 0 : "100%",
      marginLeft: miniSidenav ? 0 : pxToRem(10),
    },

    "& span": {
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0,
    },
  };
}

export { collapseItem, collapseIconBox, collapseIcon, collapseText };
