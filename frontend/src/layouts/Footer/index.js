import MDTypography from "components/MDTypography";

function Footer() {
  const company = 'Financial Tracker';

  return (
    <MDTypography
      variant="caption"
      color="white"
      fontweight='medium'
    >
      © 2021. - 2025 All Rights Reserved. { company }
    </MDTypography>
  )
}

export default Footer;
