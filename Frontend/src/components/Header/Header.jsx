import React from "react";
import "./Header.css";
import { FaSearch, FaBell, FaHeart, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../App"; 

const Header = ({ onSellClick }) => {
  // const { user } = useContext(AuthContext);

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
        {/* {user && <span className="header__username">{user.name}</span>} */}
        <FaUserCircle className="header__icon" />
        <button onClick={onSellClick} className="header__sell-button">+ SELL</button>
      </nav>
    </header>
  );
};

export default Header;