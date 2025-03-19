import React, { useRef } from "react";

import Grid from '@mui/material/Grid2';
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";

import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

import DefaultInfoCard from "layouts/InfoCards/DefaultInfoCard";
import { Button } from '@mui/material';

function Session() {
    const containerRef = useRef(null);

    const scroll = (scrollOffset) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: scrollOffset,
                behavior: "smooth", // Smooth scrolling
            });
        }
    };

    return (

        <MDBox
            display="flex"
            flex-direction="horizontal"
            justifyContent="space-between"
            gap={2}
            py={2}
            px={2}
        >

            <IconButton
                variant="contained"
                color="info"
                onClick={() => scroll(-100)}
                fullwidth
            >
                <Icon sx={{ fontWeight: "bold" }}>navigate_before</Icon>
            </IconButton>

            <Card>


                <MDBox
                    ref={containerRef}
                    sx={{
                        display: "flex",
                        flexDirection: "horizontal",
                        justifyContent: "space-between",
                        overflowX: "auto",
                        gap: 5,
                        scrollbarWidth: "none", // Hide scrollbar for Firefox
                        msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                        "&::-webkit-scrollbar": {
                            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
                        },
                        py: 2,
                        px: 5,
                    }}
                >
                    <MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton>
                    <MDButton variant="contained" color="info">
                        <Stack>
                            <MDTypography variant="h8" color="white" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="white">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton>
                    <MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton><MDButton variant="outlined" color="dark">
                        <Stack>
                            <MDTypography variant="h8" color="dark" fontSize={8}>
                                2025
                            </MDTypography>
                            <MDTypography variant="h6" color="dark">
                                May
                            </MDTypography>
                        </Stack>
                    </MDButton>
                </MDBox>
            </Card>
            <IconButton varient="contained" color="info" onClick={() => scroll(100)}>
                <Icon sx={{ fontWeight: "bold" }}>navigate_next</Icon>
            </IconButton>
        </MDBox>

    );
}

export default Session;