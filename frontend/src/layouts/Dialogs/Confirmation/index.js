import { useTheme } from '@emotion/react';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Confirmation({ isOpen, setIsOpen, handleClick, title, content }) {
    const theme = useTheme();

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant='outlined'
                    onClick={handleClose}
                    sx={{
                        px: '1rem',
                        py: '0.4rem'
                    }}>
                    
                    <Typography
                        textTransform='none'
                        color={theme.palette.text_light.main}
                        fontSize='16px'
                    >
                        Cancel
                    </Typography>

                </Button>
                <Button
                    variant='contained'
                    onClick={handleClick}
                    autoFocus
                    sx={{
                        bgcolor: theme.palette.negative.main,
                        px: '1rem',
                        py: '0.4rem'
                    }}>

                    <Typography
                        textTransform='none'
                        color={theme.palette.text_dark.main}
                        fontSize='16px'
                    >
                        Delete
                    </Typography>

                </Button>
            </DialogActions>
        </Dialog>
    );
}
