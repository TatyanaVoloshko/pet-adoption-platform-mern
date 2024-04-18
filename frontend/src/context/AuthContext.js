/* frontend/src/context/AuthContext */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();



    // Check session status on component mount and update isLoggedIn state
    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('/api/auth/session-status', { withCredentials: true });
            setIsLoggedIn(response.data.isLoggedIn); //
            if (response.data.isLoggedIn) {
                setUser(response.data.user);
            } else {
                setUser(null);
                setError('Your session has expired. Please log in again.');  // User-friendly error message
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            setIsLoggedIn(false);
            setUser(null);
            setError('Unable to verify user session. Please check your network connection.');  // User-friendly error message
        }
    };


    /*handles user login by sending credentials to the backend server and processing the response;
    *updates the application state based on whether the login attempt was successful.
    * @param usernameOrEmail - username or email address entered by the user
    * @param password - password entered by the user.
    * @param navigate() - function from useNavigate() to change routes (i.e. redirect)
    * @return `true` if the login is successful, `false` otherwise
    * calls setUser to  to update the user state
    * calls setIsLoggedIn to update the login state.
    * uses axios to make a POST request to the backend (/api/auth/login)
    * uses `navigate()` to redirect the user upon successful login.*/
    const login = async (usernameOrEmail, password) => {
        try {
            const loginResponse = await axios.post('/api/auth/login', { usernameOrEmail, password }, { withCredentials: true });
            if (loginResponse.status === 200 && loginResponse.data.success) {
                setIsLoggedIn(true);
                setUser(loginResponse.data.user);
                console.log(loginResponse.data.user);
                navigate('/'); // Redirect to home page after successful login
            } else {
                throw new Error(loginResponse.data.message || 'Login failed. Please try again.'); // Use server-provided message for error
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response?.data.message || 'Login failed. Please try again.');
            setIsLoggedIn(false);
            setUser(null);
        }
    };



    const register = async (name, username, email, password) => {
        try {
            const response = await axios.post('/api/auth/register', {
                name,
                username,
                email,
                password
            }, { withCredentials: true });

            if (response.data.success) {
                setIsLoggedIn(true);
                setUser(response.data.user);
                navigate('/'); // Redirect to home page after successful registration
            } else {
                throw new Error(response.data.message); // Use server-provided message for error
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            setError(error.response?.data.message || 'Registration failed. Please try again.');
        }
    };


    /*logout function
    * handles the user logout by informing the backend to invalidate the user session and
    * updating the frontend state to reflect that the user is no longer logged in;
    *
    * uses `axios` to send a POST request to `/api/auth/logout`
    * `{}` in the axios.post call - data payload that would be sent to the server
    * (in case with logout, there's no need to send credentials in the body - server can identify them)
    *
    * calls setUser to update the user state
    * calls setIsLoggedIn to update the login state
    * */

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', {}, { withCredentials: true });
            setUser(null);
            setIsLoggedIn(false);
            navigate('/api/auth/login');
            /* ^^ redirects the user after logging out to the login page. This prevents users from staying on a page they should only see when logged in.*/
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : error.message);
            setError('Logout failed. Please try again.');
        }
    };


    /*-------------------------------------------------------------------------------------*/




    return (
        <AuthContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, error, setError, login, handleLogout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
