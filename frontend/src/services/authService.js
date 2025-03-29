import api from 'services/api'

const login = async (email, password) => {
    try {
        const response = await api.post('user/login/', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const signup = async (email, password) => {
    try {
        const response = await api.post('user/register/', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getProfile = async () => {
    try {
        const response = await api.get('user/profile/', {
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export default {
    login,
    signup,
    getProfile
};