import React from 'react';
import './../styles/navbar.scss';

// ===============================
// NAVBAR COMPONENT
// ===============================
const Navbar = () => (
  <nav className="navbar">
    {/* ===== NAVIGATION MENU ===== */}
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
);

export default Navbar;
