import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';  // Add this import at the top

import { useWishlist } from '../../Components/WishlistContext/WishlistContext'; // Import Wishlist Context
import { useCart } from '../../Components/CartContext/CartContext'; // Import Cart Context

import WishIcon from '../../assets/images/Icons/heart.png';

// Placeholder image if a product doesn't have one
const placeholderImage = "https://via.placeholder.com/150/CCCCCC/FFFFFF?Text=No+Image";

const Wishlist = () => {
  // Use context to get and manage wishlist items
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); // Get addToCart from CartContext

  const [pincode, setPincode] = useState('');
  const [showPincodeInput, setShowPincodeInput] = useState(false);

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

  const handleCheckPincode = () => {
    // Add your pincode check logic here
    console.log('Checking pincode:', pincode);
  };

  const formatPrice = (price) => {
    return price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-wishlist">
          <img src={WishIcon} alt="Empty Wishlist" className="empty-wish-icon" />
          <h2>Your Wishlist</h2>
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
      <div className="container">
        <div className="wish-header">
          <h2>Your Wishlist</h2>
          <div className="wish-header-buttons">
            <Link to="/">
              <Button variant="contained" className="shop-more-button" startIcon={<ArrowBackIcon />}>
                Shop More
              </Button>
            </Link>
            <Link to="/checkout">
              <Button 
                variant="outlined" 
                className="checkout-button"
                endIcon={<ArrowForwardIcon />}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
        <div className="wishlist-container">
          <div className="wishlist-items">
            {wishlistItems.map(item => {
              const showDiscount = item.oldprice && item.oldprice > item.price;
              let itemDiscountPercentage = 0;
              if (showDiscount) {
                itemDiscountPercentage = Math.round(((item.oldprice - item.price) / item.oldprice) * 100);
              }

              return (
                <div key={item.id} className="wishlist-item">
                  <img src={item.image || item.imageUrl || placeholderImage} alt={item.name} className="wishlist-item-image" />
                  <div className="wishlist-item-details">
                    <h4 className="wishlist-item-name">{item.name || 'Unnamed Item'}</h4>
                    <p className="wishlist-item-price">
                      <span className="new-price">₹{formatPrice(item.price)}</span>
                      {showDiscount && (
                        <>
                          <span className="old-price">₹{formatPrice(item.oldprice)}</span>
                          <span className="discount-tag">{itemDiscountPercentage}% off</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="wishlist-item-actions">
                    <Button
                      variant="contained"
                      className="btn-add-to-cart"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => handleRemoveItem(item.id)} 
                      startIcon={<DeleteIcon />}
                      className="remove-button"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;