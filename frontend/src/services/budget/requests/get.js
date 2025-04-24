import api from 'services/api';

const fetchLatestSession = async () => {
    try {
        const response = await api.get(`/budget/session/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const fetchSessionByPeriod = async (period) => {
    try {
        const response = await api.get(`/budget/session/?period=${period}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const fetchBucketByPeriod = async (period) => {
    try {
        const response = await api.get(`/budget/bucket/?period=${period}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const fetchIncome = async () => {
    try {
        const response = await api.get('/budget/income/');
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const fetchExpense = async () => {
    try {
        const response = await api.get('/budget/expense/');
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const fetchGoals = async () => {
    try {
        const response = await api.get('/budget/goals/');
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const fetchModelChoices = async () => {
    try {
        const response = await api.get('/budget/choices/');
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export {
    fetchLatestSession,
    fetchSessionByPeriod,
    fetchBucketByPeriod,
    fetchIncome,
    fetchExpense,
    fetchGoals,
    fetchModelChoices,
};