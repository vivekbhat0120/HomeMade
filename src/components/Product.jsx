// src/components/Product.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/product.scss';

const Product = ({ id, name, price, image, shortDescription }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{shortDescription}</p>
        <div className="product-price">₹ {price}</div>
      </div>
    </div>
  );
};

export default Product;
