import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaTag } from 'react-icons/fa';
import products from '../Data/Productdata';
import '../styles/productdetail.scss';

const ProductDetail = () => {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  // Scroll to top when product id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

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
    images,
    description,
    specifications,
    reviews,
    rating,
    offers,
  } = product;

  // Use images array if available, fallback to single image
  const productImages = images && images.length > 0 ? images : [image];

  // State for selected image index
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  // State for zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Handlers for zoom
  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Similar products: pick 5 others (could be by category if available)
  const similarProducts = products.filter(p => p.id !== product.id).slice(0, 10);

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        {/* Image, Actions, Description, Specs Section - now on the left */}
          <div className="main-image-and-actions">
            <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
            <div className="main-image-row">
              <div className="product-thumbnails-vertical">
                {productImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${name} thumbnail ${idx + 1}`}
                    className={`product-thumbnail-image${selectedImageIdx === idx ? ' selected' : ''}`}
                    onClick={() => setSelectedImageIdx(idx)}
                  />
                ))}
              </div>
              <div
                className="main-product-image-zoom-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                  '--zoom-x': `${zoomPos.x}%`,
                  '--zoom-y': `${zoomPos.y}%`
                }}
              >
                <img
                  src={productImages[selectedImageIdx]}
                  alt={name}
                  className={`main-product-image${isZoomed ? ' zoomed' : ''}`}
                />
              </div>
            </div>
            <div className="action-buttons">
              <button className="btn btn-wish" title="Add to Wishlist">Add to Wish</button>
              <button className="btn btn-buy-now">Buy Now</button>
              <button className="btn btn-cart" title="Add to Cart">Add to Cart</button>
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
      {/* Similar Products Section */}
      <div className="similar-products-section">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {similarProducts.map(sp => (
            <div
              className="similar-product-card"
              key={sp.id}
              onClick={() => navigate(`/product/${sp.id}`)}
              >
              <img src={sp.image || (sp.images && sp.images[0])} alt={sp.name} className="similar-product-image" />
              <div className="similar-product-info">
                <div className="similar-product-name">{sp.name}</div>
                <div className="similar-product-price">₹{sp.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
