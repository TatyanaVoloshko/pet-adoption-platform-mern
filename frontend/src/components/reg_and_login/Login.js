//frontend/src/components/reg_and_login/Login.js
import React, { useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {useNavigate} from "react-router-dom"; //import custom useContext hook

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // state to store error message
    const { login } = useAuth(); // Using the useAuth hook
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await login(usernameOrEmail, password);
        if (result) {
            navigate("/"); //navigate home on successful login
        } else {
            setError('Login failed. Please check your username/email and password and try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Username/Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Sign In</button>
            <p>New to the website? <span onClick={() => window.location.href = '/register'}>Click to register here</span></p>
        </form>
    );
}

export default Login;
