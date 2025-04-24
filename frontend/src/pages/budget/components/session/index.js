import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import dayjs from "dayjs";

import { useSessions } from 'services/budget/queryHooks';

import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

const useDynamicMonthList = (buttonWidth, currentPeriod) => {
    const containerRef = useRef(null);
    const [capacity, setCapacity] = useState(0);
    const [offset, setOffset] = useState(0);

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

    // Calculate visible months based on capacity and offset
    const generateMonthList = () => {
        const months = [];
        const currentMonth = dayjs(currentPeriod).startOf('month');

        for (let i = 0; i < capacity; i++) {
            const month = currentMonth.subtract(offset + i, 'month');
            const date = month.format('YYYY-MM-01')
            months.push({
                period: date,
                month: formatDate(date, 'month'),
                year: formatDate(date, 'year'),
            });
        }
        return months;
    };

    // Update capacity when container resizes
    useEffect(() => {
        const calculateCapacity = () => {
            const containerWidth = containerRef.current?.offsetWidth || 0;

            const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const gapInPixels = 2 * remInPixels;

            return Math.floor(containerWidth / (buttonWidth + gapInPixels));
        };

        const updateCapacity = () => setCapacity(calculateCapacity());

        updateCapacity();
        const resizeObserver = new ResizeObserver(updateCapacity);
        if (containerRef.current) resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    // Navigation handlers
    const handleNavigate = (direction) => {
        setOffset(prev => Math.max(0, prev + (direction === 'left' ? 1 : -1)));
    };

    return {
        containerRef,
        months: generateMonthList(),
        handleNavigate,
        canNavigateRight: offset > 0
    };
};

const Session = ({ selectedPeriod, setSelectedPeriod }) => {
    //
    // VARIABLES
    //
    const { data: sessionData = [], isLoading, error } = useSessions();
    const currentPeriod = sessionData.period;
    const buttonWidth = 140;
    const { containerRef, months, handleNavigate, canNavigateRight } = useDynamicMonthList(buttonWidth, currentPeriod);
    
    //
    // Helper Functions
    //
    
    const theme = useTheme();

    //
    // UI OBJECTS
    //
    const SessionPicker = months.map(month => {

        return (
            <Box
                key={month.period}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <Button
                    key={month.period}
                    variant="contained"
                    onClick={() => setSelectedPeriod(month.period)}
                    sx={{
                        backgroundColor: selectedPeriod === month.period ? theme.palette.primary.main : theme.palette.white.main,
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
                            color={selectedPeriod === month.period ? 'light' : 'dark'}
                            fontSize='10px'
                        >
                            {month.year}
                        </Typography>
                        <Typography
                            variant="h6"
                            color={selectedPeriod === month.period ? 'light' : 'dark'}
                        >
                            {month.month}
                        </Typography>
                    </Stack>
                </Button>
            </Box>
        )

    })

    const ControlButton = ({ icon, direction }) => {
        return (
            <IconButton
                variant="contained"
                onClick={() => handleNavigate(direction)}
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
            <ControlButton icon='navigate_before' direction='left' />


            <Box
                ref={containerRef}
                sx={{
                    flex: 1,
                    width: '100%',
                    display: "flex",
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-around',
                    py: 2,
                    px: 5,
                }}
            >
                {SessionPicker}
            </Box>

            <ControlButton icon='navigate_next' direction='right' />

        </Box>

    );
}

export default Session;