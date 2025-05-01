import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

const { size } = typography;
const { text_light } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text_light.main,
    },
  },
};

export default dialogContentText;
