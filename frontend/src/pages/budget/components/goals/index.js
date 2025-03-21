import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

import DataTable from "layouts/DataTable";


function Goals({ data }) {
    const Goal = ({ icon, name }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1} width="6rem">
            <Icon fontSize="small">{icon}</Icon>
            <MDTypography display="block" variant="button" fontWeight="medium" ml={2} lineHeight={1}>
                {name}
            </MDTypography>
        </MDBox>
    );

    const Progress = ({ color, value }) => (
        <MDBox display="flex" alignItems="center">
            <MDBox ml={2} mr={2} width="6rem">
                <MDProgress variant="gradient" color={color} value={value} />
            </MDBox>
            <MDTypography width="2rem" variant="caption" color="text" fontWeight="medium">
                {value}%
            </MDTypography>
        </MDBox>
    );

    const Action = () => (
        <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
        </MDTypography>
    )

    const columns = [
        { Header: "Goal", accessor: "goal", width: "60%", align: "left" },
        { Header: "Progress", accessor: "progress", width: "30%", align: "center" },
        { Header: "More", accessor: "action", width: "10%", align: "right" },
    ]

    const rows = data.map((item) => ({
        goal: <Goal icon="directions_car" name={ item.name } />,
        progress: <Progress color={ item.fulfilled ? 'success' : 'info' } value={ item.percentage } />,
        action: <Action />
    }))

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