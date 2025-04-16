import React from "react";
import "./Banner.scss";

import Ban1 from "../../assets/images/ban1.png";
import Ban2 from "../../assets/images/ban2.png";
import Ban3 from "../../assets/images/ban3.png";

const Banners = () => {
  return (
    // Banner section containing three banners
    <section className="bannerSection">
      <div className="container-fluid">
        <div className="row">
          {/* First banner */}
          <div className="col">
            <div className="box">
              <img src={Ban1} className="w-100" alt="banner" loading="lazy" />
            </div>
          </div>

          {/* Second banner */}
          <div className="col">
            <div className="box">
              <img src={Ban2} className="w-100" alt="banner" loading="lazy" />
            </div>
          </div>

          {/* Third banner */}
          <div className="col">
            <div className="box">
              <img src={Ban3} className="w-100" alt="banner" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banners;
