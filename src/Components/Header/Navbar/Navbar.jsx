import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import MegaImg from "../../../assets/images/8.png";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to toggle mobile menu

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen); // Toggles the mobile menu state
  };

  return (
    <div className="nav">
      <div className="container-fluid">
        <div className="row">
          {/* Mobile menu toggle button */}
          <button
            className="mobile-menu-toggle d-lg-none"
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </button>

          {/* Category button - Desktop only */}
          <div className="col-lg-2 part1 d-none d-lg-flex">
            <Button className="catTab">
              <AppsOutlinedIcon /> See More
              <KeyboardArrowDownIcon />
            </Button>
            <div className="dropDown_menu">
              <ul>
                <li>
                  <Link to="/">Gaming</Link>
                </li>
                <li>
                  <Link to="/">Mobile Phones</Link>
                </li>
                <li>
                  <Link to="/">Audio & Visual</Link>
                </li>
                <li>
                  <Link to="/">Home Appliances</Link>
                </li>
                <li>
                  <Link to="/">Computers & Peripherals</Link>
                </li>
                <li>
                  <Link to="/">Gym Equipment</Link>
                </li>
                <li>
                  <Link to="/">Yoga & Pilates</Link>
                </li>
                <li>
                  <Link to="/">Outdoor Sports</Link>
                </li>
                <li>
                  <Link to="/">Indoor Games</Link>
                </li>
                <li>
                  <Link to="/">Meat & Seafood</Link>
                </li>
                <li>
                  <Link to="/">Fruits & Vegetables</Link>
                </li>
                <li>
                  <Link to="/">Beverages</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Navigation menu */}
          <div className="col-lg-8 col-12 part2">
            <nav>
              <ul className={`list mb-0 ${mobileMenuOpen ? "show" : ""}`}>
                {/* Home link */}
                <li>
                  <Button>
                    <Link to="/">Home</Link>
                  </Button>
                </li>
                {/* About link */}
                <li>
                  <Button>
                    <Link to="/">About</Link>
                  </Button>
                </li>
                {/* Shop link */}
                <li>
                  <Button>
                    <Link to="/">Shop</Link>
                  </Button>
                </li>
                {/* Vendors link */}
                <li>
                  <Button>
                    <Link to="/">Vendors</Link>
                  </Button>
                </li>

                {/* Mega menu dropdown */}
                <li className="position-static">
                  <Button>
                    <Link to="/">
                      Mega Menu <KeyboardArrowDownIcon />
                    </Link>
                  </Button>
                  <div className="dropDown_menu megaMenu">
                    <div className="row">
                      {/* Electronics & Gadgets category */}
                      <div className="col">
                        <h4>Electronics & Gadgets</h4>
                        <ul>
                          <li>
                            <Link to="">Gaming</Link>
                          </li>
                          <li>
                            <Link to="">Mobile Phones</Link>
                          </li>
                          <li>
                            <Link to="">Audio & Visual</Link>
                          </li>
                          <li>
                            <Link to="">Home Appliances</Link>
                          </li>
                          <li>
                            <Link to="">Computers & Peripherals</Link>
                          </li>
                        </ul>
                      </div>
                      {/* Sports & Outdoors category */}
                      <div className="col">
                        <h4>Sports & Outdoors</h4>
                        <ul>
                          <li>
                            <Link to="">Gym Equipment</Link>
                          </li>
                          <li>
                            <Link to="">Yoga & Pilates</Link>
                          </li>
                          <li>
                            <Link to="">Outdoor Sports</Link>
                          </li>
                          <li>
                            <Link to="">Indoor Games</Link>
                          </li>
                          <li>
                            <Link to="">Other Sports</Link>
                          </li>
                        </ul>
                      </div>
                      {/* Foods & Beverages category */}
                      <div className="col">
                        <h4>Foods & Beverages</h4>
                        <ul>
                          <li>
                            <Link to="">Meat & Seafood</Link>
                          </li>
                          <li>
                            <Link to="">Fruits & Vegetables</Link>
                          </li>
                          <li>
                            <Link to="">Beverages</Link>
                          </li>
                          <li>
                            <Link to="">Other Foods</Link>
                          </li>
                          <li>
                            <Link to="">Other Beverages</Link>
                          </li>
                        </ul>
                      </div>
                      {/* Mega menu image */}
                      <div className="col d-none d-lg-block">
                        <img src={MegaImg} className="w-100" alt="Mega menu" />
                      </div>
                    </div>
                  </div>
                </li>

                {/* Blog link */}
                <li>
                  <Button>
                    <Link to="/">Blog</Link>
                  </Button>
                </li>
                {/* Pages dropdown */}
                <li>
                  <Button>
                    <Link to="/">
                      Pages <KeyboardArrowDownIcon />
                    </Link>
                  </Button>
                  <div className="dropDown_menu">
                    <ul>
                      <li>
                        <Link to="/">
                          <Button>About Us</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <Button>Contact</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <Button>My Account</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/login">
                          <Button>Login</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/register">
                          <Button>Register</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <Button>Reset Password</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <Button>Privacy Policy</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <Button>Terms of Services</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <Button>404 Page</Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Contact link */}
                <li>
                  <Button>
                    <Link to="/">Contact</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Support section - Desktop only */}
          <div className="col-lg-2 part3 d-none d-lg-flex justify-content-end">
            <div className="support">
              <HeadsetMicOutlinedIcon />
              <div className="info">
                <h4>Support</h4>
                <p>24/7 Live Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
