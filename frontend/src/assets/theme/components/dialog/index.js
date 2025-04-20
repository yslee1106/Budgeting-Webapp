import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";

import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;
const { xxl } = boxShadows;

const dialog = {
  styleOverrides: {
    paper: {
      borderRadius: borderRadius.lg,
      boxShadow: xxl,
      paddingX: pxToRem(16), 
      paddingY: pxToRem(8),
      minWidth: '500px',
    },

    paperFullScreen: {
      borderRadius: 0,
    },
  },
};

export default dialog;
