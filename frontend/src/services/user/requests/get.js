import api from 'services/api'

const getProfile = async () => {
    try {
        const response = await api.get('user/profile/');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export {
    getProfile,
};