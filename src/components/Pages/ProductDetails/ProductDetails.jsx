import React from "react";
import Header from "../../header/header";
import Footer from "../../Footer/Footer";
import Banner from "../../Header/banner";
import "./ProductDetails.css";
import phone from '../../../assets/phone.png'

const ProductDetails = () => {
    
  const product = {
    image: "image1.jpg",
    title: "3 spoke steering wheel for willy jeep spare parts",
    price: "₹2,500",
    description: `AGGARWAL JEEP PARTS
    MAIN BAWANA HIGHWAY PUNJAB
    JINDRI AGGARWAL
    AGGARWAL CHINTPURNI
    ALL JEEP SPARE AVAILABLE.
    ALL TYPES OF JINDRI/WILLY SPARE PARTS ARE AVAILABLE.
    3 SPOKE STEERING WHEEL FOR WILLY.`,
    seller: {
      name: "Shri Ganesh Motors",
      location: "Malacca, Andaman & Nicobar Islands, India",
    },
  };

  return (
    <div>
      <Header />
      <Banner />
      <div className="product-details">
        <div className="product-details__image-section">
          <img
            src={phone}
            alt={product.title}
            className="product-details__image"
          />
        </div>
        <div className="product-details__info">
          <h1 className="product-details__price">{product.price}</h1>
          <h2 className="product-details__title">{product.title}</h2>
          <p className="product-details__location">{product.seller.location}</p>
          <button className="product-details__chat-button">
            Chat with Seller
          </button>
          <div className="product-details__seller-info">
            <h3>{product.seller.name}</h3>
            <p>Malacca, Andaman & Nicobar Islands, India</p>
          </div>
        </div>
        <div className="product-details__details">
          <h3>Details</h3>
          <p>Type: Other Spare Parts</p>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-details__map">
          <h3>Posted In</h3>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18..."
            className="product-details__map-iframe"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
