import api from 'services/api';

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

export { patchGoalCurrentAmount };