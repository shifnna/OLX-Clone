import React, { useState, useContext } from "react";
import "./Header.css";
import { FaSearch, FaBell, FaHeart, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../App";


const Header = ({ onWishClick, onSellClick, searchTerm, handleSearchChange }) => {
  const { user, logout } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  console.log("Current User in Header:", user);
  
  return (
    <div>
      <header className="header">
        <div className="header__logo">OLX Clone</div>
        <div className="header__search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="header__search-input"
            placeholder="Search here.."
          />
          <button className="header__search-button">
            <FaSearch />
          </button>
        </div>
        <nav className="header__nav">
          <FaHeart onClick={()=>{onWishClick()}} className="header__icon" />
          <FaBell className="header__icon" />

          {/* User Circle with Hover for Logout */}
          <div
            className="header__user-container"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <FaUserCircle className="header__icon" />
            {user ? (
              <>
                <span className="header__username">{user.name}</span>
                {showLogout && (
                  <div className="header__user-dropdown">
                    <div className="header__dropdown-arrow"></div>
                    <button className="header__logout-button" onClick={logout}>
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <a onClick={onSellClick} className="header__login-button">
                Login
              </a>
            )}
          </div>

          <button onClick={onSellClick} className="header__sell-button">
            + SELL
          </button>
        </nav>
      </header>
      <div className="header__categories">
        <span className="header__categories-title">ALL CATEGORIES ▼</span>
        <span>Cars</span>
        <span>Motorcycles</span>
        <span>Mobile Phones</span>
        <span>For Sale: Houses & Apartments</span>
        <span>Scooters</span>
        <span>Commercial & Other Vehicles</span>
        <span>For Rent: Houses & Apartments</span>
      </div>
    </div>
  );
};

export default Header;
