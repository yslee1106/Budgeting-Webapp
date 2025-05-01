import { useEffect, useState } from "react";
import { BudgetCategoriesProvider } from "context/helpers/budgetCategories";


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
import Income from "pages/profile/components/income";

function Profile() {

    //
    // Variables
    //

    const [currentTab, setCurrentTab] = useState(0);

    //
    // Event Handlers
    //

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    //
    // UI Styles
    //

    const TabButtonStyle = () => {
        return {
            textTransform: 'none',
            fontWeight: 'medium',
            fontSize: '14px',
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar absolute />
            <BudgetCategoriesProvider>
                <Box mt='3rem'>
                    <Grid container spacing={1}>
                        <Grid size={12}>

                            {/* Profile */}
                            <ProfileSection />

                        </Grid>
                        <Grid size={12}>

                            {/* Tabs */}
                            <Box>
                                <Tabs
                                    value={currentTab}
                                    onChange={handleTabChange}
                                    variant="scrollable"
                                    scrollButtons='auto'
                                    aria-label="modal tabs"
                                >
                                    <Tab
                                        key='income'
                                        id='profile-tab-income'
                                        label='Income'
                                        sx={() => TabButtonStyle()}
                                    />
                                    <Tab
                                        key='preference'
                                        id='profile-tab-preference'
                                        label='Preference'
                                        sx={() => TabButtonStyle()}
                                    />
                                </Tabs>
                            </Box>

                            <Box>

                                {currentTab === 0 && (
                                    <Income />
                                )}

                                {currentTab === 1 && (
                                    <Stack spacing={2}>
                                        <Typography variant="h6">Preference</Typography>
                                        <Typography variant="body1">Yet To Be Implemented</Typography>
                                    </Stack>
                                )}

                            </Box>

                        </Grid>
                    </Grid>
                </Box>
            </BudgetCategoriesProvider>
        </DashboardLayout>
    )
}

export default Profile;