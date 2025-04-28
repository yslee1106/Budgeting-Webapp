import React, { useState } from "react";
import { useGoals } from 'services/budget/queryHooks';
import { useDeleteGoal } from "services/budget/budgetMutations";

import ProgressTable from "layouts/Table/ProgressTable";
import Confirmation from 'layouts/Dialogs/Confirmation';
import AddGoals from 'pages/budget/components/goals/addGoals';
import AdjustGoals from "pages/budget/components/goals/adjustGoals";

function Goals({ currentSession }) {
    //
    // Variable States
    //

    const { data: goalsData = [] } = useGoals(currentSession);
    const [sortBy, setSortBy] = useState("");
    const [selectedGoal, setSelectedGoal] = useState(null);

    const [openAddGoals, setOpenAddGoals] = useState(false);

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
    const handleEdit = (goal) => {
        console.log('open edit for goal', goal);
    }

    return (
        <>
            <ProgressTable
                title='Goals'
                data={goalsData}
                onInfo={handleInfo}
                onEdit={handleEdit}
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

            <AddGoals
                isOpen={openAddGoals}
                setIsOpen={setOpenAddGoals}
            />

            <AdjustGoals
                isOpen={openAdjustGoals}
                setIsOpen={setOpenAdjustGoals}
                goalsData={goalsData}
                selectedGoal={selectedGoal}
            />

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