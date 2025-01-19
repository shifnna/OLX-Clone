import React from "react";
import "./ProductCard.css";
import phone from '../../assets/phone.png'
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productDetails/${product.id}`, { state: { product } });
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img src={phone} alt={product.title} className="product-card__image" />
      <div className="product-card__info">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;