import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import typography from "assets/theme/base/typography";

import pxToRem from "assets/theme/functions/pxToRem";

const { light, text_light, dark } = colors;
const { size } = typography;

const menuItem = {
  styleOverrides: {
    root: {
      minWidth: pxToRem(160),
      minHeight: "unset",
      padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
      fontSize: size.sm,
      color: text_light.main,
      transition: "background-color 300ms ease, color 300ms ease",

      "&:hover, &:focus": {
        backgroundColor: light.hover,
        color: text_light.main,
      },

      "&.Mui-selected, &.Mui-selected:focus, &.Mui-selected:hover": {
        backgroundColor: light.focus,
        color: text_light.main,
      }
    },
  },
};

export default menuItem;
