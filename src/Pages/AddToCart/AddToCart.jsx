/* ---------------------------------- Imports ---------------------------------- */
import React, { useState } from 'react';
import { useCart } from '../../Components/CartContext/CartContext';
import { Link } from 'react-router-dom';
// Material UI Imports
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CartIcon from '../../assets/images/Icons/cart.png';


const AddToCart = () => {
  /* ---------------------------------- State & Hooks ---------------------------------- */
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [pincode, setPincode] = useState('');
  const [showPincodeInput, setShowPincodeInput] = useState(false);

  /* ---------------------------------- Helper Functions ---------------------------------- */
  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 6) {
      setPincode(value);
    }
  };

  // Add helper function for price formatting
  const formatPrice = (price) => {
    return price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
  };

  /* ---------------------------------- Empty Cart View ---------------------------------- */
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <img src={CartIcon} alt="Empty Cart" className="empty-cart-image" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn btn-primary">Add Now</Link>
      </div>
    );
  }

  /* ---------------------------------- Price Calculations ---------------------------------- */
  // Calculate total amount and discounts
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const actualItemDiscountsTotal = cartItems.reduce((total, item) => {
    if (item.oldprice && item.oldprice > item.price) {
      return total + (item.oldprice - item.price) * item.quantity;
    }
    return total;
  }, 0);

  // Calculate additional charges and final amounts
  const deliveryCharge = totalAmount > 500 ? 0 : 40;
  const platformFee = 5;
  const finalAmount = totalAmount + deliveryCharge + platformFee; // Final amount is sum of item prices + charges
  const totalSavingsOnOrder = actualItemDiscountsTotal - platformFee; // Total savings from item discounts minus platform fee

  /* ---------------------------------- Main Render ---------------------------------- */
  return (
    <div className="cart-page">
      <div className="cart-header">
        {/* Header Section */}
        <h2>your cart</h2>
        
        {/* Navigation Buttons */}
        <div className="cart-header-buttons">
          <Link to="/">
            <Button variant="contained" className="shop-more-button" startIcon={<ArrowBackIcon />}>
              Shop More
            </Button>
          </Link>
          <Button 
            variant="outlined" 
            className="pincode-button"
            onClick={() => setShowPincodeInput(!showPincodeInput)}
          >
            Enter Delivery Pincode
          </Button>
        </div>
      </div>
      
      {/* Pincode Input Section */}
      {showPincodeInput && (
        <div className="pincode-input-wrapper">
          <input
            type="text"
            value={pincode}
            onChange={handlePincodeChange}
            placeholder="Enter your pincode"
            maxLength="6"
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <Button 
            variant="contained" 
            onClick={() => {/* Handle pincode check logic */}}
            disabled={pincode.length !== 6}
          >
            Check
          </Button>
        </div>
      )}
      
      <div className="cart-container">
        {/* Cart Items List */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              {(item => {
                const showDiscount = item.oldprice && item.oldprice > item.price;
                let itemDiscountPercentage = 0;
                if (showDiscount) {
                  itemDiscountPercentage = Math.round(((item.oldprice - item.price) / item.oldprice) * 100);
                }

                return (
                  <div className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-price">
                        <span className="new-price">₹{formatPrice(item.price)}</span>
                        {showDiscount && (
                          <>
                            <span className="old-price">₹{formatPrice(item.oldprice)}</span>
                            <span className="discount-tag">{itemDiscountPercentage}% off</span>
                          </>
                        )}
                      </p>
                      <div className="cart-item-quantity">
                        <Button size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}><RemoveIcon fontSize="small" /></Button>
                        <span className="cart-item-quantity-value">{item.quantity}</span>
                        <Button size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></Button>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <p className="cart-item-subtotal">Subtotal: Rs.{formatPrice(item.price * item.quantity)}</p>
                      <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)} startIcon={<DeleteIcon />} className="remove-button">
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })(item)}
            </React.Fragment>
          ))}
        </div>
        
        {/* Price Summary Section */}
        <div className="cart-summary">
          <h3>Price Details</h3>
          <div className="price-details">
            <div className="price-item">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{formatPrice(totalAmount)}</span>
            </div>
            <div className="price-item discount">
              <span>Discount</span>
              <span>- ₹{formatPrice(actualItemDiscountsTotal)}</span>
            </div>
            <div className="price-item platform-fee">
              <span>Platform Fee</span>
              <span>₹{formatPrice(platformFee)}</span>
            </div>
            <div className="price-item delivery-charge">
              <span>Delivery Charges</span>
              <span>{deliveryCharge === 0 ? 'FREE' : `₹${formatPrice(deliveryCharge)}`}</span>
            </div>
            <div className="price-item total-amount">
              <span>Total Amount</span>
              <span>₹{formatPrice(finalAmount)}</span>
            </div>
            <div className="price-item savings">
              You will save ₹{formatPrice(totalSavingsOnOrder)} on this order
            </div>
          </div>
          <Button variant="contained" className="proceed-to-checkout">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;