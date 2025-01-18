import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaSearch, FaBell, FaHeart, FaUserCircle } from "react-icons/fa";

const Header = () => {
  
  return (
    <header className="header">
      <div className="header__logo">OLX Clone</div>
      <div className="header__search-bar">
        <input
          type="text"
          className="header__search-input"
          placeholder="Search \"
        />
        <button className="header__search-button">
          <FaSearch />
        </button>
      </div>
      <nav className="header__nav">
        <FaHeart className="header__icon" />
        <FaBell className="header__icon" />
        <FaUserCircle className="header__icon" />
        <button className="header__sell-button">+ SELL</button>
      </nav>
    </header>
  );
};

export default Header;