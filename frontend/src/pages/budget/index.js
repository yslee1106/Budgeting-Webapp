import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useAuth } from 'context/authentication';
import { BudgetCategoriesProvider } from "context/helpers/budgetCategories";
import { CurrentPeriodProvider } from "context/helpers/currentPeriod";


import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

import DashboardLayout from "layouts/Containers/DashboardLayout";
import Footer from "layouts/Footer";
import DashboardNavbar from "layouts/DashboardNavbar";

import Session from "pages/budget/components/session";
import Funds from "pages/budget/components/funds";
import Goals from "pages/budget/components/goals";
import Expenses from "pages/budget/components/expenses";

function Budget() {
    const { logout } = useAuth()

    // STATES
    const [selectedPeriod, setSelectedPeriod] = useState(null);

    return (
        <CurrentPeriodProvider>
            <DashboardLayout>
                <DashboardNavbar absolute />
                <BudgetCategoriesProvider>
                    <Box mt='3rem'>
                        <Box mb='1rem'>
                            <Grid container spacing={3}>
                                <Grid size={12}>
                                    <Session
                                        selectedPeriod={selectedPeriod}
                                        setSelectedPeriod={setSelectedPeriod} />
                                </Grid>
                            </Grid>
                        </Box>
                        {selectedPeriod && (
                            <Box mb='1rem'>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, xl: 6 }}>
                                        <Grid container spacing={3}>
                                            <Stack sx={{ width: '100%', gap: '1rem' }}>
                                                <Grid size={12}>
                                                    <Funds selectedPeriod={selectedPeriod} />
                                                </Grid>
                                                <Grid size={12}>
                                                    <Goals />
                                                </Grid>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                    <Grid size={{ xs: 12, xl: 6 }}>
                                        <Expenses selectedPeriod={selectedPeriod} />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Box>
                </BudgetCategoriesProvider>
            </DashboardLayout >
        </CurrentPeriodProvider>

    )
}

export default Budget;