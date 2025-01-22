import React, { useState,useContext }  from "react";
import Footer from "../../Footer/Footer";
import Header from "../../header/header";
import ProductCard from "../../ProductCard/ProductCard";
import "./HomePage.css";
import Banner from "../../Header/banner";
import LoginPageModal from "./LoginPageModal";
import { AuthContext } from '../../../App';

const HomePage = () => {

  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const handleSellClick = () => {
    if (isLoggedIn) {
      window.location.href = "/SellProduct"; // Redirect to Add Product page
    } else {
      setShowModal(true); // Show the login modal
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const products = [
    { id: 1, image: "image1.jpg", title: "3 Bds - 3 Ba - 250 ft2", price: "47,00,000" },
    { id: 2, image: "image2.jpg", title: "3 spoke steering wheel", price: "2,500" },
    { id: 3, image: "image3.jpg", title: "iPhone in good condition", price: "16,999" },
    { id: 4, image: "image4.jpg", title: "Brand new phone", price: "28,000" },
    
  ];

  return (
    <div className="home">
  <Header onSellClick={handleSellClick} />
  <Banner />
  <main className={`home__content ${showModal ? "blurred" : ""}`}>
    <div className="home__products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </main>
  {showModal && <LoginPageModal onClose={closeModal} />} {/* Modal is outside main */}
  <Footer />
</div>

  );
};

export default HomePage;