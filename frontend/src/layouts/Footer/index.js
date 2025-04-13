import { Box, Typography } from "@mui/material";

function Footer() {
  const company = 'Financial Tracker';

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '0%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      <Typography
        variant="caption"
        color="white"
        fontWeight='medium'
      >
        © 2021. - 2025 All Rights Reserved. {company}
      </Typography>
    </Box>

  )
}

export default Footer;
