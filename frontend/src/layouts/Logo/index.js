// @mui material components
import Link from "@mui/material/Link";
import LogoDevSharp from "@mui/icons-material/LogoDevSharp";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Logo() {
    const company = 'FINANCIAL TRACKER';
    const link = 'https://github.com/yslee1106';

    return (
        <>
            <LogoDevSharp sx={{ width: "2rem", height: "2rem" }} />
            <Link href={link} target='_blank'>
                <MDTypography
                    variant="h6"
                    sx={{
                        fontFamily: "Zen Kaku Gothic Antique",
                        fontWeight: 100,
                    }}
                >
                    {company}
                </MDTypography>
            </Link>
        </>
    );
}

export default Logo;
