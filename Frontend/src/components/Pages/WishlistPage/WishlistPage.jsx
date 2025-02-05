import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../App";
import ProductCard from "../../ProductCard/ProductCard"
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";


const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user,isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isLoggedIn || !user?.id) {
        console.error("User ID is missing in URL");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/wishlist/${user.id}`);
        setWishlist(response.data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [isLoggedIn,user?.id]);

  return (
    <div>
       <Header/>
      <h2>Your Wishlist</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <ProductCard key={item.productId._id} product={item.productId} isWishlisted={true} />
          ))
        ) : (
          <p>No items in your wishlist</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default WishlistPage;
