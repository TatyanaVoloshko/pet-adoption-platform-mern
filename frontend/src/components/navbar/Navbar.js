import React from 'react'
import { Link } from "react-router-dom"
import logo from "../../images/Logo.png"
import './Navbar.css'

export const Navbar = () => {
  return (
    <header className="Header">
      <div className="Logo">
        <img src={logo} alt="logo" width={100} />
        <Link to="/" className="Link">
          Home
        </Link>
        <Link to="" className="Link">
          Add new pet
        </Link>
      </div>
      <div className="Auth">
        <Link to="" className="Link">
          Welcome User
        </Link>
        <Link to="" className="Link">
          {" "}
          Log out
        </Link>
      </div>
    </header>
  );
}
