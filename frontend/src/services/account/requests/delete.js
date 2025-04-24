import api from 'services/api';

const deleteTransaction = async (transaction) => {
    try {
        const response = await api.delete(`/accounts/transaction/${transaction.id}/`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to delete transaction');
    }
};

export {
    deleteTransaction,
};