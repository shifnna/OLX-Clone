import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-card__image" />
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__price">${product.price}</p>
    </div>
  );
};

export default ProductCard;
