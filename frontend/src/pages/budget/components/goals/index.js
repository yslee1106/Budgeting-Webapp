import React, { useState } from "react";
import { useGoals } from 'services/budget/queryHooks';

import ProgressTable from "layouts/Table/ProgressTable";
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

    // Yet to implement
    const handleInfo = (goal) => {
        console.log('open info for goal', goal);
    }
    const handleEdit = (goal) => {
        console.log('open edit for goal', goal);
    }
    const handleOnDelete = (goal) => {
        console.log('open delete for goal', goal);
    }

    return (
        <>
            <ProgressTable
                title='Goals'
                data={goalsData}
                onInfo={handleInfo}
                onEdit={handleEdit}
                onFunds={handleOpenAdjustGoalForm}
                onDelete={handleOnDelete}
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
            
        </>
    )
}

export default Goals;