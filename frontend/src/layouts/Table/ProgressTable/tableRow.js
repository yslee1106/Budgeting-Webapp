import { useTheme } from "@emotion/react";

import dayjs from "dayjs";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from '@mui/material/Icon'
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function TableRow({
    data,
    limit,
    handleMoreOptionsClick,
    fieldMappings = {
        due: 'target_date',
        targetAmount: 'target_amount',
        currentAmount: 'current_amount',
        name: 'name',
        percentage: 'percentage',
        id: 'id'
    }
}) {
    const theme = useTheme();
    const items = Array.isArray(data)
        ? data
        : Object.keys(data).map(key => ({ ...data[key], id: key }));

    return (
        <List sx={{ width: "100%" }}>
            {items.map((item) => {

                const getField = (field) => item[fieldMappings[field]] ?? item[field] ?? '';

                const due = getField('due');
                const targetAmount = getField('targetAmount');
                const currentAmount = getField('currentAmount');
                const name = getField('name');
                const percentage = getField('percentage');
                const id = getField('id');

                return (
                    <ListItem
                        key={id}
                        sx={{
                            height: 80,
                            cursor: "pointer",
                            position: "relative",
                            pb: 3,
                        }}
                    >

                        {/* Icon */}
                        <ListItemIcon sx={{
                            minWidth: 56,
                            ml: '10px'
                        }}>
                            <Icon sx={{
                                fontSize: '32px'
                            }}>
                                error
                            </Icon>
                        </ListItemIcon>

                        <ListItemText
                            primary={
                                // Title
                                <Typography variant="h6" fontWeight="600">
                                    {name}
                                </Typography>
                            }
                            secondary={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        pr: '1rem'
                                    }}>

                                    {/* Amounts */}
                                    <Typography fontSize="12px" fontWeight='regular' color='black'>
                                        $ {' '} {currentAmount} / $ {' '} {targetAmount}
                                    </Typography>

                                    {/* Due Date */}
                                    {due && (
                                        <Typography
                                            fontSize="12px"
                                            fontWeight={dayjs(due).isBefore(dayjs()) || dayjs(due).diff(dayjs(), 'day') <= 3 ? 900 : 500}
                                            color={dayjs(due).isBefore(dayjs()) || dayjs(due).diff(dayjs(), 'day') <= 3 ? theme.palette.negative.main : theme.palette.black.main}>

                                            Due: {' '} {dayjs(due).format('DD/MM/YYYY')}
                                        </Typography>
                                    )}

                                </Box>

                            }
                        />

                        {/* More Options Button */}
                        <IconButton
                            edge="end"
                            aria-label="more options"
                            onClick={(e) => handleMoreOptionsClick(e, id)}
                            sx={{
                                mr: '10px'
                            }}
                        >
                            <Icon>more_vert</Icon>
                        </IconButton>

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 10,
                                width: "calc(100% - 28px)",
                            }}
                        >

                            {/* Progress Bar */}
                            <LinearProgress
                                variant="determinate"
                                value={percentage}
                                sx={{
                                    height: 5,
                                    borderRadius: "20px",
                                    backgroundColor: "#d9d9d9",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: !limit
                                            ? theme.palette.positive.main
                                            : percentage < 70
                                                ? theme.palette.warning.main
                                                : theme.palette.negative.main,
                                        borderRadius: "20px",
                                    },
                                }}
                            />
                        </Box>
                    </ListItem>
                )

            })}
        </List>
    )

}

export default TableRow;