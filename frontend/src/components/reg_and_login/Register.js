//frontend/src/components/reg_and_login/Register.js
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useAuth();  // Use useAuth hook to access the register function

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form Submitted", { name, username, email, password, confirmPassword });
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        console.log("Attempting to register...");
        register(name, username, email, password);
    };


    const handleChange = (setter) => (e) => {
        console.log("Updating field", e.target.name, "to", e.target.value); // Add field name if not present
        setter(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={handleChange(setPassword)}
                placeholder="Password"
                required
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={handleChange(setConfirmPassword)}
                placeholder="Confirm Password"
                required
            />
            <button type="submit">Register</button>
            <p>Already have an account? <span onClick={() => window.location.href = '/login'}>Sign in</span></p>
        </form>
    );
}

export default Register;
