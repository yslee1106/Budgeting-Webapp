import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from 'services/user/post';
import api, { configureApiInterceptor } from 'services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Initialize Axios interceptors
    useEffect(() => {
        configureApiInterceptor(
            () => accessToken,  // Function to get current token
            logout             // Function to call on logout
        );
    }, [accessToken]);

    const fetchProfile = async () => {
        try {
            const profileData = await authService.getProfile();
            setUser(profileData);
        } catch (error) {
            console.error('Error fetching profile:', error);
            logout();
        }
    };

    const login = async (email, password) => {
        try {
            const res = await authService.login(email, password);
            setAccessToken(res.access);  // Only store in state
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (email, password) => {
        try {
            await authService.signup(email, password);
            await login(email, password);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setAccessToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);