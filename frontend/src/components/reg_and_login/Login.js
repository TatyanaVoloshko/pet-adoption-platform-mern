//frontend/src/components/reg_and_login/Login.js
import React, { useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {useNavigate} from "react-router-dom"; //import custom useContext hook
import './Auth.css'


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
      <div className="container container-login welcome">
        <form onSubmit={handleSubmit} className="add-form-login">
          <div className="col-md-6 position-relative col-md-6-auth">
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Username/Email"
              className="form-control input-group-text-auth"
              required
              autoComplete="username"
            />
          </div>
          <div className="col-md-6 position-relative col-md-6-auth">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control input-group-text-auth"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn">
            Sign In
          </button>
          <p className="auth-link">
            New to the website?{" "}
            <span onClick={() => (window.location.href = "/api/auth/register")}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    );
}

export default Login;
