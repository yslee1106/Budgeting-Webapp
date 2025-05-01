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

const logout = async () => {
    try {
        const response = await api.post('user/logout/');
    } catch (error) {
        throw error.response.data
    }
}

export default {
    login,
    signup,
    logout
};