
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from '@mui/material/Icon'
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function TableRow({ data, handleMoreOptionsClick }) {


    return (
        <List sx={{ width: "100%" }}>
            {data.map((item) => (
                <ListItem
                    key={item.id}
                    sx={{
                        height: 80,
                        cursor: "pointer",
                        position: "relative",
                        pb: 3,
                    }}
                >
                    <ListItemIcon sx={{
                        minWidth: 56,
                        ml: '10px'
                    }}>
                        <Icon sx={{
                            fontSize: '32px'
                        }}>
                            error
                        </Icon>
                    </ListItemIcon>

                    <ListItemText
                        primary={
                            <Typography variant="h6" fontWeight="600">
                                {item.name}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body2" fontSize="12px">
                                $ {' '} {item.current_amount.toLocaleString()} / 
                                $ {' '} {item.target_amount.toLocaleString()}
                            </Typography>
                        }
                    />

                    <IconButton
                        edge="end"
                        aria-label="more options"
                        onClick={(e) => handleMoreOptionsClick(e, item.id)}
                        sx={{
                            mr: '10px'
                        }}
                    >
                        <Icon>more_vert</Icon>
                    </IconButton>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            width: "calc(100% - 28px)",
                        }}
                    >
                        <LinearProgress
                            variant="determinate"
                            value={Math.min(100, (item.current_amount / item.target_amount) * 100)}
                            sx={{
                                height: 5,
                                borderRadius: "20px",
                                backgroundColor: "#d9d9d9",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#2e7d32",
                                    borderRadius: "20px",
                                },
                            }}
                        />
                    </Box>
                </ListItem>
            ))}
        </List>
    )

}

export default TableRow;