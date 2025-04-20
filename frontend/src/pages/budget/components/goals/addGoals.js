import React, { useState } from "react";
import { useCategories } from 'context/helpers/budgetCategories';
import { useCreateGoal } from 'services/budget/budgetMutations';

import { TextField } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";
import SwitchField from "layouts/Form/components/switchField";

function AddGoals({ isOpen, setIsOpen }) {
    
    //
    // State Variables
    //

    const { categories } = useCategories();
    const goalOptions = Object.keys(categories.goals).map((key) => ({
        value: key,
        label: categories.goals[key],
    }));

    const [addGoalData, setAddGoalData] = useState({
        name: '',
        category: '',
        targetAmount: '',
        enableTargetDate: false,
        targetDate: null,
    });

    //
    // Helper Functions 
    //

    const { mutateAsync: addGoal, loadingAddGoal } = useCreateGoal();

    const clearAddGoalVariables = () => {
        setAddGoalData({
            name: '',
            category: '',
            targetAmount: '',
            enableTargetDate: false,
            targetDate: null,
        });
    }

    //
    // Event Handlers
    //

    const handleAddGoalsSubmit = async (event) => {
        event.preventDefault();

        if (!addGoalData.name ||
            !addGoalData.category ||
            !addGoalData.targetAmount ||
            (addGoalData.enableTargetDate && !addGoalData.targetDate)) {

            alert('Please fill in the required fields');
            return;
        }

        try {
            await addGoal(addGoalData);
            alert('Goal added');

            handleCloseAddGoalForm();
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }

    const handleCloseAddGoalForm = () => {
        clearAddGoalVariables();
        setIsOpen(false);
    }

    //
    // UI Design
    //

    return (
        <Form
            title='Add Goals'
            formState={isOpen}
            handleCloseForm={handleCloseAddGoalForm}
            handleSubmit={handleAddGoalsSubmit}>

            {/* Name Field */}
            <TextField
                label="Name"
                fullWidth
                variant="outlined"
                value={addGoalData.name}
                onChange={(e) => setAddGoalData({ ...addGoalData, name: e.target.value })}
            />

            {/* Category Field */}
            <SelectField
                label='Category'
                dataState={addGoalData.category}
                onChange={value => setAddGoalData({ ...addGoalData, category: value })}
                options={goalOptions}
            />

            {/* Target Amount Field */}
            <NumberField
                label='Target Amount'
                startAdornment='attach_money'
                dataState={addGoalData.targetAmount}
                onChange={value => setAddGoalData({ ...addGoalData, targetAmount: value })} />

            {/* Target Date Switch */}
            <SwitchField
                label='Target Date'
                dataState={addGoalData.enableTargetDate}
                onChange={e => setAddGoalData({
                    ...addGoalData,
                    enableTargetDate: e.target.checked,
                    targetDate: e.target.checked ? addGoalData.targetDate : null
                })} />

            {/* Target Date Field */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Target Date"
                    value={addGoalData.targetDate ? dayjs(addGoalData.targetDate) : null}
                    onChange={(value) => setAddGoalData({ ...addGoalData, targetDate: value })}
                    disabled={!addGoalData.enableTargetDate}
                />
            </LocalizationProvider>

        </Form>
    )
}

export default AddGoals;