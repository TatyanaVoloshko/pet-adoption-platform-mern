import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        login(usernameOrEmail, password);
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
