import React, { useState } from "react";

import ProgressTable from "layouts/Table/ProgressTable";

function Expenses({ data }) {
    const [sortBy, setSortBy] = useState("");

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort expense by ${event.target.vale} clicked`);
    };

    const handleMoreOptionsClick = (event, goalId) => {
        event.stopPropagation();
        console.log(`More options for expense ${goalId} clicked`);
    };

    return (
        <ProgressTable
                    title='Expenses'
                    data={data}
                    handleSortChange={handleSortChange}
                    sortBy={sortBy}
                    handleMoreOptionsClick={handleMoreOptionsClick}
                />
    )
}

export default Expenses;