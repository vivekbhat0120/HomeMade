// src/pages/ProductDetail.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/productdetail.scss';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    // If no product data, redirect back or show a message
    return (
      <div className="product-detail-container">
        <h2>No product data found.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <div className="product-detail-info">
        <h2 className="product-detail-name">{product.name}</h2>
        <p className="product-detail-description">{product.description}</p>
        <div className="product-detail-price">₹ {product.price}</div>
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
      </div>
    </div>
  );
};

export default ProductDetail;
