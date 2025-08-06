// src/components/Product.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/product.scss';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Product = ({
  id,
  name,
  price,
  oldPrice,
  rating,
  reviews = [],
  image,
  shortDescription,
  className = '',
  showDescription = true,
}) => {
  // Hooks
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const {
    isInCart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cart,
  } = useCart();

  // Derived values
  const isWished = wishlist.some((item) => item.id === id);
  const inCart = isInCart(id);
  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 1;
  let discount = null;
  if (oldPrice && price && oldPrice > price) {
    discount = Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  // Event handlers
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

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (inCart) {
      removeFromCart(id);
    } else {
      addToCart({ id, name, price, image, shortDescription });
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    decrementQuantity(id);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    incrementQuantity(id);
  };

  // Render
  return (
    <div className={`product-card ${className}`.trim()} onClick={handleClick}>
      {/* Wishlist Icon */}
      <div className="product-wish-topright">
        <span
          className={`product-icon-wish${isWished ? ' wished' : ''}`}
          onClick={handleWishClick}
          title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {/* Heart Icon */}
          {isWished ? (
            <svg width="20" height="20" fill="var(--red-color)" stroke="var(--accent-color)" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          )}
        </span>
      </div>
      {/* Product Image & Rating */}
      <div className="product-image-wrap">
        <img src={image} alt={name} className="product-image" />
      </div>
      {/* Product Info */}
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        {showDescription && <p className="product-description">{shortDescription}</p>}
        <div className="product-rating-info">
          <span className="star filled" >&#9733;</span>
          <span className="product-rating-value">{rating}</span>
          <span className="product-review-count">({reviews.length})</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">₹ {price}</span>
        </div>
        {/* Quantity controls for cart view */}
        {className.includes('cart-product-card') && inCart && (
          <div className="cart-quantity-controls">
            <button
              className="cart-qty-btn"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
              disabled={quantity === 1}
            >
              <span className="qty-symbol">-</span>
            </button>
            <span className="cart-qty-value">{quantity}</span>
            <button
              className="cart-qty-btn"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <span className="qty-symbol">+</span>
            </button>
          </div>
        )}
      </div>
      {/* Old Price & Discount */}
      {oldPrice && (
        <div className="product-oldprice-discount-wrap">
          {discount && <span className="product-discount-badge">{discount}% OFF</span>}
          <span className="product-old-price-bottomleft">₹ {oldPrice}</span>
        </div>
      )}
      {/* Cart Icon */}
      <div className="product-cart-bottomright">
        <span
          className={`product-icon-cart${inCart ? ' in-cart' : ''}`}
          onClick={handleCartClick}
          title={inCart ? 'Remove from Cart' : 'Add to Cart'}
        >
          {/* Cart Icon */}
          {inCart ? (
            <svg width="20" height="20" fill="none" stroke="var(--accent-color)" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 17h7.72a2 2 0 0 0 1.96-1.61L23 6H6" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 17h7.72a2 2 0 0 0 1.96-1.61L23 6H6" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default Product;
