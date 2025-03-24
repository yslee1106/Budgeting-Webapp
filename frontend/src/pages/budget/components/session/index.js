import React, { useRef, useState, useEffect } from "react";

import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";

import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function Session({ data, selected, setSelected }) {
    const containerRef = useRef(null);
    const [capacity, setCapacity] = useState(0);
    const buttonWidth = 140;


    // Scrolling Functions  
    const scroll = (scrollOffset) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: scrollOffset,
                behavior: "smooth",
            });
        }
    };


    // Blank Period Buttons Functions
    const calculateCapacity = (containerWidth, itemWidth) => {
        return Math.floor(containerWidth / itemWidth);
    };

    const fillList = (data, capacity) => {
        const filledList = [...data];


        while (filledList.length < capacity) {        // Add blank items if the data length is less than the capacity
            filledList.unshift({ id: `blank-${filledList.length}`, isBlank: true });
        }

        return filledList;
    };

    useEffect(() => {           // Set maximum number of buttons that can fit into the session box
        const containerWidth = containerRef.current.offsetWidth;
        console.log(containerWidth);
        const calculatedCapacity = calculateCapacity(containerWidth, buttonWidth);
        setCapacity(calculatedCapacity);
        console.log(calculatedCapacity);
    }, []);


    // Updated Data List
    const filledList = fillList(data, capacity);            // Data + blanks (if needed according to function)


    // Period Button Mapping
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
                <MDButton
                    variant='contained'
                    color='lightBlue'>
                    <Stack width={buttonWidth}>

                    </Stack>
                </MDButton>
            )
        } else {
            ret = (
                <MDButton
                    key={item}
                    variant={selected === item ? "contained" : "outlined"}
                    onClick={() => setSelected(item)}
                    color='dark'
                >
                    <Stack width={buttonWidth}>
                        <MDTypography
                            variant="h8"
                            color={selected === item ? 'light' : 'dark'}
                            fontSize={8}
                        >
                            {formatDate(item.period, 'year')}
                        </MDTypography>
                        <MDTypography
                            variant="h6"
                            color={selected === item ? 'light' : 'dark'}
                        >
                            {formatDate(item.period, 'month')}
                        </MDTypography>
                    </Stack>
                </MDButton>
            );
        }

        return ret;
    });

    return (
        <MDBox
            display="flex"
            flexDirection="horizontal"
            justifyContent="space-between"
            gap={2}
            py={2}
            px={2}
        >
            <IconButton
                variant="contained"
                color="info"
                onClick={() => scroll(-100)}
            >
                <Icon sx={{ fontWeight: "bold" }}>navigate_before</Icon>
            </IconButton>

            <Card>
                <MDBox
                    ref={containerRef}
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        overflowX: "auto",
                        gap: 3,
                        scrollbarWidth: "none", // Hide scrollbar for Firefox
                        msOverflowStyle: "none", // Hide scrollbar for IE/Edge
                        "&::-webkit-scrollbar": {
                            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
                        },
                        py: 2,
                        px: 5,
                        width: '50rem'
                    }}
                >
                    {periodButton}
                </MDBox>
            </Card>

            <IconButton
                varient="contained"
                color="info"
                onClick={() => scroll(100)}
            >
                <Icon sx={{ fontWeight: "bold" }}>navigate_next</Icon>
            </IconButton>
        </MDBox>
    );
}

export default Session;