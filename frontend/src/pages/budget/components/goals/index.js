import React, { useState } from "react";
import { useGoals } from 'services/budget/queryHooks';
import { useCreateGoal } from 'services/budget/budgetMutations';

import { TextField, Box } from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ProgressTable from "layouts/Table/ProgressTable";
import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";
import SwitchField from "layouts/Form/components/switchField";


function Goals() {
    //
    // VARIABLES
    //
    const { data: goalsData = [] } = useGoals();
    const { mutateAsync: addGoal, isLoading } = useCreateGoal();
    const [sortBy, setSortBy] = useState("");
    const [openAddGoals, setOpenAddGoals] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        targetAmount: '',
        enableTargetDate: false,
        targetDate: null,
    });

    //
    // FUNCTIONS
    //
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort goal by ${event.target.value} clicked`);
    };

    const handleMoreOptionsClick = (event, goalId) => {
        event.stopPropagation();
        console.log(`More options for goal ${goalId} clicked`);
    };

    const handleAddGoalsSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name ||
            !formData.category ||
            !formData.targetAmount ||
            (formData.enableTargetDate && !formData.targetDate)) {

            alert('Please fill in the required fields');
            return;
        }

        try {
            await addGoal(formData);
            alert('Goal added');

            clearFormVariables();
            setOpenAddGoals(false);
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }

    const clearFormVariables = () => {
        setFormData({
            name: '',
            category: '',
            targetAmount: '',
            enableTargetDate: false,
            targetDate: null,
        });
    }

    const handleOpenForm = () => {
        clearFormVariables();
        setOpenAddGoals(true);
    }

    const handleCloseForm = () => {
        clearFormVariables();
        setOpenAddGoals(false);
    }

    return (
        <>
            <ProgressTable
                title='Goals'
                data={goalsData}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                handleMoreOptionsClick={handleMoreOptionsClick}
                handleAdd={handleOpenForm}
                fieldMappings={{
                    due: 'target_date',
                    targetAmount: 'target_amount',
                    currentAmount: 'current_amount',
                    name: 'name',
                    percentage: 'percentage',
                    id: 'id',
                }}
            />

            {/* Add Goals */}
            <Form
                title='Add Goals'
                formState={openAddGoals}
                handleCloseForm={handleCloseForm}
                handleSubmit={handleAddGoalsSubmit}>

                {/* Name Field */}
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                {/* Category Field */}
                <SelectField
                    modelType='goal'
                    label='Category'
                    value={formData.category}
                    onChange={value => setFormData({ ...formData, category: value })} />

                {/* Target Amount Field */}
                <NumberField
                    label='Target Amount'
                    startAdornment='attach_money'
                    dataState={formData.targetAmount}
                    onChange={value => setFormData({ ...formData, targetAmount: value })} />

                {/* Target Date Switch */}
                <SwitchField
                    label='Target Date'
                    dataState={formData.enableTargetDate}
                    onChange={e => setFormData({
                        ...formData,
                        enableTargetDate: e.target.checked,
                        targetDate: e.target.checked ? formData.targetDate : null
                    })} />

                {/* Target Date Field */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Target Date"
                        value={formData.targetDate ? dayjs(formData.targetDate) : null}
                        onChange={(value) => setFormData({ ...formData, targetDate: value })}
                        disabled={!formData.enableTargetDate}
                    />
                </LocalizationProvider>

            </Form>
        </>
    )
}

export default Goals;