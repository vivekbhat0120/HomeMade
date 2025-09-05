import React, { useState } from 'react';
import '../styles/navbar.scss';
import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>HomeMade<span>Delights</span></h1>
        </div>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#products" className="nav-link">Products</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About Us</a>
          </li>
          <li className="nav-item">
            <a href="#testimonials" className="nav-link">Testimonials</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>
        
        <div className="navbar-icons">
          <a href="#cart" className="icon-link">
            <FaShoppingCart />
            <span className="cart-count">{totalItems}</span>
          </a>
          <a href="#account" className="icon-link">
            <FaUser />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
