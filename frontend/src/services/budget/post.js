import api from 'services/api'
import dayjs from 'dayjs';

const createGoal = async (goalData) => {
  try {
    const payload = {
      name: goalData.name,
      category: goalData.category,
      target_amount: goalData.targetAmount,
      target_date: goalData.enableTargetDate ?
        new dayjs(goalData.target_date).format('YYYY-MM-DD') :
        null
    };

    console.log(payload);

    const response = await api.post('/budget/goals/', payload);
    return response.data;
  } catch (error) {
    // Convert to Error object for better handling
    throw new Error(error.response?.data?.detail || 'Failed to create goal');
  }
};

export {
  createGoal,
};