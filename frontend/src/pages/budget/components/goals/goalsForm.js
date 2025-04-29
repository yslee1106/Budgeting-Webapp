import { useState, useEffect } from "react";
import { useCategories } from 'context/helpers/budgetCategories';
import { useCreateGoal, usePatchGoal } from 'services/budget/budgetMutations';

import { TextField } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";
import SwitchField from "layouts/Form/components/switchField";

function GoalsForm({ isOpen, setIsOpen, selectedGoal = null }) {

    //
    // State Variables
    //

    const title = selectedGoal ? 'Edit Goals' : 'Add Goals';

    const { categories } = useCategories();
    const goalOptions = Object.keys(categories.goals).map((key) => ({
        value: key,
        label: categories.goals[key],
    }));

    const [editedData, setEditedData] = useState({
        name: false,
        category: false,
        targetAmount: false,
        enableTargetDate: false,
        targetDate: false,
    });

    const [goalData, setGoalData] = useState({
        name: '',
        category: '',
        targetAmount: '',
        enableTargetDate: false,
        targetDate: null,
    });

    //
    // Helper Functions 
    //

    useEffect(() => {
        if (isOpen && selectedGoal) {
            setGoalData({
                id: selectedGoal ? selectedGoal.id : null,
                name: selectedGoal ? selectedGoal.name : '',
                category: selectedGoal ? selectedGoal.category : '',
                targetAmount: selectedGoal ? selectedGoal.target_amount : '',
                enableTargetDate: selectedGoal ? selectedGoal.target_date !== null : false,
                targetDate: selectedGoal ? selectedGoal.target_date : null,
            })
        }
    }, [selectedGoal, isOpen])

    useEffect(() => {
        if (selectedGoal !== null) {
            setEditedData({
                name: selectedGoal.name !== goalData.name,
                category: selectedGoal.category !== goalData.category,
                targetAmount: selectedGoal.target_amount !== goalData.targetAmount,
                enableTargetDate: !!selectedGoal.target_date !== goalData.enableTargetDate,
                targetDate: selectedGoal.target_date !== goalData.targetDate,
            })
        }
    }, [selectedGoal, goalData])

    const { mutateAsync: addGoal, loadingAddGoal } = useCreateGoal();
    const { mutateAsync: editGoal, loadingEditGoal } = usePatchGoal();

    //
    // Event Handlers
    //

    const handleGoalsSubmit = async (event) => {
        event.preventDefault();

        if (!goalData.name ||
            !goalData.category ||
            !goalData.targetAmount ||
            (goalData.enableTargetDate && !goalData.targetDate)) {

            alert('Please fill in the required fields');
            return;
        }

        try {
            if (selectedGoal) {
                const changedData = {};

                Object.keys(editedData).forEach(key => {
                    if (editedData[key]) { // If this field was edited
                        changedData[key] = goalData[key];
                    }
                });

                if (Object.keys(changedData).length === 0) {
                    alert('No changes were made');
                    return;
                }

                changedData['id'] = goalData.id;

                await editGoal(changedData);
                alert('Goal updated');
            }
            else {
                await addGoal(goalData);
                alert('Goal added');
            }

            handleCloseGoalForm();
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }

    const handleCloseGoalForm = () => {
        setIsOpen(false);
    }

    //
    // UI Design
    //

    return (
        <Form
            title='Add Goals'
            formState={isOpen}
            handleCloseForm={handleCloseGoalForm}
            handleSubmit={handleGoalsSubmit}>

            {/* Name Field */}
            <TextField
                label="Name"
                fullWidth
                variant="outlined"
                value={goalData.name}
                onChange={(e) => setGoalData({ ...goalData, name: e.target.value })}
            />

            {/* Category Field */}
            <SelectField
                label='Category'
                dataState={goalData.category}
                onChange={value => setGoalData({ ...goalData, category: value })}
                options={goalOptions}
            />

            {/* Target Amount Field */}
            <NumberField
                label='Target Amount'
                startAdornment='attach_money'
                dataState={goalData.targetAmount}
                onChange={value => setGoalData({ ...goalData, targetAmount: value })} />

            {/* Target Date Switch */}
            <SwitchField
                label='Target Date'
                dataState={goalData.enableTargetDate}
                onChange={e => setGoalData({
                    ...goalData,
                    enableTargetDate: e.target.checked,
                    targetDate: e.target.checked ? goalData.targetDate : null
                })} />

            {/* Target Date Field */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Target Date"
                    value={goalData.targetDate ? dayjs(goalData.targetDate) : null}
                    onChange={(value) => setGoalData({ ...goalData, targetDate: value })}
                    disabled={!goalData.enableTargetDate}
                />
            </LocalizationProvider>

        </Form>
    )
}

export default GoalsForm;