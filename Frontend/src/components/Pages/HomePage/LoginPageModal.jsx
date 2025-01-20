import React, { useState, useContext } from "react";
import { AuthContext } from "../../../App";
import "./LoginPageModal.css";

const LoginPageModal = ({ onClose }) => {
    console.log("LoginPageModal rendered");
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useContext(AuthContext);
  
    const handleToggleForm = () => setIsLogin(!isLogin);
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isLogin) {
        login();
        onClose(); // Close the modal after login
      } else {
        console.log("Signup Submitted");
        onClose();
      }
    };
  
    return (
      <div className="modal">
        <div className="modal__overlay" onClick={onClose}></div>
        <div className="modal__content">
          <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && <input type="text" placeholder="Full Name" required />}
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            {!isLogin && <input type="password" placeholder="Confirm Password" required />}
            <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
          </form>
          <p onClick={handleToggleForm} className="modal__toggle">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </p>
        </div>
      </div>
    );
  };
  

export default LoginPageModal;
