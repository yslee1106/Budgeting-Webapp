import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useAuth } from "context/authentication";

import {
    Typography,
    Grid,
    Stack,
    Box,
    Button,
    Tab,
    Tabs,
} from "@mui/material";

import DashboardLayout from "layouts/Containers/DashboardLayout";
import Footer from "layouts/Footer";
import DashboardNavbar from "layouts/DashboardNavbar";
import ProfileSection from "pages/profile/components/profile";

function Profile() {

    return (
        <DashboardLayout>
            <DashboardNavbar absolute />
            <Box mt='3rem'>
                <Grid container spacing={3}>
                    <Grid size={12}>

                        {/* Profile */}
                        <ProfileSection />

                        {/* Tabs */}
                        <Box>
                            <Tabs
                                variant="scrollable"
                                scrollButtons='auto'
                                aria-label="modal tabs"
                            >
                                <Tab
                                    label='Income'
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 'medium',
                                        fontSize: '14px',
                                    }} />
                                <Tab
                                    label='Preference'
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 'medium',
                                        fontSize: '14px',
                                    }} />
                            </Tabs>
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </DashboardLayout>
    )
}

export default Profile;