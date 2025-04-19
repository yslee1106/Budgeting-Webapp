import api from 'services/api'
import dayjs from 'dayjs';

const addTransaction = async (transactionData) => {
    try {
        const payload = {
            reference_number : transactionData.referenceNumber,
            date: new dayjs(transactionData.date).format('YYYY-MM-DD'),
            description: transactionData.description,
            bucket: transactionData.bucket.id,
            amount: transactionData.amount,
        }

        console.log(payload);

        const response = await api.post('/accounts/transaction/', payload);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to create transaction');
    }
}

export {
    addTransaction
};