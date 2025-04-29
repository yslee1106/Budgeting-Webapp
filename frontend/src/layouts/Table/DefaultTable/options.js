import { useState } from "react";

import { MoreVert as MoreVertIcon } from "@mui/icons-material";

import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material"

function Options({ options, item }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>

            <IconButton
                edge="end"
                aria-label="more options"
                onClick={handleClick}
                sx={{
                    mr: '10px'
                }}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id='progress-table-options'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left', // Aligns the menu to the left of the anchor
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right', // Ensures the menu aligns with the anchor's upper edge
                }}
            >

                {options.map((option) => (

                    <MenuItem onClick={() => {
                        option.onClick(item);
                        handleClose();
                    }}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={option.label}
                            slotProps={{
                                primary: {
                                    fontSize: '16px'
                                }
                            }}
                        />
                    </MenuItem>

                ))}

            </Menu>

        </>
    );

}

export default Options;