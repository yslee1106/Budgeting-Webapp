import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "layouts/DataTable";

import goalsData from "pages/budget/components/goals/data";


function Goals() {
    const { columns: columns, rows: rows } = goalsData();

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
                    Goals
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

export default Goals;