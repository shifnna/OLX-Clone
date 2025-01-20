// import React from "react";
// import "./LoginPage.css";

// const LoginPage = () => {
//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h1 className="login-title">Login</h1>
//         <form className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" placeholder="Enter your email" required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <div className="login-footer">
//           <p>Don't have an account? <a href="/signup">Sign up</a></p>
//           <p><a href="/forgot-password">Forgot Password?</a></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // `true` for Login, `false` for Signup

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login API request
      console.log("Login Submitted");
    } else {
      // Handle signup API request
      console.log("Signup Submitted");
    }
  };

  return (
    <div className="login-page">
      {/* Modal with Blur Effect */}
      <div className="modal">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                {/* Signup-only fields */}
                <input type="text" placeholder="Full Name" required />
              </>
            )}
            {/* Common fields for both login and signup */}
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            {!isLogin && (
              <>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </>
            )}
            <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
          </form>
          <p onClick={handleToggleForm} className="modal__toggle">
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
