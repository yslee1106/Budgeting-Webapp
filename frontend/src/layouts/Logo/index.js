import PropTypes from 'prop-types';

// @mui material components
import Link from "@mui/material/Link";
import LogoDevSharp from "@mui/icons-material/LogoDevSharp";


// Material Dashboard 2 React components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function Logo({ color, size }) {
    const company = 'FINTRACK';
    const link = 'https://github.com/yslee1106';

    const sizeConfig = {
        sm: {
            icon: 24,
            typography: 'body2'
        },
        md: {
            icon: 32,
            typography: 'h6'
        },
        lg: {  // Optional larger size
            icon: 40,
            typography: 'h5'
        }
    };

    // Safely get size configuration or fallback to 'md'
    const config = sizeConfig[size] || sizeConfig.md;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: '1rem',
                zIndex: 1,
            }}
        >
            <LogoDevSharp
                sx={{
                    width: config.icon,
                    height: config.icon,
                    color: color
                }} />
            <Link href={link} target='_blank' underline="none">
                <Typography
                    variant={config.typography}
                    sx={{
                        fontFamily: "Roboto",
                        fontWeight: 500,
                        color: color
                    }}
                >
                    {company}
                </Typography>
            </Link >
        </Box>
    );
}

// Type checking with PropTypes
Logo.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default Logo;
