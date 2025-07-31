import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../Data/Productdata';
import '../styles/productdetail.scss';
import { FaStar, FaTag } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="product-detail-container"><h2>Product not found</h2></div>;
  }

  const {
    name,
    shortDescription,
    price,
    oldPrice,
    image,
    description,
    specifications,
    reviews,
    rating,
    offers,
  } = product;

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
      <div className="product-detail-card">
        <div className="product-image-section">
          <img src={image} alt={name} className="main-product-image" />
          <div className="action-buttons">
            <button className="btn btn-add-to-cart">ADD TO CART</button>
            <button className="btn btn-buy-now">BUY NOW</button>
          </div>
          <div className="product-description">
            <h3>Description</h3>
            <p>{description}</p>
          </div>
          <div className="product-specifications">
            <h3>Specifications</h3>
            <table className="spec-table">
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.label}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="product-info-section">
          <h1 className="product-title">{name}</h1>
          <div className="product-short-description">{shortDescription}</div>
          <div className="product-rating">
            <span>{rating} <FaStar /></span>
            <span className="reviews-count">{reviews.length} Ratings &amp; Reviews</span>
          </div>
          <div className="product-price-block">
            <span className="product-price">₹{price.toLocaleString('en-IN')}</span>
            <span className="product-old-price">₹{oldPrice && oldPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="available-offers">
            <h3>Available offers</h3>
            {offers.map((offer, index) => (
              <p key={index} className="offer-item">
                <FaTag className="offer-icon" /> {offer}
              </p>
            ))}
          </div>
          <div className="product-reviews">
            <h3>Reviews</h3>
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <h4>{review.user}</h4>
                <p>{review.comment}</p>
                <span>{review.rating} <FaStar /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;