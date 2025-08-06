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
        </>
      )}
    </div>
  );
};

export default Cart;
