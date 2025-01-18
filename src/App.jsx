import React from "react"
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import AddProductPage from "./components/Pages/AddProduct/AddProduct";

function App() {

  return (
    <div>

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
      </Routes>
    </Router>

    </div>
  )
}

export default App
