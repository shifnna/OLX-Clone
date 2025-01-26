import React, { useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import icons
import axios from "axios";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false); // Wishlist state

  const handleCardClick = () => {
    navigate(`/productDetails/${product._id}`, { state: { product } }); // Navigate to product details
  };

  const handleWishlistClick = async (e) => {
    e.stopPropagation(); // Prevent triggering card click
    setIsWishlisted((prev) => !prev); // Toggle wishlist state

    try {
      // Send wishlist action to the database
      await axios.post(
        "http://localhost:5000/wishlist",
        { productId: product._id, action: newWishlistState ? "add" : "remove" },
        {
          headers: { Authorization: `Bearer ${token}` }, // Add token to headers
          withCredentials: true
        },
      );
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="wishlist-icon" onClick={handleWishlistClick}>
        {isWishlisted ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart size={24} />}
      </div>
      <img
        src={product.image ? `http://localhost:5000/uploads/${product.image}` : "default-image.png"}
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
