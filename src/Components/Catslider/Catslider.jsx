import React from "react";
import "./Catslider.scss";
import Slider from "react-slick";

import Trend1 from "../../assets/images/fashion.png";
import Trend2 from "../../assets/images/electronics.png";
import Trend3 from "../../assets/images/bag.png";
import Trend4 from "../../assets/images/footwear.png";
import Trend5 from "../../assets/images/grocery.png";
import Trend6 from "../../assets/images/beauty.png";
import Trend7 from "../../assets/images/wellness.png";
import Trend8 from "../../assets/images/jewelry.png";


const CatSlider = () => {
  // Slider settings for the carousel
  const settings = {
    dots: false, // Disable navigation dots
    infinite: false, // Disable infinite scrolling
    speed: 500, // Adjust animation speed
    cssEase: "ease", // Standard easing function
    slidesToShow: 8, // Number of slides visible at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: false, // Disable autoplay
    arrows: false, // Enable navigation arrows
  };

  return (
    // Section for the category slider
    <section className="catSliderSection">
      <div className="container-fluid">
        <h3 className="hd">Trending Categories</h3>
        <Slider {...settings} className="catSliderMain">
          {/* Map through the category items and render each */}
          {[
            { img: Trend1, name: "Fashion" },
            { img: Trend2, name: "Electronics" },
            { img: Trend3, name: "Bags" },
            { img: Trend4, name: "Footwear" },
            { img: Trend5, name: "Groceries" },
            { img: Trend6, name: "Beauty" },
            { img: Trend7, name: "Wellness" },
            { img: Trend8, name: "Jewellery" },
          ].map((item, index) => (
            <div className="catSliderItem" key={index}>
              <div className="info">
                <img src={item.img} alt={item.name} loading="lazy" />
                <h5>{item.name}</h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CatSlider;
