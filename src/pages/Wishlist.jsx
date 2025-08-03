import React from 'react';
import '../styles/wishlist.scss';
import { useWishlist } from '../context/WishlistContext';
import Product from '../components/Product';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">No items in wishlist.</div>
      ) : (
        <div className="wishlist-product-list">
          {wishlist.map(item => (
            <Product key={item.id} {...item} className="wishlist-product-card" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;