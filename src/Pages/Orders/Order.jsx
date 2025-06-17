import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import order from '../../assets/images/Icons/no-order.png';

const Order = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const orders = [
    
  ];

  return (
    <div className="orders-page">
      <h1 className="main-heading">Your Orders</h1>
      <div className="filters-section">
        <h2>Filters</h2>
        
        <div className="filter-group">
          <h3>ORDER STATUS</h3>
          <div className="filter-options">
            <label>
              <input type="checkbox" name="status" value="on-the-way" />
              On the way
            </label>
            <label>
              <input type="checkbox" name="status" value="delivered" />
              Delivered
            </label>
            <label>
              <input type="checkbox" name="status" value="cancelled" />
              Cancelled
            </label>
            <label>
              <input type="checkbox" name="status" value="returned" />
              Returned
            </label>
          </div>
        </div>

        <div className="filter-group">
          <h3>ORDER TIME</h3>
          <div className="filter-options">
            <label>
              <input type="checkbox" name="time" value="last-30-days" />
              Last 30 days
            </label>
            <label>
              <input type="checkbox" name="time" value="2024" />
              2024
            </label>
            <label>
              <input type="checkbox" name="time" value="2023" />
              2023
            </label>
            <label>
              <input type="checkbox" name="time" value="older" />
              Older
            </label>
          </div>
        </div>
      </div>

      <div className="orders-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search your orders here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">Search Orders</button>
        </div>

        <div className="orders-list">
          {orders.length === 0 ? (
            <div className="no-orders">
              <img src={order} alt="No orders" className='no-order'/>
              <h2>No Orders Yet!</h2>
              <p>Looks like you haven't placed any orders yet.</p>
              <button onClick={() => navigate('/')} className="shop-now-btn">
                Shop Now
              </button>
            </div>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="order-item">
                <div className="product-image">
                  <img src={order.image} alt={order.name} />
                </div>
                <div className="product-details">
                  <h3>{order.name}</h3>
                  <p>Color: {order.color} Size: {order.size}</p>
                  <p className="price">₹{order.price}</p>
                </div>
                <div className="delivery-info">
                  <span className="status">{order.deliveryDate}</span>
                  <p>Your item has been delivered</p>
                  <button className="review-button">Rate & Review Product</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
