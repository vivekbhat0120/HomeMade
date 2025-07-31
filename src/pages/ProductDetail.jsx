import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaTag, FaHeart, FaShoppingCart } from 'react-icons/fa';
import products from '../Data/Productdata';
import '../styles/productdetail.scss';

const ProductDetail = () => {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  // Handle product not found
  if (!product) {
    return (
      <div className="product-detail-container">
        <h2>Product not found</h2>
      </div>
    );
  }

  // Destructure product data
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
      <div className="product-detail-card">
        {/* Image, Actions, Description, Specs Section - now on the left */}
        <div className="product-image-section">
          <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
          <img src={image} alt={name} className="main-product-image" />
          <div className="action-buttons">
            <button className="btn btn-wish" title="Add to Wishlist"><FaHeart /></button>
            <button className="btn btn-buy-now">BUY NOW</button>
            <button className="btn btn-cart" title="Add to Cart"><FaShoppingCart /></button>
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
        {/* Info Section - now on the right */}
        <div className="product-info-section">
          <h1 className="product-title">{name}</h1>
          <div className="product-short-description">{shortDescription}</div>
          <div className="product-rating">
            <span>{rating} <FaStar /></span>
            <span className="reviews-count">{reviews.length} Ratings &amp; Reviews</span>
          </div>
          <div className="product-price-block">
            <span className="product-price">₹{price.toLocaleString('en-IN')}</span>
            {oldPrice && (
              <span className="product-old-price">₹{oldPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <div className="available-offers">
            <h3>Available offers</h3>
            {offers.map((offer, index) => (
              <p key={index} className="offer-item">
                <FaTag className="offer-icon" /> {offer}
              </p>
            ))}
          </div>
          <div className="product-description">
            <h3>Description</h3>
            <p>{description}</p>
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
