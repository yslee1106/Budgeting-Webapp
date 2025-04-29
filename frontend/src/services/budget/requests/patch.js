import api from 'services/api';
import dayjs from 'dayjs';

const patchIncome = async (incomeData) => {
    try {
        const keyMapping = {
            payFrequency: 'pay_frequency',
            nextPayday: 'next_payday',
        };

        const payload = Object.keys(incomeData).reduce((acc, key) => {
            if (key !== 'id') { // exclude id from payload if necessary
                const newKey = keyMapping[key] || key;
                acc[newKey] = incomeData[key];
                if (key === 'nextPayday'){
                    acc[newKey] = new dayjs(incomeData[key]).format('YYYY-MM-DD');
                }
            }
            
            return acc;
        }, {});

        console.log(payload);

        const response = await api.patch(`/budget/income/${incomeData.id}/`, payload);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to update goal');
    }
};

const patchGoalCurrentAmount = async (updatedData) => {
    try {
        const payload = {
            current_amount: updatedData.updatedTotal,
        };

        console.log(payload);

        const response = await api.patch(`/budget/goals/${updatedData.goal.id}/`, payload);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to update goal');
    }
};

export { 
    patchIncome,
    patchGoalCurrentAmount,
};