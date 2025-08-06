// Wishlist.jsx
// Displays the user's wishlist with summary and product list

import React from 'react';
// Styles
import '../styles/wishlist.scss';
// Contexts
import { useWishlist } from '../context/WishlistContext';
// Components
import Product from '../components/Product';
// Routing
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  // Get wishlist state and remove function from context
  const { wishlist, removeFromWishlist } = useWishlist();
  // Navigation hook
  const navigate = useNavigate();

  return (
    <div className="wishlist-container">
      {/* If wishlist is empty, show message */}
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          No items in wishlist.<br />
          <button
            className="wishlist-empty-btn"
            onClick={() => navigate('/')}
          >
            Add your favourite product
          </button>
        </div>
      ) : (
        <>
          {/* Wishlist summary section */}
          <div className="wishlist-summary">
            <button className="wishlist-back-btn" onClick={() => window.history.back()}>&larr; Back</button>
            <span>Total items: {wishlist.length}</span>
            <span>
              Total amount: ₹
              {wishlist.reduce((sum, item) => sum + (item.price || 0), 0)}
            </span>
            <button className="wishlist-checkout-btn">Buy Now</button>
          </div>
          {/* Wishlist items list */}
          <div className="wishlist-product-list">
            {wishlist.map(item => (
              <Product key={item.id} {...item} className="wishlist-product-card" showDescription={false} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
