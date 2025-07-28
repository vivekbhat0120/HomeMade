import React from 'react';
import './Header.scss';

const Header = () => (
  <header className="header">
    <div className="header__logo">
      <img src="/src/assets/images/logo.png" alt="Logo" />
    </div>
    <form className="header__search">
      <input type="text" placeholder="Search products..." />
      <button type="submit" aria-label="Search">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
    </form>
    <div className="header__actions">
      <button className="header__icon" aria-label="Wishlist"><h2>Wishlist</h2>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21s-6-4.35-9-8.5C-1.5 7.5 3.5 3 7.5 7.5L12 12l4.5-4.5C20.5 3 25.5 7.5 21 12.5c-3 4.15-9 8.5-9 8.5z"/></svg>
      </button>
      <button className="header__icon" aria-label="Cart"><h2>Cart</h2>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      </button>
      <button className="header__icon" aria-label="Account"><h2>Account</h2>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M2 20c0-4 8-6 10-6s10 2 10 6"/></svg>
      </button>
    </div>
  </header>
);

export default Header;
