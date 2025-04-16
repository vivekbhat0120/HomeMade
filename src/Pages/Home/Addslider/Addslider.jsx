import React from "react";
import Slider from "react-slick"; // This is react-slick's Slider
import "./Addslider.scss";

import Banner1 from "../../../assets/images/bn1.png";
import Banner2 from "../../../assets/images/bn2.png";
import Banner3 from "../../../assets/images/bn3.png";
import Banner4 from "../../../assets/images/bn4.png";
import Banner5 from "../../../assets/images/bn5.png";
import Banner6 from "../../../assets/images/bn6.png";

// Rename your component to avoid conflict (e.g., `HomeSlider`)
const HomeSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <section className="homeSlider">
            <div className="container-fluid">
                {/* Use react-slick's Slider here */}
                <Slider {...settings} className="sliderMain">
                    <div className="sliderItem">
                        <img src={Banner1} alt="Banner1" className="w-100" />
                    </div>
                    <div className="sliderItem">
                        <img src={Banner2} alt="Banner2" className="w-100" />
                    </div>
                    <div className="sliderItem">
                        <img src={Banner3} alt="Banner3" className="w-100" />
                    </div>
                    <div className="sliderItem">
                        <img src={Banner4} alt="Banner4" className="w-100" />
                    </div>
                    <div className="sliderItem">
                        <img src={Banner5} alt="Banner5" className="w-100" />
                    </div>
                    <div className="sliderItem">
                        <img src={Banner6} alt="Banner6" className="w-100" />
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default HomeSlider; // Export the renamed component