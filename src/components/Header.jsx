import React from 'react';
import Navbar from './Navbar';
import '../styles/header.scss';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="header">
      <h1>Homey</h1>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
};

export default Header;
