import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      // Check if item already exists (wishlist typically doesn't have quantity)
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (!itemExists) {
        // Add the item if it's not already there
        return [...prevItems, product];
      }
      // If it exists, return the previous items without adding
      return prevItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  // Optional: Check if an item is in the wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};