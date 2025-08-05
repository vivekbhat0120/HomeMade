import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './../styles/header.scss';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Header = ({ searchQuery, setSearchQuery }) => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const location = useLocation();

  // Determine if the current path matches wishlist, cart, or account
  const isWishlist = location.pathname === '/wishlist';
  const isCart = location.pathname === '/cart';
  const isAccount = location.pathname === '/account';

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
        <Link to="/wishlist" className={`header__icon header__icon--wishlist${isWishlist ? ' active' : ''}`} aria-label="Wishlist" style={{ position: 'relative' }}>
          <h2>Wishlist</h2>
          <span style={{position: 'relative', display: 'inline-block'}}>
            <svg width="22" height="22" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            {wishlist.length > 0 && (
              <span className="wishlist-count-badge">{wishlist.length}</span>
            )}
          </span>
        </Link>
        <Link to="/cart" className={`header__icon header__icon--cart${isCart ? ' active' : ''}`} aria-label="Cart" style={{ position: 'relative' }}>
          <h2>Cart</h2>
          <span style={{position: 'relative', display: 'inline-block'}}>
            <svg width="22" height="22" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 17h7.72a2 2 0 0 0 1.96-1.61L23 6H6"/>
            </svg>
            {cart.length > 0 && (
              <span className="cart-count-badge">{cart.length}</span>
            )}
          </span>
        </Link>
        <button className={`header__icon header__icon--account${isAccount ? ' active' : ''}`} aria-label="Account"><h2>Account</h2>
          <svg width="22" height="22" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
            <path d="M4 20c0-2.67 5.33-4 8-4s8 1.33 8 4"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;