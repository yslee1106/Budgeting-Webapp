import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "layouts/DataTable";

import expensesData from "pages/budget/components/expenses/data";


function Expenses() {
    const { columns: columns, rows: rows } = expensesData();

    return (
        <Card>
            <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
            >
                <MDTypography variant="h6" color="white">
                    Expenses
                </MDTypography>
            </MDBox>
            <MDBox pt={3}>
                <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                />
            </MDBox>
        </Card>
    )
}

export default Expenses;