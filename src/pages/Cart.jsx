import React from 'react';
import '../styles/cart.scss';

const Cart = () => {
  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <ul className="cart-items">
        {/* Example item */}
        <li className="cart-item">
          <span>Product Name</span>
          <span>$Price</span>
          <button className="cart-button">Remove</button>
        </li>
      </ul>
    </div>
  );
};

export default Cart;