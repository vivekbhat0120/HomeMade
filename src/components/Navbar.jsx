import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../styles/navbar.scss';
import { useCart } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const { cart } = useCart();
  const { wishlist } = useContext(WishlistContext);
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="search-container"> 
        <FaSearch className="search-icon" /> 
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <ul className="nav-links">
        <li className={isActive('/')}><Link to="/">Home</Link></li>
        <li className={isActive('/cart')}>
          <Link to="/cart">Cart {cart.length > 0 && <span className="item-count">({cart.length})</span>}</Link>
        </li>
        <li className={isActive('/wishlist')}>
          <Link to="/wishlist">Wishlist {wishlist.length > 0 && <span className="item-count">({wishlist.length})</span>}</Link>
        </li>
        <li className={isActive('/contact')}><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
