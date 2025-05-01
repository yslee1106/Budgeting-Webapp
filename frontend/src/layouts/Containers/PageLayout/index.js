import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import Box from '@mui/material/Box';

import { useMaterialUIController, setLayout } from "context/theme";
import { useTheme } from "@emotion/react";

function PageLayout({ background, children }) {
    const [, dispatch] = useMaterialUIController();
    const { pathname } = useLocation();
    const theme = useTheme();

    useEffect(() => {
        setLayout(dispatch, "page");
    }, [pathname]);

    return (
        <Box
            sx={{
                overflowX: "hidden",
                width: '100vw',
                height: '100%',
                minHeight: '100vh',
                bgcolor: theme.palette[background]?.main || theme.palette.background.default
            }}
        >
            {children}
        </Box>
    );
}

// Typechecking props for the PageLayout
PageLayout.propTypes = {
    background: PropTypes.oneOf(["background", 'primary']),
    children: PropTypes.node.isRequired,
};

export default PageLayout;