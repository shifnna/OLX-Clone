import React from "react";
import "./Banner.css";
import banner from '../../assets/banner.png'

const Banner = ({ title }) => {
  return (
    <div className="banner">
      <img src={banner} alt="Banner" className="banner__image" />
      {title && <h1 className="banner__title">{title}</h1>}
    </div>
  );
};

export default Banner;
