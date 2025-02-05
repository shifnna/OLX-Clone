import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails";
import SellProduct from "./components/Pages/AddProduct/SellProduct";
import { createContext, useState, useEffect } from "react";
import WishlistPage from "./components/Pages/WishlistPage/WishlistPage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }    
  }, []);

  const login = (userData,token) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user,token }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/SellProduct" element={<SellProduct />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
