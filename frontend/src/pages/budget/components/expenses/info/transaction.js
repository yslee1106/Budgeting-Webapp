import { useState } from 'react';
import { useTheme } from '@emotion/react';
import dayjs from 'dayjs';

import { useDeleteTransaction } from 'services/account/accountMutations';
import { usePaginatedTransactions } from 'services/account/queryHooks';

import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button
} from "@mui/material";

import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';

import Confirmation from "layouts/Dialogs/Confirmation";


const groupTransactionsByDate = (transactions) => {
    return transactions?.reduce((acc, transaction) => {
        const date = new dayjs(transaction.date).format('YYYY-MM-DD');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});
};

const ActionButton = ({ icon: IconComponent, onClick }) => {
    return (
        <Box
            sx={{
                mx: '0.5rem',
            }}>
            <IconButton
                onClick={onClick}>
                <IconComponent fontSize='small' />
            </IconButton>
        </Box>

    )
}

const ExpenseTransaction = ({ selectedBucket }) => {

    //
    // Variable States
    //

    const { transactions, pagination, isLoading, isError } = usePaginatedTransactions(selectedBucket?.id);

    const groupedTransactions = groupTransactionsByDate(transactions);

    const [selectedTransaction, setSelectedTransaction] = useState('');
    const [openDeleteTransaction, setOpenDeleteTransaction] = useState(false);

    //
    // Helper Functions
    //

    const theme = useTheme()

    const { mutateAsync: deleteTransaction, loadDeleteTransaction } = useDeleteTransaction(selectedBucket?.id);

    const handleDeleteTransaction = async () => {
        try {
            await deleteTransaction(selectedTransaction);
            alert('Transaction Deleted');

            setSelectedTransaction('');
            setOpenDeleteTransaction(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.message);
        }
    }

    //
    // Event Handlers
    //

    const handleOpenDeleteTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setOpenDeleteTransaction(true);
    }

    // Yet to implement
    const handleEditTransaction = (transaction) => {
        console.log('Edit Transaction', transaction);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: 'calc(60vh - 20px)',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: '4px',
                },
            }}>

            {/* Transaction Data Mapping */}
            {Object.entries(groupedTransactions || {}).map(([date, dayTransactions]) => (

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>

                    {/* Date Section */}
                    <Typography
                        sx={{
                            fontFamily: "Inter-Medium, Helvetica",
                            fontWeight: 'medium',
                            fontSize: '17px',
                            color: '#727272'
                        }}
                    >
                        {dayjs(date).format('MMM D')}
                    </Typography>

                    <List sx={{ width: '100%' }}>
                        {dayTransactions.map((transaction) => (
                            <ListItem
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    py: 0
                                }}
                            >
                                {/* Title and Location */}
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontFamily: "Inter-Medium, Helvetica",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {transaction.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: "Inter-Medium, Helvetica",
                                                fontSize: '14px',
                                                color: theme.palette.grey[600]
                                            }}
                                        >
                                            {transaction.location}
                                        </Typography>
                                    }
                                    sx={{
                                        flex: '1 1 auto', // Takes remaining space
                                        minWidth: 0 // Prevents overflow
                                    }}
                                />

                                {/* Amount */}
                                <Box
                                    sx={{
                                        width: '300px', // Fixed width for amount container
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: "Inter-Medium, Helvetica",
                                            fontWeight: 500,
                                            color: theme.palette.negative.main,
                                            mx: '100px',
                                        }}
                                    >
                                        - $ {transaction.amount}
                                    </Typography>
                                </Box>

                                {/* Action Buttons */}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ActionButton
                                        icon={EditIcon}
                                        onClick={() => handleEditTransaction(transaction)}
                                    />

                                    <ActionButton
                                        icon={DeleteIcon}
                                        onClick={() => handleOpenDeleteTransaction(transaction)}
                                    />
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ))}

            {/* Load More Button */}
            {pagination.hasMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={pagination.loadMore}
                        disabled={pagination.isLoadingMore}
                    >
                        {pagination.isLoadingMore ? 'Loading...' : 'Load More'}
                    </Button>
                </Box>
            )}

            {/* No Transactions Found */}
            {transactions && transactions.length === 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                    }}>
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                        No transactions found
                    </Typography>
                </Box>
            )}

            <Confirmation
                isOpen={openDeleteTransaction}
                setIsOpen={setOpenDeleteTransaction}
                handleClick={handleDeleteTransaction}
                title={'Delete Transaction'}
                content={`Are you sure you want to delete ${selectedTransaction?.title}`}
            />

        </Box>
    )
}

export default ExpenseTransaction;