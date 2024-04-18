/* frontend/src/components/navbar/Navbar.js */
import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import logo from "../../images/Logo.png"
import './Navbar.css'
import { AuthContext } from '../../context/AuthContext';
export const Navbar = () => {
    const { isLoggedIn, handleLogout } = useContext(AuthContext);
    return (
      <header className="Header">
        <div className="Logo">
          <img src={logo} alt="logo" width={100} className="Logo-img" />
          <Link to="/" className="Link">
            Home
          </Link>
          <Link to="/api/pets" className="Link">
            Add new pet
          </Link>
          <Link to="/favorite-pets" className="Link"> Favorite Pets</Link>
        </div>
        <div className="Auth">
          {isLoggedIn ? (
            <>
              <Link to="" className="Link">
                Welcome User
              </Link>
              <button
                onClick={handleLogout}
                className="Link"
                style={{ border: "none", background: "none" }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/api/auth/login" className="Link">
                Login
              </Link>
              <Link to="/api/auth/register" className="Link">
                Register
              </Link>
            </>
          )}
        </div>
      </header>
    );
}
