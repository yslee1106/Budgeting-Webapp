import React, { useState, useEffect } from "react";
import { useAddTransaction } from 'services/account/accountMutations';

import { TextField } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Loading from "layouts/Loading";
import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";

function AddTransaction({ isOpen, setIsOpen, bucketsData, selectedBucket }) {
    //
    // Variable States
    //

    const [addTransactionData, setAddTransactionData] = useState({
        bucket: selectedBucket ? selectedBucket : '',
        title: '',
        date: '',
        location: '',
        amount: '',
    })

    //
    // Helper Functions
    //

    useEffect(() => {
        if (isOpen) {
            setAddTransactionData({
                bucket: selectedBucket || '',
                title: '',
                date: '',
                location: '',
                amount: '',
            });
        }
    }, [selectedBucket, isOpen]);

    const { mutateAsync: addTransaction, loadingAddTransaction } = useAddTransaction();

    const clearAddTransactionVariables = () => {
        setAddTransactionData({
            bucket: selectedBucket || '',
            title: '',
            date: '',
            location: '',
            amount: '',
        })
    }

    //
    // Event Handlers
    //

    const handleAddTransactionSubmit = async (event) => {
        event.preventDefault();

        console.log('bucket: ', addTransactionData.bucket)

        if (!addTransactionData.title ||
            !addTransactionData.bucket ||
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

    if (loadingAddTransaction) {
            return (
                <Loading />
            );
        }

    return (
        <Form
            title='Add Transaction'
            formState={isOpen}
            handleCloseForm={handleCloseAddTransactionForm}
            handleSubmit={handleAddTransactionSubmit}>

            {/* Title */}
            <TextField
                label='Title'
                fullWidth
                variant='outlined'
                value={addTransactionData.title}
                onChange={(e) => setAddTransactionData({ ...addTransactionData, title: e.target.value })}
            />

            {/* Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Date"
                    value={addTransactionData.date ? dayjs(addTransactionData.date) : null}
                    onChange={(value) => setAddTransactionData({ ...addTransactionData, date: value })}
                />
            </LocalizationProvider>

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

            {/* Location */}
            <TextField
                label='Location'
                fullWidth
                multiline
                rows={2}
                maxRows={3}
                variant="outlined"
                value={addTransactionData.location}
                onChange={(e) => setAddTransactionData({ ...addTransactionData, location: e.target.value })}
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