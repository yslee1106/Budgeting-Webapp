// @mui material components
import Link from "@mui/material/Link";
import LogoDevSharp from "@mui/icons-material/LogoDevSharp";

// Material Dashboard 2 React components
import { Typography } from '@mui/material'

function Logo() {
    const company = 'FINANCIAL TRACKER';
    const link = 'https://github.com/yslee1106';

    return (
        <>
            <LogoDevSharp sx={{ width: "2rem", height: "2rem" }} />
            <Link href={link} target='_blank'>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily:"Zen Kaku Gothic Antique",
                        fontWeight: 100,
                    }}
                >
                    {company}
                </Typography>
            </Link >
        </>
    );
}

export default Logo;
