import { useState, useEffect } from 'react';
import { useCategories } from 'context/helpers/budgetCategories';
import { useCreateIncome, usePatchIncome } from 'services/budget/budgetMutations';

import { TextField } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";
import SelectField from "layouts/Form/components/selectField";

function IncomeForm({ isOpen, setIsOpen, selectedIncome = null }) {

    //
    // State Variables
    //

    const title = selectedIncome ? 'Edit Income' : 'Add Income';

    const { categories } = useCategories();
    const incomeOptions = Object.keys(categories.income).map((key) => ({
        value: key,
        label: categories.income[key],
    }));
    const frequencyOptions = Object.keys(categories.frequency).map((key) => ({
        value: key,
        label: categories.frequency[key],
    }));

    const [editedData, setEditedData] = useState({
        name: false,
        category: false,
        payFrequency: false,
        nextPayday: false,
        amount: false,
    });

    const [incomeData, setIncomeData] = useState({
        id: null,
        name: '',
        category: '',
        payFrequency: '',
        nextPayday: null,
        amount: '',
    });

    //
    // Helper Functions
    //

    useEffect(() => {
        if (isOpen && selectedIncome) {
            setIncomeData({
                id: selectedIncome ? selectedIncome.id : null,
                name: selectedIncome ? selectedIncome.name : '',
                category: selectedIncome ? selectedIncome.category : '',
                payFrequency: selectedIncome ? selectedIncome.pay_frequency : '',
                nextPayday: selectedIncome ? selectedIncome.next_payday : null,
                amount: selectedIncome ? selectedIncome.amount : '',
            })
        }
    }, [selectedIncome, isOpen])

    useEffect(() => {
        if (selectedIncome !== null) {
            setEditedData({
                name: incomeData.name !== selectedIncome.name,
                category: incomeData.category !== selectedIncome.category,
                payFrequency: incomeData.payFrequency !== selectedIncome.pay_frequency,
                nextPayday: incomeData.nextPayday !== selectedIncome.next_payday,
                amount: incomeData.amount !== selectedIncome.amount,
            });
        }

    }, [incomeData, selectedIncome])

    const { mutateAsync: addIncome, loadingAddIncome } = useCreateIncome();
    const { mutateAsync: editIncome, loadingEditIncome } = usePatchIncome();

    //
    // Event Handlers
    //

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!incomeData.name ||
            !incomeData.category ||
            !incomeData.payFrequency ||
            !incomeData.nextPayday ||
            !incomeData.amount) {

            alert('Please fill in the required fields');
            return;
        }

        incomeData.nextPayday = new dayjs(incomeData.nextPayday).format('YYYY-MM-DD');

        try {
            if (selectedIncome) {
                const changedData = {};

                Object.keys(editedData).forEach(key => {
                    if (editedData[key]) { // If this field was edited
                        changedData[key] = incomeData[key];
                    }
                });

                if (Object.keys(changedData).length === 0) {
                    alert('No changes were made');
                    return;
                }

                changedData['id'] = incomeData.id;

                await editIncome(changedData);
                alert('Income updated');
            }
            else {
                await addIncome(incomeData);
                alert('Income added');
            }

            handleCloseIncomeForm();
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }

    const handleCloseIncomeForm = () => {
        setIncomeData({
            id: selectedIncome ? selectedIncome.id : null,
            name: selectedIncome ? selectedIncome.name : '',
            category: selectedIncome ? selectedIncome.category : '',
            payFrequency: selectedIncome ? selectedIncome.pay_frequency : '',
            nextPayday: selectedIncome ? selectedIncome.next_payday : null,
            amount: selectedIncome ? selectedIncome.amount : '',
        })

        setIsOpen(false);
    }

    //
    // UI Design
    //

    return (
        <Form
            title={title}
            formState={isOpen}
            handleCloseForm={handleCloseIncomeForm}
            handleSubmit={handleFormSubmit}>

            {/* Name Field */}
            <TextField
                label="Name"
                fullWidth
                variant="outlined"
                value={incomeData.name}
                onChange={(e) => setIncomeData({ ...incomeData, name: e.target.value })}
            />

            {/* Category Field */}
            <SelectField
                label='Category'
                dataState={incomeData.category}
                onChange={value => setIncomeData({ ...incomeData, category: value })}
                options={incomeOptions}
            />

            {/* Pay Frequency Field */}
            <SelectField
                label='Pay Frequency'
                dataState={incomeData.payFrequency}
                onChange={value => setIncomeData({ ...incomeData, payFrequency: value })}
                options={frequencyOptions}
            />

            {/* Next Payday Field */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Next Payday"
                    value={incomeData.nextPayday ? dayjs(incomeData.nextPayday) : null}
                    onChange={(value) => setIncomeData({ ...incomeData, nextPayday: value })}
                />
            </LocalizationProvider>

            {/* Amount Field */}
            <NumberField
                label='Amount'
                startAdornment='attach_money'
                dataState={incomeData.amount}
                onChange={value => setIncomeData({ ...incomeData, amount: value })} />

        </Form>
    )

}

export default IncomeForm;