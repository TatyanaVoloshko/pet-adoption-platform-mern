import React from 'react'
import { Link } from "react-router-dom"
import logo from "../../images/Logo.png"
import './Navbar.css'

export const Navbar = () => {
  return (
    <header className="Header">
      <img src={logo} alt="logo" className="Logo" width={100} />
      <div>
        <Link to="/">Home</Link>
        <Link to="">Add new pet</Link>
      </div>
      <div>
        <Link to="">Welcome User</Link>
        <Link to=""> Log out</Link>
      </div>
    </header>
  );
}
