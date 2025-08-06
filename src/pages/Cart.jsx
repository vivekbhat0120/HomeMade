// Cart.jsx
// Displays the user's shopping cart with summary and product list

import React from 'react';
// Styles
import '../styles/cart.scss';
// Contexts
import { useCart } from '../context/CartContext';
// Routing
import { useNavigate } from 'react-router-dom';
// Components
import Product from '../components/Product';

const Cart = () => {
  // Get cart state and remove function from context
  const { cart, removeFromCart } = useCart();
  // Calculate total products, total quantity and total price
  const totalProducts = cart.length;
  const totalQuantity = cart.reduce((sum, product) => sum + (product.quantity || 1), 0);
  const totalPrice = cart.reduce((sum, product) => sum + Number(product.price) * (product.quantity || 1), 0);
  // Navigation hook
  const navigate = useNavigate();

  // Platform fee
  const platformFee = 49;
  // Delivery charge logic: ₹79 if totalPrice < 500, else free
  const deliveryCharge = totalPrice > 0 && totalPrice < 500 ? 79 : 0;
  // Discount: sum of (old price - new price) for all products
  const totalOldPrice = cart.reduce((sum, product) => sum + Number(product.oldPrice || product.price) * (product.quantity || 1), 0);
  const discount = totalOldPrice - totalPrice;
  const coupon = Math.round(totalPrice * 0.05);
  // Final total
  const totalAmount = totalPrice - discount - coupon + platformFee + deliveryCharge;

  return (
    <div className="cart-container">
      {/* If cart is empty, show message */}
      {cart.length === 0 ? (
        <div className="cart-empty">
          Your cart is empty.<br />
          <button
            className="cart-empty-btn"
            onClick={() => navigate('/')}
          >
            Add products to cart
          </button>
        </div>
      ) : (
        <>
          {/* Cart summary section */}
          <div className="cart-summary">
            <button className="cart-summary-btn back-btn" onClick={() => navigate(-1)}>
              &#8592; Back
            </button>
            <span>Total Products: <strong>{totalProducts}</strong></span>
            <span>Total Quantity: <strong>{totalQuantity}</strong></span>
            <span>Total Price: <strong>₹ {totalPrice}</strong></span>
            <button className="cart-summary-btn buy-btn">
              Buy Now
            </button>
          </div>
          {/* Cart main content: items and summary */}
          <div className="cart-main-content">
            {/* Cart items list */}
            <div className="cart-items">
              {cart.map(product => (
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  shortDescription={product.shortDescription}
                  className="cart-product-card"
                  showDescription={false}
                />
              ))}
            </div>
            {/* Product Summary */}
            <div className="cart-summary-box">
              <h2>Product Summary</h2>
              <div className="summary-row">
                <span>Price ({totalQuantity} qnty)</span>
                <span>₹ {totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span className="discount">- ₹ {discount}</span>
              </div>
              <div className="summary-row">
                <span>Coupons for you</span>
                <span className="coupon">- ₹ {coupon}</span>
              </div>
              <div className="summary-row">
                <span>Platform Fee</span>
                <span>₹ {platformFee}</span>
              </div>
              {deliveryCharge > 0 && (
                <div className="summary-row">
                  <span>Delivery Charge</span>
                  <span>₹ {deliveryCharge}</span>
                </div>
              )}
              <div className="summary-row total">
                <span><strong>Total Amount</strong></span>
                <span><strong>₹ {totalAmount}</strong></span>
              </div>
              <div className="summary-row savings">
                <span><p>You will save</p></span>
                <span><strong>₹ {discount + coupon}</strong> on this order</span>
              </div>
              <button className="cart-summary-btn buy-btn">
                Buy Now
              </button>
              <div className="summary-safe">
                <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
