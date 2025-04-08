import Box from "@mui/material/Box";

function Background() {
    return (
        <Box
            sx={{
                backgroundColor: (theme) => theme.palette.grey[300],
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '55vh', // Goes from top to center of viewport
                clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)'
            }}
        />
    )
}

export default Background;