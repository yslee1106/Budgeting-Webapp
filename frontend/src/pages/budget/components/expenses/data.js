import Icon from "@mui/material/Icon";
import TextField from '@mui/material/TextField';

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

export default function expensesData() {
    const Expense = ({ icon, name }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <Icon fontSize="small">{icon}</Icon>
            <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
                {name}
            </MDTypography>
        </MDBox>
    );

    const Progress = ({ color, value }) => (
        <MDBox display="flex" alignItems="center">
            <MDBox ml={2} mr={2} width="8rem">
                <MDProgress variant="gradient" color={color} value={value} />
            </MDBox>
            <MDTypography width="3rem" variant="caption" color="text" fontWeight="medium">
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
            { Header: "Expense", accessor: "expense", width: "50%", align: "left" },
            { Header: "Progress", accessor: "progress", width: "40%", align: "center" },
            { Header: "More", accessor: "action", width: "10%", align: "right" },
        ],

        rows: [
            {
                expense: <Expense icon="bolt" name="Electricity" />,
                progress: <Progress color="success" value={100} />,
                action: <Action />
            },
            {
                expense: <Expense icon="bolt" name="Electricity" />,
                progress: <Progress color="success" value={100} />,
                action: <Action />
            },
            {
                expense: <Expense icon="bolt" name="Electricity" />,
                progress: <Progress color="success" value={100} />,
                action: <Action />
            },
            {
                expense: <Expense icon="bolt" name="Electricity" />,
                progress: <Progress color="success" value={100} />,
                action: <Action />
            },
            {
                expense: <Expense icon="bolt" name="Electricity" />,
                progress: <Progress color="success" value={100} />,
                action: <Action />
            },
            {
                expense: <Expense icon="bolt" name="Electricity" />,
                progress: <Progress color="success" value={100} />,
                action: <Action />
            },
            {
                expense: <Expense icon="bolt" name="Electricity" />,
                progress: <Progress color="success" value={100} />,
                action: <Action />
            },
            {
                expense: <Expense icon="bolt" name="Electricity" />,
                progress: <Progress color="success" value={100} />,
                action: <Action />
            },
        ]
    }
}