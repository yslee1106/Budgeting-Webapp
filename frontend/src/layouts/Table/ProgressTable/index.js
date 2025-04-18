import Box from '@mui/material/Box'

import TableHeader from "layouts/Table/ProgressTable/tableHeader";
import TableRow from "layouts/Table/ProgressTable/tableRow";

function ProgressTable({
    title,
    data,
    limit,
    onInfo,
    onEdit,
    onFunds,
    onDelete,
    handleSortChange,
    sortBy,
    handleAdd,
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
                limit={limit}
                onInfo={onInfo}
                onEdit={onEdit}
                onFunds={onFunds}
                onDelete={onDelete}
                fieldMappings={fieldMappings} />
        </Box>
    )
}

export default ProgressTable;