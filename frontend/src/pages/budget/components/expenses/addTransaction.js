import React, { useState, useEffect } from "react";
import { useAddTransaction } from 'services/account/accountMutations';

import { TextField } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";

function AddTransaction({ isOpen, setIsOpen, bucketsData, selectedBucket }) {
    //
    // Variable States
    //

    const [addTransactionData, setAddTransactionData] = useState({
        bucket: selectedBucket ? selectedBucket : null,
        reference: '',
        date: '',
        description: '',
        amount: '',
    })

    //
    // Helper Functions
    //

    useEffect(() => {
        if (selectedBucket) {
            setAddTransactionData({
                ...addTransactionData,
                bucket: selectedBucket,
            });
        }
    }, [selectedBucket]);

    const { mutateAsync: addTransaction, loadingAddTransaction } = useAddTransaction();

    const clearAddTransactionVariables = () => {
        setAddTransactionData({
            bucket: null,
            reference: '',
            date: '',
            description: '',
            amount: '',
        })
    }

    //
    // Event Handlers
    //

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

    const handleCloseAddTransactionForm = () => {
        clearAddTransactionVariables();
        setIsOpen(false);
    }

    //
    // UI Design
    //

    return (
        <Form
            title='Add Transaction'
            formState={isOpen}
            handleCloseForm={handleCloseAddTransactionForm}
            handleSubmit={handleAddTransactionSubmit}>

            {/* Expense */}
            <SelectField
                label='Expense'
                dataState={selectedBucket}
                onChange={(value) => {
                    clearAddTransactionVariables();
                    setAddTransactionData({ ...addTransactionData, bucket: value })
                    selectedBucket = value;
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
    )
}

export default AddTransaction;