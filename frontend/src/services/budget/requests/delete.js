import api from 'services/api';

const deleteIncome = async (income) => {
    try {
        const response = await api.delete(`/budget/income/${income.id}/`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to delete income');
    }
}

const deleteGoal = async (goal) => {
    try {
        const response = await api.delete(`/budget/goals/${goal.id}/`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to delete goal');
    }
};

const deleteExpense = async (bucket) => {
    try {
        const response = await api.delete(`/budget/expense/${bucket.expense}/`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to delete expense');
    }
};

export { 
    deleteGoal,
    deleteExpense,
    deleteIncome,
};