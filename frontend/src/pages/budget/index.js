import { useEffect, useState } from "react";
import { fetchSessions, fetchBucketBySession, fetchGoals } from 'services/budgetService';
import { useAuth } from 'context/authentication';

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
                setSelectedSession(items[items.length - 1]);
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
            <DashboardNavbar absolute />
            <Box mt='3rem'>
                <Box mb='1rem'>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Session data={sessionsData} selected={selectedSession} setSelected={setSelectedSession} />
                        </Grid>
                    </Grid>
                </Box>
                <Box mb='1rem'>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, xl: 6 }}>
                            <Grid container spacing={3}>
                                <Stack sx={{ width: '100%', gap: '1rem' }}>
                                    <Grid size={12}>
                                        <Funds data={selectedSession} />
                                    </Grid>
                                    <Grid size={12}>
                                        <Goals data={goalsData} />
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid size={{ xs: 12, xl: 6 }}>
                            <Expenses data={bucketsData} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </DashboardLayout >
    )
}

export default Budget;