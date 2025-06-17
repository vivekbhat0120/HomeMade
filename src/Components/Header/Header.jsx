import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
// import "../../Styles/Theme_one/Header.scss";
// import "../../Styles/Theme_one/Variable.scss";
import Nav from "../Navbar/NavBar";
import Logo from "../../assets/images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import Select from "../Selectdrop/SelectDrop";

import iconCompare from "../../assets/images/compare.svg";
import iconFavorite from "../../assets/images/fav.svg";
import iconCart from "../../assets/images/cart.svg";
import iconAccount from "../../assets/images/account.svg";

import Button from "@mui/material/Button";
import UserIcon from "@mui/icons-material/PersonOutlineOutlined";
import OrderIcon from "@mui/icons-material/LocalMallOutlined";
import VoucherIcon from "@mui/icons-material/LocalOfferOutlined";
import SettingIcon from "@mui/icons-material/TuneOutlined";
import LoginIcon from '@mui/icons-material/Login';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Badge from '@mui/material/Badge'; // Import MUI Badge
import { useCart } from "../CartContext/CartContext"; // Corrected path
import { useWishlist } from "../WishlistContext/WishlistContext"; // Import Wishlist Context


const Header = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef();
  const { cartItems } = useCart(); // Get cartItems from context
  const { wishlistItems } = useWishlist(); // Get wishlistItems from context
  const navigate = useNavigate(); // Initialize useNavigate

  const [categories] = useState([
    "All Categories",
    "Fashion",
    "Electronics",
    "Bags",
    "Footwear",
    "Groceries",
    "Beauty",
    "Wellness",
    "Jewelry",
    "Other",
  ]);

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const wishlistItemCount = wishlistItems.length; // Get the count of wishlist items

  const handleOrdersClick = () => {
    navigate('/order');
  };

  return (
    <>
      <div className="headerWrapper" ref={headerRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              {/* Mobile Menu Button */}
              <div className="d-lg-none col-2 d-flex align-items-center">
                <Button onClick={() => setMobileMenuOpen(true)}>
                  <MenuIcon />
                </Button>
              </div>

              {/* Logo Section */}
              <div className="col-lg-2 col-8">
                <img src={Logo} alt="Website Logo" className="logo" />
              </div>

              {/* Search Section */}
              <div className="col-lg-5 d-none d-lg-block">
                <div className="headerSearch d-flex align-items-center">
                  <Select data={categories} />
                  <div className="searchBox">
                    <input type="text" placeholder="Search for items..." />
                    <SearchIcon className="searchIcon cursor" />
                  </div>
                </div>
              </div>

              {/* Header Icons Section */}
              <div className="col-lg-5 col-2 d-flex align-items-center">
                <div className="ml-auto">
                  <ul className="list list-inline mb-0 headerTabs">
                    <li className="list-inline-item">
                      <span className="d-flex align-items-center">
                        <img src={iconCompare} alt="Compare" />
                        <span className="icon-label d-none d-lg-inline">
                          Compare
                        </span>
                      </span>
                    </li>
                    <li className="list-inline-item" onClick={() => navigate('/WishList')} style={{ cursor: 'pointer' }}> {/* Add navigation */}
                      <span className="d-flex align-items-center">
                        <Badge badgeContent={wishlistItemCount} color="error"> {/* Add Badge */}
                          <img src={iconFavorite} alt="Wishlist" />
                        </Badge>
                        <span className="icon-label d-none d-lg-inline" style={{ marginLeft: '8px' }}> {/* Add margin for spacing */}
                          Wishlist
                        </span>
                      </span>
                    </li>
                    <li className="list-inline-item">
                        <span className="d-flex align-items-center" onClick={() => navigate('/add-to-cart')} style={{ cursor: 'pointer' }}>
                          <Badge badgeContent={cartItemCount} color="error">
                            <img src={iconCart} alt="Cart" />
                          </Badge>
                         <span className="icon-label d-none d-lg-inline" style={{ marginLeft: '8px' }}>
                               Cart
                          </span>
                         </span>
                    </li>
                    <ClickAwayListener
                      onClickAway={() => setIsOpenDropDown(false)}
                    >
                      <li className="list-inline-item position-relative">
                        <span
                          className="d-flex align-items-center"
                          onClick={() => setIsOpenDropDown((prev) => !prev)}
                        >
                          <img src={iconAccount} alt="Account" />
                          <span className="icon-label d-none d-lg-inline">
                            Account
                          </span>
                        </span>
                        {isOpenDropDown && (
                          <ul className="subMenu">
                            <li>
                              <Button 
                                className="align-items-center"
                                onClick={() => setIsOpenDropDown(false)}
                              >
                                <UserIcon /> My Account
                              </Button>
                            </li>
                            <li>
                              <Button 
                                onClick={() => {
                                  handleOrdersClick();
                                  setIsOpenDropDown(false);
                                }}
                                className="align-items-center"
                                style={{ width: '100%', justifyContent: 'flex-start' }}
                              >
                                <OrderIcon style={{ marginRight: '8px' }}/> Orders
                              </Button>
                            </li>
                            <li>
                              <Button
                                onClick={() => setIsOpenDropDown(false)}
                              >
                                <VoucherIcon /> Vouchers
                              </Button>
                            </li>
                            <li>
                              <Button
                                onClick={() => setIsOpenDropDown(false)}
                              >
                                <SettingIcon /> Settings
                              </Button>
                            </li>
                            <li>
                              <Button 
                                onClick={() => {
                                  navigate('/login');
                                  setIsOpenDropDown(false);
                                }}
                              >
                                <LoginIcon /> Sign in
                              </Button>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ClickAwayListener>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Regular Navigation for Desktop */}
        <div className="d-none d-lg-block">
          <Nav />
        </div>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          {/* Mobile menu content can be added here if needed */}
        </Drawer>
      </div>
    </>
  );
};

export default Header;
