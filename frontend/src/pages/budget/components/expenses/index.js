import React, { useState } from "react";
import { useBuckets } from 'services/budget/queryHooks';
import { useAddTransaction } from 'services/account/accountMutations';
import { useCategories } from 'context/helpers/budgetCategories';

import ProgressTable from "layouts/Table/ProgressTable";
import AddExpenses from "pages/budget/components/expenses/addExpenses";
import AddTransaction from "pages/budget/components/expenses/addTransaction";

function Expenses({ selectedPeriod, currentPeriod }) {

    //
    // Variable States
    //
    
    const { data: bucketsData = [] } = useBuckets(selectedPeriod);
    const [selectedBucket, setSelectedBucket] = useState(null);
    const [sortBy, setSortBy] = useState("");

    const [openAddExpense, setOpenAddExpense] = useState(false);

    const [openAddTransaction, setOpenAddTransaction] = useState(false);

    //
    // Event Handlers
    //

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort expense by ${event.target.value} clicked`);
    };

    const handleOpenAddExpenseForm = () => {
        setOpenAddExpense(true);
    }

    const handleOpenAddTransactionForm = (bucket) => {
        setSelectedBucket(bucket);
        setOpenAddTransaction(true);
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

            <AddExpenses
                isOpen={openAddExpense}
                setIsOpen={setOpenAddExpense}
                currentPeriod={currentPeriod}
            />

            <AddTransaction
                isOpen={openAddTransaction}
                setIsOpen={setOpenAddTransaction}
                bucketsData={bucketsData}
                selectedBucket={selectedBucket}
            />

        </>
    )
}

export default Expenses;