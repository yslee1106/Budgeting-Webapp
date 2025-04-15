import Box from '@mui/material/Box'

import TableHeader from "layouts/Table/ProgressTable/tableHeader";
import TableRow from "layouts/Table/ProgressTable/tableRow";

function ProgressTable({
    title,
    data,
    handleMoreOptionsClick,
    handleSortChange,
    handleAdd,
    sortBy,
    fieldMappings,
}) {
    return (
        <Box
            sx={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
            }}>
            <TableHeader
                title={title}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                handleAdd={handleAdd} />
            <TableRow
                data={data}
                handleMoreOptionsClick={handleMoreOptionsClick}
                fieldMappings={fieldMappings} />
        </Box>
    )
}

export default ProgressTable;