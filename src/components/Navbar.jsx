import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="navbar">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
