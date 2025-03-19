import Icon from "@mui/material/Icon";
import TextField from '@mui/material/TextField';

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

export default function goalsData() {
    const Goal = ({ icon, name }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <Icon fontSize="small">{icon}</Icon>
            <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
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

    return {
        columns: [
            { Header: "Goal", accessor: "goal", width: "40%", align: "left" },
            { Header: "Progress", accessor: "progress", width: "40%", align: "center" },
            { Header: "More", accessor: "action", width: "20%", align: "right" },
        ],

        rows: [
            {
                goal: <Goal icon="directions_car" name="Tesla" />,
                progress: <Progress color="info" value={40} />,
                action: <Action />
            },
            {
                goal: <Goal icon="directions_car" name="Tesla" />,
                progress: <Progress color="info" value={40} />,
                action: <Action />
            },
            {
                goal: <Goal icon="directions_car" name="Tesla" />,
                progress: <Progress color="info" value={40} />,
                action: <Action />
            },
            {
                goal: <Goal icon="directions_car" name="Tesla" />,
                progress: <Progress color="info" value={40} />,
                action: <Action />
            },
            {
                goal: <Goal icon="directions_car" name="Tesla" />,
                progress: <Progress color="info" value={40} />,
                action: <Action />
            },
        ]
    }
}