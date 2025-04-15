import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@emotion/react";

import { useSessions } from 'services/budget/queryHooks';

import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

function Session({ selected, setSelected, setCurrent }) {
    const theme = useTheme();
    
    //
    // VARIABLES
    //
    const { data: sessionsData = [], isLoading, error } = useSessions();
    const containerRef = useRef(null);
    const [capacity, setCapacity] = useState(0);
    const buttonWidth = 140;

    //
    // FUNCTIONS
    //
    useEffect(() => {
        if (sessionsData.length > 0) {
            const currentSession = sessionsData[sessionsData.length - 1];

            setCurrent(currentSession);
            setSelected(currentSession);
        }
    }, [sessionsData]);

    // scroll effect
    const scroll = (scrollOffset) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: scrollOffset,
                behavior: "smooth",
            });
        }
    };

    // blank selection buttons effect
    const calculateCapacity = (containerWidth, itemWidth) => {
        return Math.floor(containerWidth / itemWidth);
    };

    const fillList = (data, capacity) => {
        const filledList = [...data];

        while (filledList.length < capacity) {        // Add blank items if the data length is less than the capacity
            filledList.push({ id: `blank-${filledList.length}`, isBlank: true });
        }

        return filledList;
    };

    useEffect(() => {
        const updateCapacity = () => {
            const containerWidth = containerRef.current?.offsetWidth || 0;
            setCapacity(calculateCapacity(containerWidth, buttonWidth));
        };

        updateCapacity();
        const resizeObserver = new ResizeObserver(updateCapacity);
        if (containerRef.current) resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);
    
    const filledList = fillList(sessionsData, capacity);

    //
    // UI OBJECTS
    //
    const periodButton = filledList.map((item) => {
        let ret;

        const formatDate = (period, format) => {
            const [year, month, day] = period.split('-');
            const date = new Date(`${year}-${month}-${day}`);

            let formattedDate
            if (format === 'month') {
                formattedDate = date.toLocaleString('default', { month: 'long' });
            } else {
                formattedDate = date.toLocaleString('default', { year: 'numeric' });
            }

            return formattedDate;
        }

        if (item.isBlank) {
            ret = (
                <Box
                    key={item.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant='contained'
                        color={theme.palette.white.main}
                        sx={{
                            backgroundColor: selected === item ? theme.palette.primary.main : theme.palette.white.main,
                            border: '1px solid',
                            borderColor: theme.palette.black.main,
                            height: '80px',
                            width: buttonWidth,
                            px: 0,
                        }}>
                        <Stack width={buttonWidth}>

                        </Stack>
                    </Button>
                </Box>

            )
        } else {
            ret = (
                <Box
                    key={item.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <Button
                        key={item}
                        variant="contained"
                        onClick={() => setSelected(item)}
                        sx={{
                            backgroundColor: selected === item ? theme.palette.primary.main : theme.palette.white.main,
                            border: '1px solid',
                            borderColor: theme.palette.black.main,
                            height: '80px',
                            width: buttonWidth,
                            px: 0
                        }}
                    >
                        <Stack width={buttonWidth}>
                            <Typography
                                variant="h8"
                                color={selected === item ? 'light' : 'dark'}
                                fontSize='10px'
                            >
                                {formatDate(item.period, 'year')}
                            </Typography>
                            <Typography
                                variant="h6"
                                color={selected === item ? 'light' : 'dark'}
                            >
                                {formatDate(item.period, 'month')}
                            </Typography>
                        </Stack>
                    </Button>
                </Box>

            );
        }

        return ret;
    });

    const ControlButton = ({ icon, scrollValue }) => {
        return (
            <IconButton
                variant="contained"
                onClick={() => scroll(scrollValue)}
                sx={{
                    backgroundColor: theme.palette.black.main,
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    zIndex: 1,

                    '&:hover': {
                        backgroundColor: theme.palette.black.hover, // Custom hover background color
                    },
                }}
            >
                <Icon
                    sx={{
                        fontSize: '20px',
                        color: theme.palette.white.main
                    }}>
                    {icon}
                </Icon>
            </IconButton>
        )
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: "flex",
                position: 'relative',
                alignItems: 'center',
                gap: 2,
                px: 2,
                boxSizing: 'border-box', // Includes padding in width calculation

                '&::before': { // horizontal line
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    mx: '30px',
                    top: '50%', // centers vertically
                    height: '1.5px', // line thickness
                    backgroundColor: '#000000', // or any color
                    zIndex: -1 // sends line behind content
                }
            }}
        >
            <ControlButton icon='navigate_before' scrollValue={-100} />


            <Box
                ref={containerRef}
                sx={{
                    flex: 1,
                    width: '100%',
                    display: "flex",
                    overflowX: "auto",
                    gap: 3,
                    scrollbarWidth: "none", // Hide scrollbar for Firefox
                    msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                    "&::-webkit-scrollbar": {
                        display: "none", // Hide scrollbar for Chrome, Safari, and Opera
                    },
                    py: 2,
                    px: 5,
                }}
            >
                {periodButton}
            </Box>

            <ControlButton icon='navigate_next' scrollValue={100} />

        </Box>

    );
}

export default Session;