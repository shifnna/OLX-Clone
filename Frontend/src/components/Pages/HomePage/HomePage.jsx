import React, { useState, useEffect, useContext } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import ProductCard from "../../ProductCard/ProductCard";
import "./HomePage.css";
import Banner from "../../Header/banner";
import LoginPageModal from "./LoginPageModal";
import { AuthContext } from '../../../App';
import axios from "axios"; 

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn,user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {      
      try {
        const response = await axios.get('http://localhost:5000/products',{
          params: { search: searchTerm }, 
        }); 
        console.log("User details:", user); 

        console.log('Fetched Products:', response.data); 
        setProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm]);// Refetch products when the search term changes


  // useEffect(() => {
  //   if (isLoggedIn && user) {
  //     const fetchWishlist = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:5000/wishlist/${user._id}`
  //         );
  //         setWishlist(response.data.wishlist);
  //       } catch (error) {
  //         console.error("Error fetching wishlist:", error);
  //       }
  //     };

  //     fetchWishlist();
  //   }
  // }, [isLoggedIn, user]); // Fetch wishlist only when user is logged in



  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const handleSellClick = () => {
    if (isLoggedIn) {
      window.location.href = "/SellProduct"; 
    } else {
      setShowModal(true); 
    }
  };
  
  const handleWishClick = () => {
    if (isLoggedIn) {
      console.log(user);
      window.location.href = `/wishlist/${user._id}`;
    } else {
      setShowModal(true);
    }
  };  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home">
      <Header onWishClick={handleWishClick} onSellClick={handleSellClick} searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Banner />
      <main className={`home__content ${showModal ? "blurred" : ""}`}>
        <div className="home__products">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard 
              key={product._id} 
              product={product} 
              showLoginModal={showModal} 
              setShowLoginModal={setShowModal}
              isWishlisted={wishlist.includes(product._id)}
               /> 
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </main>
      {showModal && <LoginPageModal onClose={() => setShowModal(false)} />}
      <Footer />
    </div>
  );
};

export default HomePage;
