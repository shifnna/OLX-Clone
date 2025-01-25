// import React from "react";
// import "./Banner.css";
// import banner1 from '../../assets/banner1.png'
// import banner2 from '../../assets/banner2.png'


// const Banner = ({ title }) => {
//   return (
//     <div className="banner">
//       <img src={banner1} alt="Banner" className="banner__image" />
//       {title && <h1 className="banner__title">{title}</h1>}
//     </div>
//   );
// };

// export default Banner;

import React, { useState, useEffect } from "react";
import "./Banner.css";
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';

const Banner = ({ title }) => {
  const [currentBanner, setCurrentBanner] = useState(banner1);

  useEffect(() => {
    const banners = [banner1, banner2];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % banners.length;
      setCurrentBanner(banners[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <img src={currentBanner} alt="Banner" className="banner__image" />
      {title && <h1 className="banner__title">{title}</h1>}
    </div>
  );
};

export default Banner;
