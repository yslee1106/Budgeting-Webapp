import React, { useState } from "react";
import { useBuckets } from 'services/budget/queryHooks';
import { useCreateExpense } from "services/budget/budgetMutations";
import { useCategories } from 'context/helpers/budgetCategories';

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


function Expenses({ selectedPeriod, currentPeriod }) {
    const { categories } = useCategories();

    //
    // VARIABLES
    //
    const { data: bucketsData = [] } = useBuckets(selectedPeriod);
    const [sortBy, setSortBy] = useState("");

    // Add Expenses
    const { mutateAsync: addExpense, isLoading } = useCreateExpense(currentPeriod);
    const [openAddExpense, setOpenAddExpense] = useState(false);
    const expenseOptions = Object.entries(categories.expenses).map(([value, label]) => ({
        value,
        label,
    }));
    const frequencyOptions = Object.entries(categories.frequency).map(([value, label]) => ({
        value,
        label,
    }));
    const [addExpenseData, setAddExpenseData] = useState({
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

    const handleAddExpensesSubmit = async (event) => {
        event.preventDefault();

        if (!addExpenseData.name ||
            !addExpenseData.category ||
            !addExpenseData.spendingLimit ||
            (addExpenseData.recurring && !addExpenseData.paymentFrequency && !addExpenseData.nextPayment)) {

            alert('Please fill in the required fields');
            return;
        }

        try {
            await addExpense(addExpenseData);
            alert('Expense added');

            clearAddExpenseVariables();
            setOpenAddExpense(false);
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }

    const clearAddExpenseVariables = () => {
        setAddExpenseData({
            name: '',
            category: '',
            targetAmount: '',
            recurring: false,
            paymentFrequency: null,
            nextPayment: null,
        });
    }

    const handleOpenAddExpenseForm = () => {
        clearAddExpenseVariables();
        setOpenAddExpense(true);
    }

    const handleCloseAddExpenseForm = () => {
        clearAddExpenseVariables();
        setOpenAddExpense(false);
    }

    const handleInfo = (expense) => {
        console.log('open info for expense', expense);
    }

    const handleEdit = (expense) => {
        console.log('open edit for expense', expense);
    }

    const handleFunds = (expense) => {
        console.log('open funds for expense', expense);
    }

    const handleOnDelete = (expense) => {
        console.log('open delete for expense', expense);
    }

    return (
        <>
            <ProgressTable
                title='Expenses'
                limit
                data={bucketsData}
                onInfo={handleInfo}
                onEdit={handleEdit}
                onFunds={handleFunds}
                onDelete={handleOnDelete}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                handleAdd={handleOpenAddExpenseForm}
                fieldMappings={{
                    due: 'next_payment',
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
                handleCloseForm={handleCloseAddExpenseForm}
                handleSubmit={handleAddExpensesSubmit}>

                {/* Name Field */}
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={addExpenseData.name}
                    onChange={(e) => setAddExpenseData({ ...addExpenseData, name: e.target.value })}
                />

                {/* Category Field */}
                <SelectField
                    label='Category'
                    dataState={addExpenseData.category}
                    onChange={value => setAddExpenseData({ ...addExpenseData, category: value })}
                    options={expenseOptions}
                />

                {/* Target Amount Field */}
                <NumberField
                    label='Spending Limit'
                    startAdornment='attach_money'
                    dataState={addExpenseData.spendingLimit}
                    onChange={value => setAddExpenseData({ ...addExpenseData, spendingLimit: value })} />

                {/* Recurring Expense Switch */}
                <SwitchField
                    label='Recurring Expense'
                    dataState={addExpenseData.recurring}
                    onChange={e => setAddExpenseData({
                        ...addExpenseData,
                        recurring: e.target.checked,
                        paymentFrequency: e.target.checked ? addExpenseData.paymentFrequency : null,
                        nextPayment: e.target.checked ? addExpenseData.nextPayment : null
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
                        label='Payment Frequency'
                        dataState={addExpenseData.paymentFrequency}
                        onChange={value => setAddExpenseData({ ...addExpenseData, paymentFrequency: value })}
                        options={frequencyOptions}
                        disabled={!addExpenseData.recurring} />

                    {/* Next Payment Field */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Next Payment"
                            value={addExpenseData.nextPayment ? dayjs(addExpenseData.nextPayment) : null}
                            onChange={(value) => setAddExpenseData({ ...addExpenseData, nextPayment: value })}
                            disabled={!addExpenseData.recurring} />
                    </LocalizationProvider>

                </Box>




            </Form>
        </>
    )
}

export default Expenses;