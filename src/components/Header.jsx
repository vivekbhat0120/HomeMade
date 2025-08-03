import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/header.scss';
import { useWishlist } from '../context/WishlistContext';

const Header = ({ searchQuery, setSearchQuery }) => {
  const { wishlist } = useWishlist();

  return (
    <header className="header">
      <div className="header__logo">
        <img src="/src/assets/images/logo.png" alt="Logo" />
      </div>
      <form className="header__search" onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button type="submit" aria-label="Search">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </form>
      <div className="header__actions">
        <Link to="/wishlist" className="header__icon" aria-label="Wishlist" style={{ position: 'relative' }}>
          <h2>Wishlist</h2>
          <span style={{position: 'relative', display: 'inline-block'}}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            {wishlist.length > 0 && (
              <span className="wishlist-count-badge">{wishlist.length}</span>
            )}
          </span>
        </Link>
        <Link to="/cart" className="header__icon" aria-label="Cart">
          <h2>Cart</h2>
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="7" cy="20" r="2"/>
            <circle cx="17" cy="20" r="2"/>
            <path d="M7 18h10V6H7v12zm0-14h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
          </svg>
        </Link>
        <button className="header__icon" aria-label="Account"><h2>Account</h2>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="4"/><path d="M6 18c0-2.21 3.58-4 6-4s6 1.79 6 4"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;