import React from 'react'
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
      <header>
          <div className='Container'>
              <Link to='/'>
                  <h1>Workout Buddy</h1>
              </Link>
          </div>
   </header>
  )
}
