import api from 'services/api';

const patchProfile = async (updatedData) => {
    try {
        console.log('updatedData: ', updatedData);

        if (updatedData.date_of_birth) {
            updatedData.date_of_birth = updatedData.date_of_birth.format('YYYY-MM-DD');
        }

        const response = await api.patch(`/user/profile/update/`, updatedData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to update profile');
    }
};

export { patchProfile };