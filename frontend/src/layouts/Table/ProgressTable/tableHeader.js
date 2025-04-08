import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from '@mui/material/OutlinedInput';
import Icon from '@mui/material/Icon';

function TableHeader({ title, handleSortChange, sortBy }) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: '1.5rem',
                px: '1rem',
            }}
        >
            <Typography variant="h3" fontWeight="600">
                {title}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                }}>
                <FormControl>
                    <Select
                        value={sortBy}
                        onChange={handleSortChange}
                        input={<OutlinedInput />}
                        displayEmpty
                        sx={{
                            minWidth: '10rem',
                            height: '2rem',
                            pl: '5px',
                            mr: '2rem',
                            border: '1px solid',
                            borderRadius: "10px",
                            fontWeight: '500',
                        }}
                        MenuProps={MenuProps}
                        renderValue={(selected) => {
                            if (!selected) {
                                return <em>Sort by</em>;
                            }
                            // Capitalize first letter of the selected value
                            return selected.charAt(0).toUpperCase() + selected.slice(1);
                        }}
                    >
                        <MenuItem disabled value="">
                            <em>Sort by</em>
                        </MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="progress">Progress</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value='targetDate'>Target Date</MenuItem>
                    </Select>
                </FormControl>

                <IconButton sx={{
                    borderRadius: '2px', // Square corners (adjust for slight rounding if needed)
                    width: '26px',      // Fixed width
                    height: '26px',
                    backgroundColor: (theme) => theme.palette.dark.main,
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.dark.hover,
                    }
                }}>
                    <Icon sx={{
                        fontSize: '18px',
                        color: (theme) => theme.palette.white.main
                    }}>add</Icon>
                </IconButton>
            </Box>
        </Box >
    )
}

export default TableHeader;