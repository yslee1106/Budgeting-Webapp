import { useTheme } from "@emotion/react";

import { useSessions } from "services/budget/queryHooks";

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';

const DefaultInfoCard = ({ icon, title, description, value, positive }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                border: '1px solid',
                height: "100%",
                width: '100%',
                display: "flex",
                flexDirection: "column",
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: '1.5rem',
                    px: '1rem',
                    gap: '1rem',
                }}>

                {/* Icon */}
                <Icon
                    sx={{
                        fontSize: '45px',
                    }}>
                    {icon}
                </Icon>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        gap: 0,
                    }}>

                    {/* Title Text */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "medium",
                            fontSize: '16px',
                            p: 0,
                            m: 0,
                        }}>
                        {title}
                    </Typography>

                    {/* Subtitle Text */}
                    <Typography
                        variant="caption"
                        fontWeight="light"
                        fontSize='10px'>
                        {description}
                    </Typography>

                </Box>
                <Box sx={{
                    textAlign: 'center',
                }}>

                    {/* Value Text */}
                    <Typography
                        variant="h6"
                        fontWeight="800"
                        fontSize='16px'
                        color={positive ? theme.palette.positive.main : theme.palette.negative.main}>
                        $ {value}
                    </Typography>

                </Box>
            </Box>
        </Card >
    );
}

function Funds({ selectedPeriod }) {
    const { data: sessionData = [], isLoading } = useSessions(selectedPeriod)

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, xl: 4 }}>
                <DefaultInfoCard
                    icon="monetization_on"
                    title="Funds"
                    description="Total Income"
                    positive
                    value={sessionData[0]?.total_funds}
                />
            </Grid>
            <Grid size={{ xs: 12, xl: 4 }}>
                <DefaultInfoCard
                    icon="local_mall"
                    title="Expenditure"
                    description="Total Expense"
                    value={sessionData[0]?.total_expense}
                />
            </Grid>
            <Grid size={{ xs: 12, xl: 4 }}>
                <DefaultInfoCard
                    icon="account_balance_wallet"
                    title="Available"
                    description="Funds Remaining"
                    positive={sessionData[0]?.total_funds - sessionData[0]?.total_expense > 0 ? true : false}
                    value={sessionData[0]?.available_funds}
                />
            </Grid>
        </Grid>
    );
}

export default Funds;
