import React, { useState } from "react";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import {
    Modal,
    Box,
    Typography,
    Stack,
    TextField,
    FormControl,
    FormControlLabel,
    Select,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    Icon,
    Switch,
    Fade,
    MenuItem,
    Button,
} from '@mui/material';

import ProgressTable from "layouts/Table/ProgressTable";
import BudgetCategorySelect from "layouts/Selects/Budget";


function Goals({ data }) {
    // FORM VARIABLES
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        targetAmount: '',
        enableTargetDate: false,
        targetDate: null,
    });

    // CONTROL STATES
    const [sortBy, setSortBy] = useState("");
    const [openAddGoals, setOpenAddGoals] = useState(false);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort goal by ${event.target.value} clicked`);
    };

    const handleMoreOptionsClick = (event, goalId) => {
        event.stopPropagation();
        console.log(`More options for goal ${goalId} clicked`);
    };

    const handleAddGoalsSubmit = (event) => {
        event.preventDefault();
        try {
            console.log(`Submit New Goals`, formData);
            setOpenAddGoals(false);
        } catch (error) {
            console.error(`Error Submitting New Goals:`, error);
        }
    }

    const clearVariables = () => {
        setFormData({
            name: '',
            category: '',
            targetAmount: '',
            enableTargetDate: '',
            targetDate: '',
        });
    }

    const handleOpen = () => {
        clearVariables();
        setOpenAddGoals(true);
    }

    const handleClose = () => {
        clearVariables();
        setOpenAddGoals(false);
    }

    return (
        <>
            <ProgressTable
                title='Goals'
                data={data}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                handleMoreOptionsClick={handleMoreOptionsClick}
                handleAdd={handleOpen}
            />

            {/* Add Goals */}
            <Modal
                open={openAddGoals}
                onClose={handleClose}>

                <Fade in={openAddGoals}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            py: '2rem',
                            px: '3rem',
                            minWidth: '35vw',
                            backgroundColor: (theme) => theme.palette.white.main,
                            borderRadius: '10px',
                        }}>

                        {/* Title */}
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            fontFamily="Inter-Bold, Helvetica"
                            sx={{
                                mb: '2rem'
                            }}
                        >
                            Add Goals
                        </Typography>

                        {/* Fields Box */}
                        <Stack spacing='1.25rem' sx={{ mb: '3rem' }}>

                            {/* Name Field */}
                            <TextField
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />

                            {/* Category Field */}
                            <BudgetCategorySelect
                                modelType='goal'
                                value={formData.category}
                                onChange={value => setFormData({ ...formData, category: value })} />

                            {/* Target Amount Field */}
                            <FormControl
                                fullWidth>
                                <InputLabel>Target Amount</InputLabel>
                                <OutlinedInput
                                    inputProps={{
                                        inputMode: 'decimal',
                                        min: 0
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Icon>attach_money</Icon>
                                        </InputAdornment>
                                    }
                                    label="Target Amount"
                                    value={formData.targetAmount}
                                    onKeyDown={(e) => {
                                        // Block all non-numeric keys except Backspace, Tab, etc.
                                        if (!/[0-9.]/.test(e.key) &&
                                            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        // Validate only one decimal point and numbers
                                        if (/^\d*\.?\d*$/.test(value)) {
                                            setFormData({ ...formData, targetAmount: value });
                                        } else {
                                            // If invalid, revert to last valid value
                                            value = formData.targetAmount || '';
                                        }
                                    }}
                                />
                            </FormControl>

                            {/* Target Date Switch */}
                            <FormControlLabel
                                label="Target Date"
                                labelPlacement="left"
                                control={
                                    <Switch
                                        value={formData.enableTargetDate}
                                        onChange={(e) => setFormData({ ...formData, enableTargetDate: e.target.checked })}
                                        sx={{ ml: '10px' }}
                                    />}
                                sx={{
                                    pl: '5px',
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'flex-end'
                                }}
                            />

                            {/* Target Date Field */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DesktopDatePicker']}>
                                    <DesktopDatePicker
                                        label="Target Date"
                                        value={formData.targetDate ? dayjs(formData.targetDate) : null}
                                        onChange={(value) => setFormData({ ...formData, targetDate: value })}
                                        disabled={!formData.enableTargetDate} />
                                </DemoContainer>
                            </LocalizationProvider>

                        </Stack>

                        {/* Control Button Box */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >

                            {/* Confirm Button */}
                            <Button
                                variant="contained"
                                onClick={handleAddGoalsSubmit}
                                sx={{
                                    px: '2rem',
                                    py: '0.7rem',
                                    borderRadius: "10px",
                                    backgroundColor: "#212121",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                }}
                            >
                                CONFIRM
                            </Button>

                            {/* Cancel Button */}
                            <Button
                                variant="outlined"
                                onClick={handleClose}
                                sx={{
                                    px: '2rem',
                                    py: '0.7rem',
                                    borderRadius: "10px",
                                    borderColor: "#212121",
                                    borderWidth: 1.5,
                                    color: "#212121",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                }}
                            >
                                CANCEL
                            </Button>
                        </Box>

                    </Box>
                </Fade>

            </Modal>
        </>
    )
}

export default Goals;