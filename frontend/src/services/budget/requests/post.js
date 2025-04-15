import api from 'services/api'
import dayjs from 'dayjs';

const createExpense = async (expenseData) => {
    try {
        const payload = {
            name: expenseData.name,
            category: expenseData.category,
            payment_frequency: expenseData?.recurring ? expenseData.paymentFrequency : null,
            next_payment: expenseData.recurring ?
                new dayjs(expenseData.nextPayment).format('YYYY-MM-DD') :
                null,
            spending_limit: expenseData.spendingLimit,
        };

        console.log(payload);

        const response = await api.post('/budget/expense/', payload);
        return response.data;

    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to create expense');
    }
}

const createGoal = async (goalData) => {
    try {
        const payload = {
            name: goalData.name,
            category: goalData.category,
            target_amount: goalData.targetAmount,
            target_date: goalData.enableTargetDate ?
                new dayjs(goalData.targetDate).format('YYYY-MM-DD') :
                null
        };

        console.log(payload);

        const response = await api.post('/budget/goals/', payload);
        return response.data;

    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to create goal');
    }
};

export {
    createGoal,
    createExpense,
};