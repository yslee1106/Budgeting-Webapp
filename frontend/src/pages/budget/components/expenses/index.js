import React, { useState } from "react";

import { useBuckets } from 'services/budget/queryHooks';

import ProgressTable from "layouts/Table/ProgressTable";

function Expenses({ selectedSession }) {
    const { data: bucketsData = [] } = useBuckets(selectedSession?.id);
    const [sortBy, setSortBy] = useState("");

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort expense by ${event.target.value} clicked`);
    };

    const handleMoreOptionsClick = (event, goalId) => {
        event.stopPropagation();
        console.log(`More options for expense ${goalId} clicked`);
    };

    return (
        <ProgressTable
            title='Expenses'
            data={bucketsData}
            handleSortChange={handleSortChange}
            sortBy={sortBy}
            handleMoreOptionsClick={handleMoreOptionsClick}
        />
    )
}

export default Expenses;