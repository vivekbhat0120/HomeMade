import React from "react";
import HomeSlider from "./Addslider/Addslider.jsx"; // Renamed import for custom slider
import Slider from "react-slick"; // For product carousels
import CatSlider from "../../Components/Catslider/Catslider.jsx"; // Ensure this path is correct
import Banners from "../../Components/Banners/Banner.jsx";
import Product from "../../Components/Product/Product.jsx";
import Banner4 from "../../assets/images/ban4.png";
import TopProducts from "./Topproducts/Topproducts.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./Home.scss";

const Home = () => {
  // Settings for product carousel
  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="home-page">
      {/* Main Banner Slider */}
      <HomeSlider />

      {/* Category Slider */}
      <CatSlider />

      {/* Promotional Banners */}
      <Banners />

      {/* Popular Products Section */}
      <section className="home-product-section">
        <div className="container-fluid">
          <div className="section-header">
            <h3 className="section-title">Popular Products</h3>
            <ul className="category-filter">
              <li><button>Fashion</button></li>
              <li><button>Electronics</button></li>
              <li><button>Bags</button></li>
              <li><button>Footwear</button></li>
              <li><button>Groceries</button></li>
              <li><button>Beauty</button></li>
              <li><button>Wellness</button></li>
              <li><button>Jewellery</button></li>
            </ul>
          </div>

          <div className="product-grid">
            {[...Array(10)].map((_, i) => (
              <div className="col-lg-2 col-md-3 col-sm-4 col-6" key={i}>
                <Product 
                  tag={["Hot", "Sale", "New", "Best"][i % 4]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Best Sells Section */}
      <section className="daily-best-sells">
        <div className="container-fluid">
          <div className="section-header">
            <h3 className="section-title">Daily Best Sells</h3>
            <ul className="category-filter">
              <li><button>Featured</button></li>
              <li><button>Popular</button></li>
              <li><button>New added</button></li>
            </ul>
          </div>

          <div className="row align-items-center">
            <div className="daily-banner col-lg-3 col-md-4">
              <img src={Banner4} alt="Daily deals" className="img-fluid rounded" />
            </div>
            <div className="col-lg-9 col-md-8">
              <Slider {...productSliderSettings} className="daily-best-slider">
                {[...Array(6)].map((_, i) => (
                  <Product 
                    key={i}
                    tag={["Best", "Sale", "Hot", "New"][i % 4]}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products Sections */}
      <section className="top-products-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <TopProducts title="Top Selling" />
            </div>
            <div className="col-lg-3 col-md-6">
              <TopProducts title="Top Rated" />
            </div>
            <div className="col-lg-3 col-md-6">
              <TopProducts title="Recently Added" />
            </div>
            <div className="col-lg-3 col-md-6">
              <TopProducts title="Trending Products" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;