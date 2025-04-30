import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import authService from 'services/user/requests/post';
import { useProfile } from 'services/user/queryHooks';
import api, { configureApiInterceptor } from 'services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { data: user, refetch: refetchProfile } = useProfile(isAuthenticated ? accessToken : null);

    // Initialize Axios interceptors
    useEffect(() => {
        configureApiInterceptor(
            () => accessToken,  // Function to get current token
            logout,         // Function to call on logout
            setAccessToken,
        );
        if (accessToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        // console.log('ready?', isInterceptorReady)
    }, [accessToken]);

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
            // setIsInterceptorReady(false);
            queryClient.clear();
        }
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);