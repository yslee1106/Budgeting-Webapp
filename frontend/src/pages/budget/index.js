import Grid from "@mui/material/Grid2";
import Stack from '@mui/material/Stack';
import MDBox from "components/MDBox";

import DashboardLayout from "layouts/Containers/DashboardLayout";
import Footer from "layouts/Footer";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";

import Session from "pages/budget/components/session"
import Funds from "pages/budget/components/funds";
import Goals from "pages/budget/components/goals";
import Expenses from "pages/budget/components/expenses";

function Budget() {
    return (
        <DashboardLayout>
            <DashboardNavbar absolute isMini />
            <MDBox mt={8}>
                <MDBox mb={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Session />
                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox mb={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} xl={6}>
                            <Grid container spacing={3}>
                                <Stack>
                                    <Grid item xs={12}>
                                        <MDBox mb={3}>
                                            <Funds />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MDBox mt={3}>
                                            <Goals />
                                        </MDBox>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <MDBox mt={3}>
                                <Expenses />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
        </DashboardLayout>
    )
}

export default Budget;