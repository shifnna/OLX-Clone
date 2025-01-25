import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productDetails/${product._id}`, { state: { product } }); // Passing product data using state
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img 
        src={product.image ? `http://localhost:5000/uploads/${product.image}` : 'default-image.png'} // Handle image dynamically
        alt={product.name} 
        className="product-card__image" 
      />
      <div className="product-card__info">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__price">₹{product.price}</p>
        <p className="">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
