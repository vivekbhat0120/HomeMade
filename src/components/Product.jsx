// src/components/Product.jsx
import React from 'react';
import '../styles/product.scss';

const Product = ({ name, price, image, description }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <div className="product-price">₹ {price}</div>
      </div>
    </div>
  );
};

export default Product;
