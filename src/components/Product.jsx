// src/components/Product.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/product.scss';
import { useWishlist } from '../context/WishlistContext';

const Product = ({ id, name, price, image, shortDescription, className = '' }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isWished = wishlist.some(item => item.id === id);

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleWishClick = (e) => {
    e.stopPropagation();
    if (isWished) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, shortDescription });
    }
  };

  return (
    <div className={`product-card ${className}`.trim()} onClick={handleClick}>
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{shortDescription}</p>
        <div className="product-price-row">
          <span
            className={`product-icon-wish${isWished ? ' wished' : ''}`}
            onClick={handleWishClick}
            title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {/* Heart Icon */}
            {isWished ? (
              <svg width="20" height="20" fill="var(--accent-color)" stroke="var(--accent-color)" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            )}
          </span>
          <span className="product-price">₹ {price}</span>
          <span className="product-icon-cart" onClick={e => e.stopPropagation()} title="Add to Cart">
            {/* Cart Icon */}
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="7" cy="20" r="2"/>
              <circle cx="17" cy="20" r="2"/>
              <path d="M7 18h10V6H7v12zm0-14h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
