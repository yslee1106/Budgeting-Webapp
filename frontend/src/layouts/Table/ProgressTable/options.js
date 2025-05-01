import React, { useState } from 'react'

import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material"

import {
    MoreVert as MoreVertIcon,
    Info as InfoIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';

function Options({
    item,
    onInfo,
    onEdit,
    onFunds,
    onDelete,
}) {
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
                {/* Info */}
                <MenuItem onClick={() => {
                    onInfo(item);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <InfoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Info"
                        slotProps={{
                            primary: {
                                fontSize: '16px'
                            }
                        }}
                    />
                </MenuItem>

                {/* Edit */}
                <MenuItem onClick={() => {
                    onEdit(item);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Edit"
                        slotProps={{
                            primary: {
                                fontSize: '16px'
                            }
                        }}
                    />
                </MenuItem>

                {/* Funds */}
                <MenuItem onClick={() => {
                    onFunds(item);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Funds"
                        slotProps={{
                            primary: {
                                fontSize: '16px'
                            }
                        }}
                    />
                </MenuItem>

                {/* Delete */}
                <MenuItem onClick={() => {
                    onDelete(item);
                    handleClose();
                }}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Delete"
                        slotProps={{
                            primary: {
                                fontSize: '16px'
                            }
                        }}
                    />
                </MenuItem>

            </Menu >
        </>
    )
}

export default Options;