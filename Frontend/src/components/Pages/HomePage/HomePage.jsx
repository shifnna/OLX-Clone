import React, { useState, useEffect, useContext } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import ProductCard from "../../ProductCard/ProductCard";
import "./HomePage.css";
import Banner from "../../Header/banner";
import LoginPageModal from "./LoginPageModal";
import { AuthContext } from '../../../App';
import axios from "axios"; // Import axios for API requests

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]); // State to store products from the backend
  const { isLoggedIn } = useContext(AuthContext);

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {      
      try {
        const response = await axios.get('http://localhost:5000/products'); 
        console.log('Fetched Products:', response.data); // Debugging
        setProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSellClick = () => {
    if (isLoggedIn) {
      window.location.href = "/SellProduct"; 
    } else {
      setShowModal(true); // Show the login modal
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home">
      <Header onSellClick={handleSellClick} />
      <Banner />
      <main className={`home__content ${showModal ? "blurred" : ""}`}>
        <div className="home__products">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} /> // Use _id from MongoDB
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </main>
      {showModal && <LoginPageModal onClose={closeModal} />} {/* Modal is outside main */}
      <Footer />
    </div>
  );
};

export default HomePage;
