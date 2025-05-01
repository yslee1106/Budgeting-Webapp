import { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Stack,
    Fade,
    Tabs,
    Tab,
} from '@mui/material';

const TabButtons = ({ tabs, currentTab, onTabChange }) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={currentTab}
                onChange={onTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="modal tabs"
            >
                {tabs.map((tab, index) => (
                    <Tab
                        key={tab.id}
                        label={tab.label}
                        icon={tab.icon}
                        iconPosition={tab.iconPosition}
                        disabled={tab.disabled}
                        id={`modal-tab-${index}`}
                        aria-controls={`modal-tabpanel-${index}`}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'medium',
                            fontSize: '14px',
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

function TabbedModal({
    isOpen,
    setIsOpen,
    title,
    tabs,
    tabPanels,
    initialTab = 0 }) {

    const [currentTab, setCurrentTab] = useState(initialTab);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleOnClose = () => {
        setIsOpen(false);
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleOnClose}
        >

            <Fade in={isOpen}>

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
                        minWidth: '90vw',
                        minHeight: '90vh',
                        backgroundColor: (theme) => theme.palette.white.main,
                        borderRadius: '10px',
                    }}
                >
                    {/* Title */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pb: '1rem',
                        }}
                    >
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            fontFamily="Inter-Bold, Helvetica"
                        >
                            {title}
                        </Typography>
                    </Box>

                    {/* Tabs */}
                    <TabButtons
                        tabs={tabs}
                        currentTab={currentTab}
                        onTabChange={handleTabChange}
                    />

                    {/* Tab Panels */}
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        {tabPanels.map((Component, index) => (
                            <Box
                                key={tabs[index].id}
                                role="tabpanel"
                                hidden={currentTab !== index}
                                id={`modal-tabpanel-${index}`}
                                aria-labelledby={`modal-tab-${index}`}
                                sx={{
                                    margin: '1rem'
                                }}
                            >
                                {currentTab === index && Component}
                            </Box>
                        ))}
                    </Box>

                </Box>
            </Fade>
        </Modal>
    );
}

export default TabbedModal;