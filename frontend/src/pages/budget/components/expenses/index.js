import React, { useState } from "react";

import { useBuckets } from 'services/budget/queryHooks';
import { useDeleteExpense } from "services/budget/budgetMutations";

import ProgressTable from "layouts/Table/ProgressTable";
import BucketInfo from 'pages/budget/components/expenses/info'
import AddExpenses from "pages/budget/components/expenses/addExpenses";
import AddTransaction from "pages/budget/components/expenses/addTransaction";
import Confirmation from "layouts/Dialogs/Confirmation";

function Expenses({ selectedPeriod }) {

    //
    // Variable States
    //

    const { data: bucketsData = [] } = useBuckets(selectedPeriod);
    const [sortBy, setSortBy] = useState("");
    const [selectedBucket, setSelectedBucket] = useState(null);

    const [openInfo, setOpenInfo] = useState(false);

    const [openAddExpense, setOpenAddExpense] = useState(false);

    const [openAddTransaction, setOpenAddTransaction] = useState(false);

    const [openDeleteExpense, setOpenDeleteExpense] = useState(false);

    //
    // Helper Functions
    //

    const { mutateAsync: deleteExpense, loadDeleteExpense } = useDeleteExpense();

    const handleDeleteExpense = async () => {
        try {
            await deleteExpense(selectedBucket);
            alert('Expense Deleted');

            setSelectedBucket(null);
            setOpenDeleteExpense(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.message);
        }
    }

    //
    // Event Handlers
    //

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort expense by ${event.target.value} clicked`);
    };

    const handleOpenInfo = (bucket) => {
        setSelectedBucket(bucket)
        setOpenInfo(true);
    }

    const handleOpenAddExpenseForm = () => {
        setOpenAddExpense(true);
    }

    const handleOpenAddTransactionForm = (bucket) => {
        setSelectedBucket(bucket);
        setOpenAddTransaction(true);
    }

    const handleOpenDeleteExpense = (bucket) => {
        setSelectedBucket(bucket);
        setOpenDeleteExpense(true);
    }
    

    // Yet to implement
    const handleEdit = (expense) => {
        console.log('open edit for expense', expense);
    }

    return (
        <>
            <ProgressTable
                title='Expenses'
                limit
                data={bucketsData}
                onInfo={handleOpenInfo}
                onEdit={handleEdit}
                onFunds={handleOpenAddTransactionForm}
                onDelete={handleOpenDeleteExpense}
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

            <AddExpenses
                isOpen={openAddExpense}
                setIsOpen={setOpenAddExpense}
            />

            <BucketInfo
                isOpen={openInfo}
                setIsOpen={setOpenInfo}
                selectedBucket={selectedBucket}
            />

            <AddTransaction
                isOpen={openAddTransaction}
                setIsOpen={setOpenAddTransaction}
                bucketsData={bucketsData}
                selectedBucket={selectedBucket}
            />

            <Confirmation
                isOpen={openDeleteExpense}
                setIsOpen={setOpenDeleteExpense}
                handleClick={handleDeleteExpense}
                title={'Delete Expense'}
                content={`Are you sure you want to delete ${selectedBucket?.name}?`}
            />

        </>
    )
}

export default Expenses;