import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  console.log("Extracted userId from URL:", userId); // Debugging

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) {
        console.error("User ID is missing in URL");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/wishlist/${userId}`);
        setWishlist(response.data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <div key={item.productId._id}>
            <h2>{item.productId.name}</h2>
            <p>{item.productId.description}</p>
            <p>Price: ${item.productId.price}</p>
          </div>
        ))
      ) : (
        <p>No items in your wishlist</p>
      )}
    </div>
  );
};

export default WishlistPage;
