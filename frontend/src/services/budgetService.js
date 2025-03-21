import api from 'services/api';

const fetchSessions = async () => {
    try {
        const response = await api.get('/budget/session/');
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const fetchBucketBySession = async (session) => {
    try {
        const response = await api.get(`/budget/bucket/?session=${session}`);
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

export {
    fetchSessions,
    fetchBucketBySession,
    fetchIncome,
    fetchExpense,
    fetchGoals,
};