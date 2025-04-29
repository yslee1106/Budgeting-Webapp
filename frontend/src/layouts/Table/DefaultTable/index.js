import { useTheme } from "@emotion/react";
import dayjs from "dayjs";

import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";

import {
    AddBox as AddIncomeIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import Options from "layouts/Table/DefaultTable/options";

function DefaultTable({
    title,
    data,
    fieldMappings = {
        title: 'title',
        due: 'due',
        amount: 'amount',
        id: 'id'
    },
    options,
    handleAdd,
}) {

    const theme = useTheme();

    const items = Array.isArray(data)
        ? data
        : Object.keys(data).map(key => ({ ...data[key], id: key }));

    return (

        <Box sx={{ mt: '1rem' }}>

            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >

                {/* Title */}
                <Typography variant="h3">
                    {title}
                </Typography>

                {/* Add Button */}
                <IconButton onClick={handleAdd}>
                    <AddIncomeIcon sx={{
                        fontSize: '24px',
                        color: (theme) => theme.palette.primary.main
                    }} />
                </IconButton>

            </Box>

            <Box>
                <List sx={{ mr: '1rem' }}>

                    {items.map((item) => {

                        const getField = (field) => item[fieldMappings[field]] ?? item[field] ?? '';

                        const title = getField('title');
                        const due = getField('due');
                        const amount = getField('amount');
                        const id = getField('id');

                        return (
                            <ListItem key={id} sx={{ height: '56px' }}>

                                {/* Name and Payday */}
                                <ListItemText
                                    primary={
                                        <Typography
                                            fontSize='18px'
                                            fontWeight="500"
                                        >
                                            {title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            fontSize='12px'
                                            fontWeight='regular'
                                        >
                                            {dayjs(due).format('DD MMMM YYYY')}
                                        </Typography>
                                    }
                                />

                                {/* Amount */}
                                <Box sx={{ width: '30%' }}>
                                    <Typography
                                        fontSize='18px'
                                        fontWeight="500"

                                        color={theme.palette.positive.main}
                                    >
                                        $ {amount}
                                    </Typography>
                                </Box>

                                {/* More Options */}
                                <Options
                                    options={options}
                                    item={item}
                                />

                            </ListItem>
                        )

                    })}

                </List>
            </Box>

        </Box>
    )
}

export default DefaultTable;