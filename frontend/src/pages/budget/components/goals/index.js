import React, { useState } from "react";

import ProgressTable from "layouts/Table/ProgressTable";


function Goals({ data }) {
    const [sortBy, setSortBy] = useState("");

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        console.log(`sort goal by ${event.target.vale} clicked`);
    };

    const handleMoreOptionsClick = (event, goalId) => {
        event.stopPropagation();
        console.log(`More options for goal ${goalId} clicked`);
    };


    return (
        <ProgressTable
            title='Goals'
            data={data}
            handleSortChange={handleSortChange}
            sortBy={sortBy}
            handleMoreOptionsClick={handleMoreOptionsClick}
        />
    )
}

export default Goals;