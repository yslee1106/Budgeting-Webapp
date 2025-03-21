import Grid from '@mui/material/Grid2';

import DefaultInfoCard from "layouts/InfoCards/DefaultInfoCard";

function Funds({ data }) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} xl={4}>
                <DefaultInfoCard
                    icon="account_balance"
                    title="Funds"
                    description="Total Income"
                    value={ data.total_funds }
                />
            </Grid>
            <Grid item xs={12} xl={4}>
                <DefaultInfoCard
                    icon="local_mall"
                    title="Expenditure"
                    description="Total Expense"
                    value={ data.total_expense }
                />
            </Grid>
            <Grid item xs={12} xl={4}>
                <DefaultInfoCard
                    icon="account_balance_wallet"
                    title="Available"
                    description="Funds Remaining"
                    value={ data.available_funds }
                />
            </Grid>
        </Grid>
    );
}

export default Funds;
