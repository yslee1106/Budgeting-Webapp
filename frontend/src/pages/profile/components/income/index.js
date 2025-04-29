import { useState } from "react";
import { useTheme } from "@emotion/react";

import {
    Info as InfoIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import { useIncome } from "services/budget/queryHooks";
import { useReceiveIncome, useRetractIncome, useDeleteIncome } from "services/budget/budgetMutations";

import DefaultTable from "layouts/Table/DefaultTable";
import Confirmation from "layouts/Dialogs/Confirmation";

import IncomeForm from "pages/profile/components/income/incomeForm";

function Income() {

    //
    // Variable States
    //

    const { data: incomeData = [] } = useIncome();

    const [selectedIncome, setSelectedIncome] = useState(null);

    const [openIncomeInfo, setOpenIncomeInfo] = useState(false);

    const [openAddIncome, setOpenAddIncome] = useState(false);

    const [openEditIncome, setOpenEditIncome] = useState(false);

    const [openReceiveIncome, setOpenReceiveIncome] = useState(false);

    const [openRetractIncome, setOpenRetractIncome] = useState(false);

    const [openDeleteIncome, setOpenDeleteIncome] = useState(false);

    //
    // Helper Functions
    //

    const theme = useTheme();

    const options = [
        {
            icon: <InfoIcon />,
            label: 'Info',
            onClick: () => { },
        },
        {
            icon: <EditIcon />,
            label: 'Edit',
            onClick: (income) => { handleOpenEditIncomeForm(income) },
        },
        {
            icon: <AddIcon />,
            label: 'Receive',
            onClick: (income) => { handleOpenReceiveIncome(income) },
        },
        {
            icon: <RemoveIcon />,
            label: 'Retract',
            onClick: (income) => { handleOpenRetractIncome(income) },
        },
        {
            icon: <DeleteIcon />,
            label: 'Delete',
            onClick: (income) => { handleOpenDeleteIncome(income) },
        }
    ];

    const { mutateAsync: receiveIncome, loadingReceiveIncome } = useReceiveIncome();
    const { mutateAsync: retractIncome, loadingRetractIncome } = useRetractIncome();
    const { mutateAsync: deleteIncome, loadingDeleteIncome } = useDeleteIncome();


    //
    // Event Handlers
    //

    const handleOpenAddIncomeForm = () => {
        setOpenAddIncome(true);
    };

    const handleOpenIncomeInfo = (income) => {
        setSelectedIncome(income)
        setOpenIncomeInfo(true);
    };

    const handleOpenEditIncomeForm = (income) => {
        setSelectedIncome(income)
        setOpenEditIncome(true);
    };


    const handleOpenReceiveIncome = (income) => {
        setSelectedIncome(income)
        setOpenReceiveIncome(true);
    };
    const handleReceiveIncome = async () => {
        try {
            await receiveIncome(selectedIncome);
            alert('Income Received');

            setSelectedIncome(null);
            setOpenReceiveIncome(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.message);
        }
    }


    const handleOpenRetractIncome = (income) => {
        setSelectedIncome(income)
        setOpenRetractIncome(true);
    };
    const handleRetractIncome = async () => {
        try {
            await retractIncome(selectedIncome);
            alert('Income Retracted');

            setSelectedIncome(null);
            setOpenRetractIncome(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.message);
        }
    }


    const handleOpenDeleteIncome = (income) => {
        setSelectedIncome(income)
        setOpenDeleteIncome(true);
    };
    const handleDeleteIncome = async () => {
        try {
            await deleteIncome(selectedIncome);
            alert('Income Deleted');

            setSelectedIncome(null);
            setOpenDeleteIncome(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.message);
        }
    }

    return (
        <>

            {/* Income Table */}
            <DefaultTable
                title='Income'
                data={incomeData}
                fieldMappings={{
                    title: 'name',
                    due: 'next_payday',
                    amount: 'amount',
                    id: 'id'
                }}
                options={options}
                handleAdd={handleOpenAddIncomeForm}
            />

            {/* Add Income Form */}
            <IncomeForm
                isOpen={openAddIncome}
                setIsOpen={setOpenAddIncome}
            />

            {/* Edit Income Form */}
            <IncomeForm 
                isOpen={openEditIncome}
                setIsOpen={setOpenEditIncome}
                selectedIncome={selectedIncome}
            />

            {/* Receive Income Confirmation */}
            <Confirmation
                isOpen={openReceiveIncome}
                setIsOpen={setOpenReceiveIncome}
                handleClick={handleReceiveIncome}
                title={selectedIncome?.name}
                content={'Have you received this income? Confirming will update your budget.'}
                confirm
            />

            {/* Retract Income Confirmation` */}
            <Confirmation
                isOpen={openRetractIncome}
                setIsOpen={setOpenRetractIncome}
                handleClick={handleRetractIncome}
                title={selectedIncome?.name}
                content={'Are you sure you want to retract this income? Confirming will deduct the latest instance of the income from your budget.'}
                confirm
            />

            {/* Delete Income Confirmation */}
            <Confirmation
                isOpen={openDeleteIncome}
                setIsOpen={setOpenDeleteIncome}
                handleClick={handleDeleteIncome}
                title={'Delete Income'}
                content={`Are you sure you want to delete ${selectedIncome?.name}?`}
                deletion
            />

        </>
    )
}

export default Income;