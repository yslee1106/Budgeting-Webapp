import api from 'services/api'
import dayjs from 'dayjs';

const createIncome = async (incomeData) => {
    try {
        const payload = {
            name: incomeData.name,
            category: incomeData.category,
            amount: incomeData.amount,
            pay_frequency: incomeData.payFrequency,
            next_payday: new dayjs(incomeData.nextPayment).format('YYYY-MM-DD')
        };

        console.log(payload);

        const response = await api.post('/budget/income/', payload);
        return response.data;

    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to create income');
    }
};

const injectIncome = async (income) => {
    try {
        const response = await api.post(`/budget/income/${income.id}/inject/`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to inject income');
    }
};

const subtractIncome = async (income) => {
    try {
        const response = await api.post(`/budget/income/${income.id}/subtract/`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to subtract income');
    }
};

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
};

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
    createIncome,
    injectIncome,
    subtractIncome,
};