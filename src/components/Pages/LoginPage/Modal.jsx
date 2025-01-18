import React from "react";
import { useModal } from "./ModalContext";
import "./Modal.css";

const Modal = () => {
  const { isOpen, isLogin, toggleForm } = useModal();

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay"></div>
      <div className="modal__content">
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
        {isLogin ? (
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Sign Up</button>
          </form>
        )}
        <p onClick={toggleForm} className="modal__toggle">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </p>
      </div>
    </div>
  );
};

export default Modal;
