import { useEffect, useState } from "react";
import { fetchSessions, fetchBucketBySession, fetchGoals } from 'services/budgetService';
import { useAuth } from 'context/authentication';

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
    const [sessionsData, setSessionsData] = useState([]);
    const [bucketsData, setBucketsData] = useState([]);
    const [goalsData, setGoalsData] = useState([]);
    const [selectedSession, setSelectedSession] = useState([]);
    const { logout } = useAuth()

    // Session State
    useEffect(() => {
        const getData = async () => {
            try {
                const items = await fetchSessions(); // Use the API function
                setSessionsData(items);
                setSelectedSession(items[0]);
            } catch (error) {
                console.error('Error:', error);
                if (error.response?.status === 401) {
                    logout(); // Handle unauthorized access
                }
            }
        };

        getData();
    }, []);

    // Buckets State
    useEffect(() => {
        if (selectedSession) {
            const fetchData = async () => {
                try {
                    const buckets = await fetchBucketBySession(selectedSession.id);
                    setBucketsData(buckets);
                } catch (error) {
                    console.error('Error', error);
                    if (error.response?.status === 401) {
                        logout(); // Handle unauthorized access
                    }
                }
            };

            fetchData();
        }
    }, [selectedSession]);

    // Goals State
    useEffect(() => {
        const getData = async () => {
            try {
                const items = await fetchGoals(); // Use the API function
                setGoalsData(items);
            } catch (error) {
                console.error('Error:', error);
                if (error.response?.status === 401) {
                    logout(); // Handle unauthorized access
                }
            }
        };

        getData();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar absolute isMini />
            <MDBox mt={8}>
                <MDBox mb={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Session data={sessionsData} selected={selectedSession} setSelected={setSelectedSession} />
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
                                            <Funds data={selectedSession} />
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MDBox mt={3}>
                                            <Goals data={goalsData} />
                                        </MDBox>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <MDBox mt={3}>
                                <Expenses data={bucketsData} />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
        </DashboardLayout>
    )
}

export default Budget;