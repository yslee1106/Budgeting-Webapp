import MDBox from "components/MDBox";

function Background() {
    return (
        <MDBox
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '55vh', // Goes from top to center of viewport
                backgroundColor: '#CCCCCC', // Or use theme color: theme.palette.grey[300]
                clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)'
            }}
        />
    )
}

export default Background;