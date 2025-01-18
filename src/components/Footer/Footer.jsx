// Footer.js
import React from "react";
import "./Footer.css";
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__column">
          <h4>POPULAR LOCATIONS</h4>
          <ul>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>TRENDING LOCATIONS</h4>
          <ul>
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>ABOUT US</h4>
          <ul>
            <li>Tech@OLX</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>OLX</h4>
          <ul>
            <li>Blog</li>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy information</li>
            <li>Vulnerability Disclosure Program</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>FOLLOW US</h4>
          <div className="footer__social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
          <div className="footer__apps">
            <img src="google-play.png" alt="Google Play" />
            <img src="app-store.png" alt="App Store" />
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__brands">
          <img src={facebook_icon} alt="CarTrade" />
          <img src={instagram_icon} alt="OLX" />
          <img src={twitter_icon} alt="CarWale" />
          <img src={youtube_icon} alt="BikeWale" />
        </div>
        <p>Help - Sitemap</p>
        <p>All rights reserved © 2006-2025 OLX</p>
      </div>
    </footer>
  );
};

export default Footer;
