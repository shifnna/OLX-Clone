import React from "react";
import Footer from "../../Footer/Footer";
import "./HomePage.css";
import Header from "../../header/header";

const HomePage = () => {
  return (
    <div className="home">
      <Header />
      <main className="home__content">
        <h1>Welcome to OLX Clone</h1>
        <p>Find the best deals near you.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
