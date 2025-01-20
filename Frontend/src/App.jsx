import React, { createContext, useState } from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import AddProductPage from "./components/Pages/AddProduct/AddProduct";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails";
import AddProduct from "./components/Pages/AddProduct/AddProduct";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {

  return (
    <div>
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
        <Route path="/productDetails" element={<ProductDetails/>} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
    </Router>
  </AuthProvider>
    </div>
  )

}

export default App
