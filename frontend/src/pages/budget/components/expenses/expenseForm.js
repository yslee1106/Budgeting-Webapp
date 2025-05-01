import React, { useState, useEffect } from "react";
import { useCreateExpense, usePatchExpense } from "services/budget/budgetMutations";
import { useCategories } from 'context/helpers/budgetCategories';

import { TextField, Box } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Loading from "layouts/Loading";
import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";
import SwitchField from "layouts/Form/components/switchField";

function ExpenseForm({ isOpen, setIsOpen, selectedExpense = null }) {
    //
    // Variable States
    //

    const title = selectedExpense ? 'Edit Expenses' : 'Add Expenses';

    const { categories } = useCategories();
    const expenseOptions = Object.entries(categories.expenses).map(([value, label]) => ({
        value,
        label,
    }));
    const frequencyOptions = Object.entries(categories.frequency).map(([value, label]) => ({
        value,
        label,
    }));

    const [editedData, setEditedData] = useState({
        name: false,
        category: false,
        spendingLimit: false,
        recurring: false,
        paymentFrequency: false,
        nextPayment: false,
    });

    const [expenseData, setExpenseData] = useState({
        name: '',
        category: '',
        spendingLimit: '',
        recurring: false,
        paymentFrequency: '',
        nextPayment: null,
    });

    //
    // Helper Functions
    //

    useEffect(() => {
        if (isOpen && selectedExpense) {
            setExpenseData({
                id: selectedExpense ? selectedExpense.id : null,
                name: selectedExpense ? selectedExpense.name : '',
                category: selectedExpense ? selectedExpense.category : '',
                spendingLimit: selectedExpense ? selectedExpense.spending_limit : '',
                recurring: selectedExpense ? selectedExpense.next_payment !== null : false,
                paymentFrequency: selectedExpense.paymentFrequency ? selectedExpense.payment_frequency : '',
                nextPayment: selectedExpense ? selectedExpense.next_payment : null,
            })
        }
    }, [selectedExpense, isOpen])

    useEffect(() => {
        if (selectedExpense !== null) {
            setEditedData({
                name: selectedExpense.name !== expenseData.name,
                category: selectedExpense.category !== expenseData.category,
                spendingLimit: selectedExpense.spending_limit !== expenseData.spendingLimit,
                recurring: selectedExpense.recurring !== expenseData.recurring,
                paymentFrequency: selectedExpense.payment_frequency !== expenseData.paymentFrequency,
                nextPayment: selectedExpense.next_payment !== expenseData.nextPayment,
            })
        }
    }, [selectedExpense, expenseData])

    const { mutateAsync: addExpense, loadingAddExpense } = useCreateExpense();
    const { mutateAsync: editExpense, loadingEditExpense } = usePatchExpense();

    //
    // Event Handlers
    //

    const handleAddExpensesSubmit = async (event) => {
        event.preventDefault();

        if (!expenseData.name ||
            !expenseData.category ||
            !expenseData.spendingLimit ||
            (expenseData.recurring && !expenseData.paymentFrequency && !expenseData.nextPayment)) {

            alert('Please fill in the required fields');
            return;
        }

        try {
            if (selectedExpense) {
                const changedData = {};

                Object.keys(editedData).forEach(key => {
                    if (editedData[key]) { // If this field was edited
                        changedData[key] = expenseData[key];
                    }
                });

                if (Object.keys(changedData).length === 0) {
                    alert('No changes were made');
                    return;
                }

                changedData['id'] = expenseData.id;

                await editExpense(changedData);
                alert('Expense updated');
            }
            else {
                await addExpense(expenseData);
                alert('Expense added');
            }

            handleCloseAddExpenseForm();
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }

    const handleCloseAddExpenseForm = () => {
        setExpenseData({
            name: '',
            category: '',
            targetAmount: '',
            recurring: false,
            paymentFrequency: '',
            nextPayment: null,
        });

        setIsOpen(false);
    }

    //
    // UI Design
    //

    if (loadingAddExpense || loadingEditExpense) {
            return (
                <Loading />
            );
        }

    return (
        <Form
            title={title}
            formState={isOpen}
            handleCloseForm={handleCloseAddExpenseForm}
            handleSubmit={handleAddExpensesSubmit}>

            {/* Name Field */}
            <TextField
                label="Name"
                fullWidth
                variant="outlined"
                value={expenseData.name}
                onChange={(e) => setExpenseData({ ...expenseData, name: e.target.value })}
            />

            {/* Category Field */}
            <SelectField
                label='Category'
                dataState={expenseData.category}
                onChange={value => setExpenseData({ ...expenseData, category: value })}
                options={expenseOptions}
            />

            {/* Target Amount Field */}
            <NumberField
                label='Spending Limit'
                startAdornment='attach_money'
                dataState={expenseData.spendingLimit}
                onChange={value => setExpenseData({ ...expenseData, spendingLimit: value })} />

            {/* Recurring Expense Switch */}
            <SwitchField
                label='Recurring Expense'
                dataState={expenseData.recurring}
                onChange={e => setExpenseData({
                    ...expenseData,
                    recurring: e.target.checked,
                    paymentFrequency: e.target.checked ? expenseData.paymentFrequency : null,
                    nextPayment: e.target.checked ? expenseData.nextPayment : null
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
                    dataState={expenseData.paymentFrequency}
                    onChange={value => setExpenseData({ ...expenseData, paymentFrequency: value })}
                    options={frequencyOptions}
                    disabled={!expenseData.recurring} />

                {/* Next Payment Field */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Next Payment"
                        value={expenseData.nextPayment ? dayjs(expenseData.nextPayment) : null}
                        onChange={(value) => setExpenseData({ ...expenseData, nextPayment: value })}
                        disabled={!expenseData.recurring} />
                </LocalizationProvider>

            </Box>




        </Form>
    )
}

export default ExpenseForm;