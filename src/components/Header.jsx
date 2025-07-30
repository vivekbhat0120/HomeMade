import React from 'react';
import './../styles/header.scss';

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
        {/* Heart (Wishlist) - Modern outlined heart */}
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
      <button className="header__icon" aria-label="Cart"><h2>Cart</h2>
        {/* Shopping Bag (Cart) - Modern bag icon */}
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2l1.5 2h9L18 2"/><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </button>
      <button className="header__icon" aria-label="Account"><h2>Account</h2>
        {/* User Circle (Account) - Modern user icon */}
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="4"/><path d="M6 18c0-2.21 3.58-4 6-4s6 1.79 6 4"/></svg>
      </button>
    </div>
  </header>
);

export default Header;
