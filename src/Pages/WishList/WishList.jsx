import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For the "Shop Now" button

import { useWishlist } from '../../Components/WishlistContext/WishlistContext'; // Import Wishlist Context
import { useCart } from '../../Components/CartContext/CartContext'; // Import Cart Context


// Placeholder image if a product doesn't have one
const placeholderImage = "https://via.placeholder.com/150/CCCCCC/FFFFFF?Text=No+Image";

const Wishlist = () => {
  // Use context to get and manage wishlist items
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); // Get addToCart from CartContext

  // Simulate fetching wishlist items
  useEffect(() => {
    // Simulate API call or loading from global state
    // For now, we'll use mock data.
    // To test the empty state, set initialMockWishlistItems to []
    // The context now manages the state, so we don't need local state or mock data here.
    // If you were fetching from an API, you would call addToWishlist for each item fetched.
  }, []);

  const handleRemoveItem = (itemId) => {
    console.log(`Removing item ${itemId} from wishlist`);
    removeFromWishlist(itemId); // Use context function
  };

  const handleAddToCart = (item) => {
    console.log(`Adding item ${item.name} to cart`);
    // The item structure might need adjustment depending on what addToCart expects
    // Assuming item has id, name, price, image properties like the cart items
    addToCart(item); // Use context function
    // Optionally, remove from wishlist after adding to cart
    // removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-wishlist">
          <h2>My Wishlist</h2>
          <p>Your wishlist is currently empty.</p>
          <p>Add items you love to your wishlist to keep track of them!</p>
          <Link to="/" className="shop-now-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <img src={item.imageUrl || placeholderImage} alt={item.name} />
            <div className="item-details">
              <h4>{item.name || 'Unnamed Item'}</h4> {/* Add fallback for name */}
              <p className="price">{item.price}</p>
            </div>
            <div className="actions">
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;