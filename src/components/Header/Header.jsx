import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">OLX Clone</div>
      <input type="text" className="header__search" placeholder="Search items..." />
      <Link to="/login" className="header__login">Login</Link>
    </header>
  );
};

export default Header;
