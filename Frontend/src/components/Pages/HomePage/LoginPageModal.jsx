import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../App"; 
import { useNavigate } from "react-router-dom"; 
import "./LoginPageModal.css";

const LoginPageModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 
    const { login } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Validation rules
        if (!isLogin && (!formData.name || formData.name.trim().length < 2)) {
            newErrors.name = "Name must be at least 2 characters long.";
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleToggleForm = () => setIsLogin(!isLogin);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Prevent submission if form is invalid

        if (isLogin) {
            try {
                const response = await axios.post("http://localhost:5000/user/login", {
                    email: formData.email,
                    password: formData.password,
                });
                
                if (response.status === 200) {
                    console.log("Login response data:", response.data.user._id);
                    alert("Login successful!");
                    const { user, token } = response.data;
                    login(user);
                    onClose();
                    navigate("/"); 
                } else {
                    alert("Unexpected response");
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert(error.response?.data?.error || "Login failed");
            }
        } else {
            // Signup process
            try {
                await axios.post("http://localhost:5000/user/signup", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                alert("Signup successful! Please log in.");
                setIsLogin(true); // Switch to login form
            } catch (error) {
                console.error("Error during signup:", error.response?.data?.error || error.message);
                alert(error.response?.data?.error || "Signup failed");
            }
        }
    };
    

    return (
        <div className="modal">
            <div className="modal__overlay" onClick={onClose}></div>
            <div className="modal__content">
                <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.name && <p className="error">{errors.name}</p>}
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                        </div>
                    )}
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
