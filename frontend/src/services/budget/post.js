import api from 'services/api'

const createGoal = async (goalData) => {
  try {
    const payload = {
      ...goalData,
      target_amount: parseFloat(goalData.targetAmount),
      target_date: goalData.enableTargetDate ?
        new Date(goalData.targetDate).toISOString() :
        null
    };

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