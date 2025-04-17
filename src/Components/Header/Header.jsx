import React, { useState, useRef } from "react";
import "../Header/Header.scss";
import "../../styles/_variables.scss";
import Nav from "./Navbar/Navbar";
import Logo from "../../assets/images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import Select from "../Selectdrop/Selectdrop";

import iconCompare from "../../assets/images/compare.svg";
import iconFavorite from "../../assets/images/fav.svg";
import iconCart from "../../assets/images/cart.svg";
import iconAccount from "../../assets/images/account.svg";

import Button from "@mui/material/Button";
import UserIcon from "@mui/icons-material/PersonOutlineOutlined";
import OrderIcon from "@mui/icons-material/LocalMallOutlined";
import VoucherIcon from "@mui/icons-material/LocalOfferOutlined";
import SettingIcon from "@mui/icons-material/TuneOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

const Header = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef();

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
                    <li className="list-inline-item">
                      <span className="d-flex align-items-center">
                        <img src={iconFavorite} alt="Wishlist" />
                        <span className="icon-label d-none d-lg-inline">
                          Wishlist
                        </span>
                      </span>
                    </li>
                    <li className="list-inline-item">
                      <span className="d-flex align-items-center">
                        <img src={iconCart} alt="Cart" />
                        <span className="icon-label d-none d-lg-inline">
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
                              <Button className="align-items-center">
                                <UserIcon /> My Account
                              </Button>
                            </li>
                            <li>
                              <Button>
                                <OrderIcon /> Orders
                              </Button>
                            </li>
                            <li>
                              <Button>
                                <VoucherIcon /> Vouchers
                              </Button>
                            </li>
                            <li>
                              <Button>
                                <SettingIcon /> Settings
                              </Button>
                            </li>
                            <li>
                              <Button>
                                <LogoutIcon /> Sign out
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
