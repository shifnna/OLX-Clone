import React, { useState, useEffect, useContext } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; 
import axios from "axios";
import { AuthContext } from "../../App";

const ProductCard = ({ product, isWishlisted, showLoginModal, setShowLoginModal }) => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  useEffect(() => {
    setWishlisted(isWishlisted); // Sync initial wishlist state
  }, [isWishlisted]);

  const handleCardClick = () => {
    navigate(`/productDetails/${product._id}`, { state: { product } });
  };

  const handleWishlistClick = async (e) => {
    e.stopPropagation(); // Prevent triggering card click

    if (!isLoggedIn || !user) {
      setShowLoginModal(true);
      return;
    }

    const newWishlistState = !wishlisted; 
    setWishlisted(newWishlistState); // Toggle UI state immediately

    try {
      await axios.post(
        "http://localhost:5000/wishlist",
        { productId: product._id, action: newWishlistState ? "add" : "remove", user },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setWishlisted(!newWishlistState); // Revert UI change on error
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="wishlist-icon" onClick={handleWishlistClick}>
        { wishlisted ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart size={24} />}
      </div>
      <img
        src={product.image ? `http://localhost:5000/uploads/${product.image}` : "default-image.png"}
        alt={product.name}
        className="product-card__image"
      />
      <div className="product-card__info">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__price">₹{product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
