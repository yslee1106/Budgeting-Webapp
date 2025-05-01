import api from 'services/api';

const fetchTransactionByExpense = async (bucketId, page = 1, pageSize = 10) => {
    try {
        const response = await api.get(`/accounts/transaction/?bucket=${bucketId}`, {
            params: {
                page: page,
                page_size: pageSize
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export {
    fetchTransactionByExpense,
};