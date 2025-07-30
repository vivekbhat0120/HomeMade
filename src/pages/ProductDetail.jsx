// src/pages/ProductDetail.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/productdetail.scss';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  // Placeholder data for reviews, specifications, and offers
  const reviews = [
    { user: 'Amit', rating: 5, comment: 'Excellent product!' },
    { user: 'Priya', rating: 4, comment: 'Very good, value for money.' },
  ];
  const specifications = [
    { label: 'Brand', value: 'SampleBrand' },
    { label: 'Model', value: 'XYZ123' },
    { label: 'Color', value: 'Black' },
    { label: 'Warranty', value: '1 Year' },
  ];
  const offers = [
    '10% Instant Discount on Credit Cards',
    'No Cost EMI available',
    'Special Price: Get extra 5% off (price inclusive of discount)'
  ];

  if (!product) {
    return (
      <div className="product-detail-container">
        <h2>No product data found.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-button top-left">&#8592; Back</button>
      <div className="product-detail-main">
        {/* Left: Product Image */}
        <div className="product-detail-image-section">
          <img src={product.image} alt={product.name} className="product-detail-image" />
          <button className="order-button">Order Now</button>
        </div>
        {/* Right: Product Details */}
        <div className="product-detail-info-section">
          <h2 className="product-detail-name">{product.name}</h2>
          <div className="product-detail-rating">
            <span className="rating-value">4.3 ★</span>
            <span className="rating-count">(2,345 ratings & 345 reviews)</span>
          </div>
          <div className="product-detail-price">₹ {product.price}</div>
          <ul className="product-detail-offers">
            <li><strong>Available Offers</strong></li>
            {offers.map((offer, idx) => (
              <li key={idx}>{offer}</li>
            ))}
          </ul>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-specs">
            <h3>Specifications</h3>
            <table>
              <tbody>
                {specifications.map((spec, idx) => (
                  <tr key={idx}>
                    <td className="spec-label">{spec.label}</td>
                    <td className="spec-value">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="product-detail-reviews">
            <h3>Reviews & Ratings</h3>
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card">
                <div className="review-user">{review.user}</div>
                <div className="review-rating">{review.rating} ★</div>
                <div className="review-comment">{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
