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

/**
 * The base colors for the Material Dashboard 2 React.
 * You can add new color using this file.
 * You can customized the colors for the entire Material Dashboard 2 React using thie file.
 */

import rgba from "assets/theme/functions/rgba"

const colors = {
  background: {
    default: "#ffffff",
  },

  text_light: {
    main: "#000000",
    focus: "#000000",
    hover: '#333333',
  },

  text_dark: {
    main: "#ffffff",
    focus: "#ffffff",
    hover: '#e6e6e6',
  },

  transparent: {
    main: rgba(0, 0, 0, 0),
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
    hover: "#f2f2f2",
  },

  black: {
    main: "#000000",
    focus: "#000000",
    hover: "#262626",
  },

  primary: {
    main: "#2b2b2b",
    focus: "#2b2b2b",
    hover: "#3d3d3d",
  },

  secondary: {
    main: "#d4d4d4",
    focus: "#d4d4d4",
    hover: "#c0c0c0",
  },

  selected: {
    main: '#CCCCCC',
    focus: '#b3b3b3',
  },

  positive: {
    main: "#2E7D32",
    focus: "#2E7D32",
  },

  warning: {
    main: "#FFD54F",
    focus: "#FFD54F",
  },

  negative: {
    main: "#D32F2F",
    focus: "#D32F2F",
  },

  success: {
    main: "#4CAF50",
    focus: "#67bb6a",
    hover: "#5cbf60",
  },

  error: {
    main: "#F44335",
    focus: "#f65f53",
    hover: "#f55b4f",
  },

  light: {
    main: "#ffffff",
    focus: "#b3b3b3",
    hover: "#d9d9d9",
  },

  dark: {
    main: "#2b2b2b",
    focus: "#d4d4d4",
    hover: "#4a4a4a",
  },

  grey: {
    100: "#f8f9fa",
    200: "#f0f2f5",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },

  badgeColors: {
    primary: {
      background: "#ffffff",
      text: "#2b2b2b",
    },

    secondary: {
      background: "#ffffff",
      text: rgba(0, 0 ,0, 0.54),
    },

    info: {
      background: "#aecef7",
      text: "#095bc6",
    },

    attention: {
      background: "#D32F2F",
      text: "#ffffff",
    },
  },

  inputBorderColor: "#d2d6da",

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },
};

export default colors;
