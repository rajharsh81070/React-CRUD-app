import React from 'react';
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "orange" };
  return (
    <nav>
      <NavLink to="/" exact activeStyle={activeStyle}>Home</NavLink> | <NavLink to="/courses" activeStyle={activeStyle}>Courses</NavLink> |<NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
    </nav>
  )
}

export default Header;