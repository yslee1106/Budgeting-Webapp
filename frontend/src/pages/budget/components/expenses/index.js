import React, { useState } from "react";
import { useBuckets } from 'services/budget/queryHooks';
import { useCreateExpense } from "services/budget/budgetMutations";

import { TextField, Box } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import ProgressTable from "layouts/Table/ProgressTable";
import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";
import SwitchField from "layouts/Form/components/switchField";


function Expenses({ selectedSession, currentSession }) {
    //
    // VARIABLES
    //
    const { data: bucketsData = [] } = useBuckets(selectedSession?.id);
    const { mutateAsync: addExpense, isLoading } = useCreateExpense(currentSession);
    const [sortBy, setSortBy] = useState("");
    const [openAddExpense, setOpenAddExpense] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        spendingLimit: '',
        recurring: false,
        paymentFrequency: null,
        nextPayment: null,
    });

    //
    // FUNCTIONS
    //
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort expense by ${event.target.value} clicked`);
    };

    const handleMoreOptionsClick = (event, bucketId) => {
        event.stopPropagation();
        console.log(`More options for expense ${bucketId} clicked`);
    };

    const handleAddExpensesSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name ||
            !formData.category ||
            !formData.spendingLimit ||
            (formData.recurring && !formData.paymentFrequency && !formData.nextPayment)) {

            alert('Please fill in the required fields');
            return;
        }

        try {
            await addExpense(formData);
            alert('Expense added');

            clearFormVariables();
            setOpenAddExpense(false);
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
            recurring: false,
            paymentFrequency: null,
            nextPayment: null,
        });
    }

    const handleOpenForm = () => {
        clearFormVariables();
        setOpenAddExpense(true);
    }

    const handleCloseForm = () => {
        clearFormVariables();
        setOpenAddExpense(false);
    }

    return (
        <>
            <ProgressTable
                title='Expenses'
                data={bucketsData}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                handleMoreOptionsClick={handleMoreOptionsClick}
                handleAdd={handleOpenForm}
                fieldMappings={{
                    targetAmount: 'spending_limit',
                    currentAmount: 'current_amount',
                    name: 'name',
                    percentage: 'percentage',
                    id: 'id',
                }}
            />

            {/* Add Expenses */}
            <Form
                title='Add Expenses'
                formState={openAddExpense}
                handleCloseForm={handleCloseForm}
                handleSubmit={handleAddExpensesSubmit}>

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
                    modelType='expense'
                    label='Category'
                    value={formData.category}
                    onChange={value => setFormData({ ...formData, category: value })} />

                {/* Target Amount Field */}
                <NumberField
                    label='Spending Limit'
                    startAdornment='attach_money'
                    dataState={formData.spendingLimit}
                    onChange={value => setFormData({ ...formData, spendingLimit: value })} />

                {/* Recurring Expense Switch */}
                <SwitchField
                    label='Recurring Expense'
                    dataState={formData.recurring}
                    onChange={e => setFormData({
                        ...formData,
                        recurring: e.target.checked,
                        paymentFrequency: e.target.checked ? formData.paymentFrequency : null,
                        nextPayment: e.target.checked ? formData.nextPayment : null
                    })} />

                <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        '& > *': {                // Target all direct children
                            flex: 1,                // Distribute space equally
                            minWidth: 0             // Prevent overflow issues
                        }
                    }}>

                    {/* Payment Frequency Field */}
                    <SelectField
                        modelType='frequency'
                        label='Payment Frequency'
                        value={formData.paymentFrequency}
                        onChange={value => setFormData({ ...formData, paymentFrequency: value })}
                        disabled={!formData.recurring} />

                    {/* Next Payment Field */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Next Payment"
                            value={formData.nextPayment ? dayjs(formData.nextPayment) : null}
                            onChange={(value) => setFormData({ ...formData, nextPayment: value })}
                            disabled={!formData.recurring} />
                    </LocalizationProvider>

                </Box>




            </Form>
        </>
    )
}

export default Expenses;