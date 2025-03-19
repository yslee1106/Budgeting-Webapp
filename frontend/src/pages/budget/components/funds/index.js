import Grid from '@mui/material/Grid2';

import DefaultInfoCard from "layouts/InfoCards/DefaultInfoCard";

function Funds() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} xl={4}>
                <DefaultInfoCard
                    icon="account_balance"
                    title="Funds"
                    description="Total Income"
                    value="+$2000"
                />
            </Grid>
            <Grid item xs={12} xl={4}>
                <DefaultInfoCard
                    icon="local_mall"
                    title="Expenditure"
                    description="Total Expense"
                    value="+$2000"
                />
            </Grid>
            <Grid item xs={12} xl={4}>
                <DefaultInfoCard
                    icon="account_balance_wallet"
                    title="Available"
                    description="Funds Remaining"
                    value="+$2000"
                />
            </Grid>
        </Grid>
    );
}

export default Funds;
