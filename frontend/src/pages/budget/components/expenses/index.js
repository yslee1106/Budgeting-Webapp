import React, { useState } from "react";
import { useBuckets } from 'services/budget/queryHooks';
import { useCreateExpense } from "services/budget/budgetMutations";
import { useAddTransaction } from 'services/account/accountMutations';
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
    const { mutateAsync: addExpense, loadingAddExpense } = useCreateExpense(currentPeriod);
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

    // Add Transactions
    const {mutateAsync: addTransaction, loadingAddTransaction} = useAddTransaction();
    const [openAddTransaction, setOpenAddTransaction] = useState(false);
    const [addTransactionData, setAddTransactionData] = useState({
        bucket: null,
        reference: '',
        date: '',
        description: '',
        amount: '',
    })

    //
    // FUNCTIONS
    //
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort expense by ${event.target.value} clicked`);
    };

    // Add Expenses
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

            handleCloseAddExpenseForm();
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

    // Add Transaction
    const handleAddTransactionSubmit = async (event) => {
        event.preventDefault();

        console.log('bucket: ', addTransactionData.bucket)

        if (!addTransactionData.bucket ||
            !addTransactionData.date ||
            !addTransactionData.amount) {

            alert('Please fill in the required fields');
            return;
        }

        try {
            await addTransaction(addTransactionData);
            alert('Transaction added');
            handleCloseAddTransactionForm();
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }
    const clearAddTransactionVariables = () => {
        setAddTransactionData({
            bucket: null,
            reference: '',
            date: '',
            description: '',
            amount: '',
        })
    }
    const handleOpenAddTransactionForm = (bucket) => {
        clearAddTransactionVariables();
        setAddTransactionData({ ...addTransactionData, bucket: bucket })
        setOpenAddTransaction(true);
    }
    const handleCloseAddTransactionForm = () => {
        clearAddTransactionVariables();
        setOpenAddTransaction(false);
    }

    // Yet to implement
    const handleInfo = (expense) => {
        console.log('open info for expense', expense);
    }

    const handleEdit = (expense) => {
        console.log('open edit for expense', expense);
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
                onFunds={handleOpenAddTransactionForm}
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

            {/* Add Transaction */}
            <Form
                title='Add Transaction'
                formState={openAddTransaction}
                handleCloseForm={handleCloseAddTransactionForm}
                handleSubmit={handleAddTransactionSubmit}>

                {/* Expense */}
                <SelectField
                    label='Expense'
                    dataState={addTransactionData.bucket}
                    onChange={(value) => {
                        clearAddTransactionVariables();
                        setAddTransactionData({ ...addTransactionData, bucket: value })
                    }}
                    options={bucketsData.map(bucket => ({
                        value: bucket,
                        label: bucket.name,
                    }))}
                />

                {/* Reference */}
                <TextField
                    label='Reference'
                    fullWidth
                    variant='outlined'
                    value={addTransactionData.reference}
                    onChange={(e) => setAddTransactionData({ ...addTransactionData, reference: e.target.value })}
                />

                {/* Date */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Date"
                        value={addTransactionData.date ? dayjs(addTransactionData.date) : null}
                        onChange={(value) => setAddTransactionData({ ...addTransactionData, date: value })}
                    />
                </LocalizationProvider>

                {/* Description */}
                <TextField
                    label='Description'
                    fullWidth
                    multiline
                    rows={3}
                    maxRows={3}
                    variant="outlined"
                    value={addTransactionData.description}
                    onChange={(e) => setAddTransactionData({ ...addTransactionData, description: e.target.value })}
                />

                {/* Amount */}
                <NumberField
                    label='Amount'
                    startAdornment='attach_money'
                    dataState={addTransactionData.amount}
                    onChange={value => setAddTransactionData({ ...addTransactionData, amount: value })}
                />

            </Form>
        </>
    )
}

export default Expenses;