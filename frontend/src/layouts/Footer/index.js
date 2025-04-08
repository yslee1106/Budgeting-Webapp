import { Typography } from "@mui/material";

function Footer() {
  const company = 'Financial Tracker';

  return (
    <Typography
      variant="caption"
      color="white"
      fontweight='medium'
    >
      © 2021. - 2025 All Rights Reserved. { company }
    </Typography>
  )
}

export default Footer;
