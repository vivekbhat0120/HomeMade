import React from 'react';
import '../styles/wishlist.scss';
import { useWishlist } from '../context/WishlistContext';
import Product from '../components/Product';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-container">
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">No items in wishlist.</div>
      ) : (
        <>
          <div className="wishlist-summary">
            <button className="wishlist-back-btn" onClick={() => window.history.back()}>&larr; Back</button>
            <span>Total items: {wishlist.length}</span>
            <span>
              Total amount: ₹ 
              {wishlist.reduce((sum, item) => sum + (item.price || 0), 0)}
            </span>
            <button className="wishlist-checkout-btn">Checkout</button>
          </div>
          <div className="wishlist-product-list">
            {wishlist.map(item => (
              <Product key={item.id} {...item} className="wishlist-product-card" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;