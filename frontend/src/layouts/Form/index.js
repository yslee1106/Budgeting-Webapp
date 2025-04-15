import {
    Modal,
    Box,
    Typography,
    Stack,
    Fade,
    Button,
} from '@mui/material';

function Form({ children, title, formState, handleCloseForm, handleSubmit }) {

    return (
        <Modal
            open={formState}
            onClose={handleCloseForm}>

            <Fade in={formState}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        py: '2rem',
                        px: '3rem',
                        minWidth: '35vw',
                        backgroundColor: (theme) => theme.palette.white.main,
                        borderRadius: '10px',
                    }}>

                    {/* Title */}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        fontFamily="Inter-Bold, Helvetica"
                        sx={{
                            mb: '2rem'
                        }}
                    >
                        {title}
                    </Typography>

                    {/* Fields Box */}
                    <Stack spacing='1.25rem' sx={{ mb: '3rem' }}>

                        {children}

                    </Stack>

                    {/* Control Button Box */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >

                        {/* Confirm Button */}
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                px: '2rem',
                                py: '0.7rem',
                                borderRadius: "10px",
                                backgroundColor: "#212121",
                                fontWeight: 600,
                                fontSize: "12px",
                            }}
                        >
                            CONFIRM
                        </Button>

                        {/* Cancel Button */}
                        <Button
                            variant="outlined"
                            onClick={handleCloseForm}
                            sx={{
                                px: '2rem',
                                py: '0.7rem',
                                borderRadius: "10px",
                                borderColor: "#212121",
                                borderWidth: 1.5,
                                color: "#212121",
                                fontWeight: 600,
                                fontSize: "12px",
                            }}
                        >
                            CANCEL
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default Form;