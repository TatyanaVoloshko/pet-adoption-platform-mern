import React from 'react';
import { useAuth } from './context/AuthContext';

function UserProfile() {
    const { user, isLoggedIn, logout } = useAuth();

    if (!isLoggedIn) return <p>Please log in</p>;

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default UserProfile;
