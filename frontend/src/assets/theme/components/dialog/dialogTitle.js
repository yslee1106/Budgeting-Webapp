import typography from "assets/theme/base/typography";

import pxToRem from "assets/theme/functions/pxToRem";

const { size } = typography;

const dialogTitle = {
  styleOverrides: {
    root: {
      paddingX: pxToRem(16),
      fontSize: size["2xl"],
    },
  },
};

export default dialogTitle;
