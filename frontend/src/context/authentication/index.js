// src/context/AuthContext/index.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const profileData = await authService.getProfile()
            setUser(profileData);
        } catch (error) {
            console.error('Error fetching profile:', error);
            logout();
        }
    };

    const login = async (username, password) => {
        try {
            const { access } = await authService.login(username, password);
            localStorage.setItem('token', access);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (username, email, password) => {
        try {
            await authService.signup(username, email, password);
            // Automatically log in after registration
            await login(username, password);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);