import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom"; // Use useLocation to access passed state
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Banner from "../../Header/banner";
import "./ProductDetails.css";
import { AuthContext } from '../../../App';
import LoginPageModal from '../HomePage/LoginPageModal';

const ProductDetails = () => {
  const { state } = useLocation(); // Access the state passed from ProductCard
  const { product } = state || {}; // Destructure the product object from state
  
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

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

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div>
      <Header onSellClick={handleSellClick} />
      <Banner />
      <div className="product-details">
        <div className="product-details__image-section">
          <img
            src={product.image ? `http://localhost:5000/uploads/${product.image}` : "default-image.jpg"} // Use the image path dynamically
            alt={product.name}
            className="product-details__image"
          />
        </div>
        <div className="product-details__info">
          <h1 className="product-details__price">₹{product.price}</h1>
          <h2 className="product-details__title">{product.name}</h2>
          <p>{product.description}</p>
          <p className="product-details__location">{product.location}</p>
          <button className="product-details__chat-button">Chat with Seller</button>
          <div className="product-details__seller-info">
            <h3>{product.sellerName}</h3>
            <p>{product.sellerLocation}</p>
          </div>
        </div>
        <div className="product-details__details">
          <h3>Details</h3>
          <p>Condition: {product.condition}</p>
          <p>Color: {product.color}</p>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-details__map">
          <h3>Posted In</h3>
          <iframe
            title="map"
            src={`https://www.google.com/maps/embed?pb=${product.location}`} // Use location data if applicable
            className="product-details__map-iframe"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {showModal && <LoginPageModal onClose={closeModal} />} {/* Modal is outside main */}
      <Footer />
    </div>
  );
};

export default ProductDetails;
