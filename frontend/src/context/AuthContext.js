import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (usernameOrEmail, password) => {
        try {
            const response = await axios.post('/api/login', { usernameOrEmail, password });
            setUser(response.data.user);
            // Redirect or handle login success
        } catch (error) {
            console.error('Login failed:', error);
            // Handle errors
        }
    };

    const register = async (name, username, email, password) => {
        try {
            const response = await axios.post('/api/register', { name, username, email, password });
            setUser(response.data.user);
            // Redirect or handle registration success
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle errors
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout');
            setUser(null);
            // Redirect or handle logout success
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle errors
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
