//frontend/src/components/reg_and_login/Register.js
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import "./Auth.css";

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
      <div className="container container-login welcome">
        <form onSubmit={handleSubmit} className="add-form-regist">
          <div className="col-md-6 position-relative col-md-6-auth">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="form-control input-group-text-auth"
              required
            />
          </div>
          <div className="col-md-6 position-relative col-md-6-auth">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="form-control input-group-text-auth"
              required
              autoComplete="username"
            />
          </div>
          <div className="col-md-6 position-relative col-md-6-auth">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-control input-group-text-auth"
              required
              autoComplete="email"
            />
          </div>
          <div className="col-md-6 position-relative col-md-6-auth">
            <input
              type="password"
              value={password}
              onChange={handleChange(setPassword)}
              placeholder="Password"
              className="form-control input-group-text-auth"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="col-md-6 position-relative col-md-6-auth">
            <input
              type="password"
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword)}
              placeholder="Confirm Password"
              className="form-control input-group-text-auth"
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn-auth">
            Register
          </button>
          <p className="auth-link">
            Already have an account?{" "}
            <span onClick={() => (window.location.href = "/api/auth/login")}>
              Sign in
            </span>
          </p>
        </form>
      </div>
    );
}

export default Register;
