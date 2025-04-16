import React from "react";
import "./Footer.scss";

import Ft1 from "../../assets/images/offer.png";
import Ft2 from "../../assets/images/delivery.png";
import Ft3 from "../../assets/images/deal.png";
import Ft4 from "../../assets/images/collecting.png";
import Ft5 from "../../assets/images/return.png";

import Logo from "../../assets/images/logo.png";
import apple from "../../assets/images/apple.png";
import google from "../../assets/images/google.png";
import Payment from "../../assets/images/payment.png";
import { Link } from "react-router-dom";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <div className="footerWrapper">
      {/* Footer icons section */}
      <div className="footerBoxes">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={Ft1} />
                </span>
                <div className="info">
                  <h5>Best Prices & Offers</h5>
                  <p>Shop Smart, Save Big!</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={Ft2} />
                </span>
                <div className="info">
                  <h5>Free Delivery</h5>
                  <p>Free delivery, easy & fast</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={Ft3} />
                </span>
                <div className="info">
                  <h5>Great Daily Deals</h5>
                  <p>Great Deals, EveryDay!</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={Ft4} />
                </span>
                <div className="info">
                  <h5>Wide Collections</h5>
                  <p>Wide range, Right fit</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="box d-flex align-items-center w-100">
                <span>
                  <img src={Ft5} />
                </span>
                <div className="info">
                  <h5>Easy Returns</h5>
                  <p>Pick Freely, Return Easily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer main section */}
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 part1">
              <Link to="/">
                <img src={Logo} className="footerLogo w-100" />
              </Link>
              <p className="tagline">Everything You Need, All in One Place</p>
              <p className="text">
                <LocationOnIcon />
                <span className="Label">Address:</span> Akshya Nagar 1st Block
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rammurthy nagar, Bangalore-560016
              </p>
              <p className="text">
                <CallIcon />
                <span className="Label">Call Us:</span> +91 9876543210
              </p>
              <p className="text">
                <EmailIcon />
                <span className="Label">Email:</span> google@example.com
              </p>
              <p className="text">
                <WatchLaterIcon />
                <span className="Label">Hours:</span> 09:00 - 18:00 (Mon - Sat)
              </p>
            </div>
            <div className="col-md-6 part2">
              <div className="row">
                <div className="col">
                  <h5>Company</h5>
                  <ul className="footer-list">
                    <li>
                      <Link to="#">About Us</Link>
                    </li>
                    <li>
                      <Link to="#">Delivery Information</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link to="#">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="#">Support Center</Link>
                    </li>
                    <li>
                      <Link to="#">Career Page</Link>
                    </li>
                  </ul>
                </div>

                <div className="col">
                  <h5>Account</h5>
                  <ul className="footer-list">
                    <li>
                      <Link to="#">Sign In</Link>
                    </li>
                    <li>
                      <Link to="#">View Cart</Link>
                    </li>
                    <li>
                      <Link to="#">My Wishlist</Link>
                    </li>
                    <li>
                      <Link to="#">Track My Order</Link>
                    </li>
                    <li>
                      <Link to="#">Track Complaint</Link>
                    </li>
                    <li>
                      <Link to="#">Shipping Details</Link>
                    </li>
                    <li>
                      <Link to="#">Compare Product</Link>
                    </li>
                  </ul>
                </div>

                <div className="col">
                  <h5>Corporate</h5>
                  <ul className="footer-list">
                    <li>
                      <Link to="#">Become a Vendor</Link>
                    </li>
                    <li>
                      <Link to="#">Offline Stores</Link>
                    </li>
                    <li>
                      <Link to="#">Brands & Partners</Link>
                    </li>
                    <li>
                      <Link to="#">Our Sellers</Link>
                    </li>
                    <li>
                      <Link to="#">Upcoming Projects</Link>
                    </li>
                    <li>
                      <Link to="#">Accessibility</Link>
                    </li>
                    <li>
                      <Link to="#">Promotions</Link>
                    </li>
                  </ul>
                </div>

                <div className="col">
                  <h5>Popular</h5>
                  <ul className="footer-list">
                    <li>
                      <Link to="#">Electronics</Link>
                    </li>
                    <li>
                      <Link to="#">Beauty & Fashion</Link>
                    </li>
                    <li>
                      <Link to="#">Food & Grocery</Link>
                    </li>
                    <li>
                      <Link to="#">Health Care</Link>
                    </li>
                    <li>
                      <Link to="#">Home & Living</Link>
                    </li>
                    <li>
                      <Link to="#">Kids & Babies</Link>
                    </li>
                    <li>
                      <Link to="#">Toys & Games</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-3 part3">
              <h5>Install App</h5>
              <p>From App Store or Google Play</p>

              <div className="d-flex align-items-center">
                <Link to="#">
                  <img src={apple} className="store mx-2" />
                </Link>
                <Link to="#">
                  <img src={google} className="store" />
                </Link>
              </div>

              <div className="payment">
                <p>Secured Payment Gateways</p>
                <Link to="#">
                  <img src={Payment} className="payImg" />
                </Link>
              </div>
            </div>
          </div>

          <hr />

          {/* Social media links */}
          <div className="row copyRight">
            <div className="col-md-4">
              <p>
                Copyright © 2025 All Rights Reserved | Made by Vivek
              </p>
            </div>

            <div className="col-md-8 social">
              <div className="d-flex align-items-center justify-content-end">
                <h6>Follow Us</h6>
                <ul className="list list-inline">
                  <li className="list-inline-item">
                    <Link to="#">
                      <FacebookIcon />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#">
                      <InstagramIcon />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#">
                      <PinterestIcon />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#">
                      <YouTubeIcon />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;