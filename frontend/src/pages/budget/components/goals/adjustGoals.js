import React, { useState, useEffect } from "react";
import { usePatchGoalCurrentAmount } from 'services/budget/budgetMutations';

import { Box } from '@mui/material';

import Loading from "layouts/Loading";
import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";
import select from "assets/theme/components/form/select";

function AdjustGoals({ isOpen, setIsOpen, goalsData, selectedGoal }) {
    //
    // State Variables
    //

    const [adjustGoalData, setAdjustGoalData] = useState({
        goal: selectedGoal ? selectedGoal : '',
        type: 'increase',
        amount: '',
        updatedTotal: selectedGoal ? selectedGoal.current_amount : '',
    });

    //
    // Helpers Functions
    //

    useEffect(() => {
        if (isOpen && selectedGoal) {
            setAdjustGoalData({
                ...adjustGoalData,
                goal: selectedGoal,
                updatedTotal: selectedGoal.current_amount,
            });
        }
    }, [selectedGoal, isOpen]);

    const { mutateAsync: patchGoal, loadingPatchGoal } = usePatchGoalCurrentAmount();

    const clearAdjustGoalVariables = () => {
        setAdjustGoalData({
            goal: selectedGoal || '',
            type: 'increase',
            amount: '',
            updatedTotal: selectedGoal ? selectedGoal.current_amount : '',
        });
    }

    //
    // Event Handlers
    //

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
            setIsOpen(false);
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }

    const handleCloseAdjustGoalForm = () => {
        clearAdjustGoalVariables();
        setIsOpen(false);
    }

    //
    // UI Design
    //

    if (loadingPatchGoal) {
        return (
            <Loading />
        );
    }

    return (
        <Form
            title='Adjust Goals'
            formState={isOpen}
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
    )
}

export default AdjustGoals;