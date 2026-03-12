import React, { useState } from 'react';
import { MdDelete, MdAdd, MdRemove, MdArrowLeft } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/cart.scss';
import { useCart } from '../context/CartContext.jsx';

const Cart = () => {
  const { cart, removeFromCart, addToCart, updateQuantity, removeItemCompletely } = useCart();

  // Helper function to update quantity
  const updateQuantityLocal = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate cart subtotal
  const subtotal = cart.reduce((total, item) => total + (item.newprice * item.quantity), 0);
  
  // Calculate shipping (free over 1000, otherwise 100)
  const shipping = subtotal > 1000 ? 0 : 100;
  
  // Calculate tax (5% of subtotal)
  const tax = subtotal * 0.05;
  
  // Calculate total
  const total = subtotal + shipping + tax - discount;

  const handleCouponApply = () => {
    if (couponCode.toLowerCase() === 'discount20') {
      setCouponApplied(true);
      // Apply 20% discount
      setDiscount(subtotal * 0.2);
    } else {
      setCouponApplied(false);
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantityLocal(item, newQuantity);
    }
  };

  return (
    <IconContext.Provider value={{ size: '20px', color: '#111' }}>
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Your Cart</h1>
            <Link to="/" className="continue-shopping">
              <MdArrowLeft size={24} /> Add More
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-message">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any products to your cart yet.</p>
                <Link to="/" className="btn-primary">Start Shopping</Link>
              </div>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                <div className="cart-items-header">
                  <span className="product-col">Product</span>
                  <span className="price-total-col">Price & Total</span>
                  <span className="quantity-col">Quantity</span>
                  <span className="action-col">Action</span>
                </div>
                
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="product-col">
                      <div className="product-info">
                        <img src={item.image} alt={item.name} />
                        <div className="product-details">
                          <h3>{item.name}</h3>
                          <p className="product-description">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="price-total-col">
                      <div className="price-col" data-label="Price">
                        <span className="price">Rs {item.newprice}</span>
                      </div>
                      <div className="total-col" data-label="Total">
                        <span className="total">Rs {item.newprice * item.quantity}</span>
                      </div>
                    </div>
                    
                    <div className="quantity-col">
                      <div className="quantity-control">
                        <button 
                          className="quantity-btn minus-btn" 
                          onClick={() => updateQuantityLocal(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn plus-btn" 
                          onClick={() => updateQuantityLocal(item, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="action-col">
                      <button 
                        className="remove-btn" 
                        onClick={() => removeItemCompletely(item.id)}
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <h2>Order Summary</h2>
                
                <div className="coupon-section">
                  <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button 
                    onClick={handleCouponApply}
                    disabled={couponApplied}
                    className={couponApplied ? 'applied' : ''}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                
                <div className="summary-details">
                  <div className="summary-item">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="summary-item discount">
                      <span>Discount</span>
                      <span>- Rs {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-item">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `Rs ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="summary-item">
                    <span>Tax (5%)</span>
                    <span>Rs {tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total</span>
                    <span>Rs {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="checkout-btn">Proceed to Checkout</button>
                
                <div className="info-message">
                  <p>Free shipping on orders over Rs 1000</p>
                  <p>*Try coupon code: DISCOUNT20 for 20% off</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </IconContext.Provider>
  );
};

export default Cart;