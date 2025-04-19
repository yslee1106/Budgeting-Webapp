import React, { useState } from "react";
import { useGoals } from 'services/budget/queryHooks';
import { useCategories } from 'context/helpers/budgetCategories';
import { useCreateGoal, usePatchGoalCurrentAmount } from 'services/budget/budgetMutations';

import {
    TextField,
    Box,
} from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ProgressTable from "layouts/Table/ProgressTable";
import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";
import SwitchField from "layouts/Form/components/switchField";


function Goals({ currentSession }) {
    const { categories } = useCategories();

    //
    // VARIABLES
    //
    const { data: goalsData = [] } = useGoals(currentSession);
    const [sortBy, setSortBy] = useState("");

    // Add Goals
    const { mutateAsync: addGoal, loadingAddGoal } = useCreateGoal();
    const { mutateAsync: patchGoal, loadingPatchGoal } = usePatchGoalCurrentAmount();
    const [openAddGoals, setOpenAddGoals] = useState(false);
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

    // Adjust Goals
    const [openAdjustGoals, setOpenAdjustGoals] = useState(false);
    const [adjustGoalData, setAdjustGoalData] = useState({
        goal: null,
        type: 'increase',
        amount: '',
        updatedTotal: '',
    });

    //
    // FUNCTIONS
    //
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort goal by ${event.target.value} clicked`);
    };

    // Add Goals
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

            clearAddGoalVariables();
            setOpenAddGoals(false);
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }
    const clearAddGoalVariables = () => {
        setAddGoalData({
            name: '',
            category: '',
            targetAmount: '',
            enableTargetDate: false,
            targetDate: null,
        });
    }
    const handleOpenAddGoalForm = () => {
        clearAddGoalVariables();
        setOpenAddGoals(true);
    }
    const handleCloseAddGoalForm = () => {
        clearAddGoalVariables();
        setOpenAddGoals(false);
    }

    // Adjust Goals
    const handleAdjustGoalsSubmit = async (event) => {
        event.preventDefault();

        if (!adjustGoalData.goal ||
            !adjustGoalData.type ||
            !adjustGoalData.amount) {

            alert('Please fill in the required fields');
            return;
        }

        if (adjustGoalData.type === 'decrease' && parseFloat(adjustGoalData.amount) > parseFloat(adjustGoalData.goal.current_amount)) {
            alert('Updated total cannot be less than 0');
            return;
        }

        if (adjustGoalData.type === 'increase' && parseFloat(adjustGoalData.goal.target_amount) < parseFloat(adjustGoalData.updatedTotal)) {
            alert('Updated total cannot be greater than the target amount');
            return;
        }

        try {
            await patchGoal(adjustGoalData)
            alert('Goal adjusted');

            clearAdjustGoalVariables();
            setOpenAdjustGoals(false);
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }
    const clearAdjustGoalVariables = () => {
        setAdjustGoalData({
            goal: null,
            type: 'increase',
            amount: '',
            updatedTotal: '',
        });
    }
    const handleOpenAdjustGoalForm = (goal) => {
        clearAdjustGoalVariables();
        setAdjustGoalData({ ...adjustGoalData, goal: goal, updatedTotal: goal.current_amount });
        setOpenAdjustGoals(true);
    }
    const handleCloseAdjustGoalForm = () => {
        clearAdjustGoalVariables();
        setOpenAdjustGoals(false);
    }

    // Yet to implement
    const handleInfo = (goal) => {
        console.log('open info for goal', goal);
    }
    const handleEdit = (goal) => {
        console.log('open edit for goal', goal);
    }
    const handleOnDelete = (goal) => {
        console.log('open delete for goal', goal);
    }

    return (
        <>
            <ProgressTable
                title='Goals'
                data={goalsData}
                onInfo={handleInfo}
                onEdit={handleEdit}
                onFunds={handleOpenAdjustGoalForm}
                onDelete={handleOnDelete}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                handleAdd={handleOpenAddGoalForm}
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

            {/* Adjust Goals */}
            <Form
                title='Adjust Goals'
                formState={openAdjustGoals}
                handleCloseForm={handleCloseAdjustGoalForm}
                handleSubmit={handleAdjustGoalsSubmit}>

                {/* Goal */}
                <SelectField
                    label='Goal'
                    dataState={adjustGoalData.goal}
                    onChange={(value) => {
                        clearAdjustGoalVariables();
                        setAdjustGoalData({
                            ...adjustGoalData,
                            goal: value,
                            updatedTotal: value.current_amount,
                        });
                    }}
                    options={goalsData.map(goal => ({
                        value: goal,
                        label: goal.name,
                    }))} />

                {/* Type Field */}
                <SelectField
                    label='Type'
                    dataState={adjustGoalData.type}
                    onChange={(value) => {
                        const amount = parseFloat(adjustGoalData.amount) || 0.00;
                        const currentAmount = parseFloat(adjustGoalData.goal.current_amount) || 0.00;

                        // Calculate the updated total based on the type
                        const updatedTotal =
                            value === 'increase'
                                ? currentAmount + amount
                                : currentAmount - amount;

                        setAdjustGoalData({
                            ...adjustGoalData,
                            type: value,
                            updatedTotal: updatedTotal >= 0 ? updatedTotal : 0, // Prevent negative totals
                        });
                    }}
                    options={[
                        { value: 'increase', label: 'Add Funds' },
                        { value: 'decrease', label: 'Remove Funds' },
                    ]}
                />

                <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        '& > *': {
                            flex: 1,
                            minWidth: 0
                        },
                    }}>

                    {/* Amount Field */}
                    <NumberField
                        label='Amount'
                        startAdornment='attach_money'
                        dataState={adjustGoalData.amount}
                        onChange={(value) => {
                            const newAmount = parseFloat(value) || 0.00; // Ensure the value is a number
                            const currentAmount = parseFloat(adjustGoalData.goal.current_amount) || 0.00;

                            // Calculate the updated total based on the type
                            const updatedTotal =
                                adjustGoalData.type === 'increase'
                                    ? currentAmount + newAmount
                                    : currentAmount - newAmount;

                            setAdjustGoalData({
                                ...adjustGoalData,
                                amount: value,
                                updatedTotal: updatedTotal >= 0 ? updatedTotal : 0, // Prevent negative totals
                            });
                        }}
                    />

                    {/* Updated Total Field */}
                    <NumberField
                        label='Updated Total'
                        startAdornment='attach_money'
                        dataState={adjustGoalData.updatedTotal}
                        readOnly
                    />

                </Box>

            </Form>
        </>
    )
}

export default Goals;