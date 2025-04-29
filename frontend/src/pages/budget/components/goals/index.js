import React, { useState } from "react";
import { useGoals } from 'services/budget/queryHooks';
import { useDeleteGoal } from "services/budget/budgetMutations";

import ProgressTable from "layouts/Table/ProgressTable";
import Confirmation from 'layouts/Dialogs/Confirmation';
import GoalsForm from 'pages/budget/components/goals/goalsForm';
import AdjustGoals from "pages/budget/components/goals/adjustGoals";

function Goals({ currentSession }) {
    //
    // Variable States
    //

    const { data: goalsData = [] } = useGoals(currentSession);
    const [sortBy, setSortBy] = useState("");
    const [selectedGoal, setSelectedGoal] = useState(null);

    const [openAddGoals, setOpenAddGoals] = useState(false);

    const [openEditGoals, setOpenEditGoals] = useState(false);

    const [openAdjustGoals, setOpenAdjustGoals] = useState(false);

    const [openDeleteGoal, setOpenDeleteGoal] = useState(false);

    //
    // Helper Functions
    //

    const { mutateAsync: deleteGoal, loadingDeleteGoal } = useDeleteGoal();

    //
    // Event Handlers
    //

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort goal by ${event.target.value} clicked`);
    };


    const handleOpenAddGoalForm = () => {
        setOpenAddGoals(true);
    }


    const handleOpenAdjustGoalForm = (goal) => {
        setSelectedGoal(goal);
        setOpenAdjustGoals(true);
    }


    const handleOpenEditGoalForm = (goal) =>{
        setSelectedGoal(goal);
        setOpenEditGoals(true);
    }


    const handleOpenDeleteGoal = (goal) => {
        setSelectedGoal(goal);
        setOpenDeleteGoal(true);
    }
    const handleDeleteGoal = async () => {
        try {
            await deleteGoal(selectedGoal);
            alert('Goal Deleted');

            setSelectedGoal(null);
            setOpenDeleteGoal(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.message);
        }
    }

    // Yet to implement
    const handleInfo = (goal) => {
        console.log('open info for goal', goal);
    }

    return (
        <>
            <ProgressTable
                title='Goals'
                data={goalsData}
                onInfo={handleInfo}
                onEdit={handleOpenEditGoalForm}
                onFunds={handleOpenAdjustGoalForm}
                onDelete={handleOpenDeleteGoal}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                handleAdd={handleOpenAddGoalForm}
                fieldMappings={{
                    due: 'target_date',
                    targetAmount: 'target_amount',
                    currentAmount: 'current_amount',
                    name: 'name',
                    percentage: 'percentage',
                    id: 'id',
                }}
            />

            {/* Add Goals Form */}
            <GoalsForm
                isOpen={openAddGoals}
                setIsOpen={setOpenAddGoals}
            />

            {/* Edit Goals Form */}
            <GoalsForm 
                isOpen={openEditGoals}
                setIsOpen={setOpenEditGoals}
                selectedGoal={selectedGoal}
            />

            {/* Adjust Goals Form */}
            <AdjustGoals
                isOpen={openAdjustGoals}
                setIsOpen={setOpenAdjustGoals}
                goalsData={goalsData}
                selectedGoal={selectedGoal}
            />

            {/* Delete Goals Confirmation */}
            <Confirmation
                isOpen={openDeleteGoal}
                setIsOpen={setOpenDeleteGoal}
                handleClick={handleDeleteGoal}
                title={'Delete Goal'}
                content={`Are you sure want to delete ${selectedGoal?.name}?`}
                deletion
            />

        </>
    )
}

export default Goals;