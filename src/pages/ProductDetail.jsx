import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaTag } from 'react-icons/fa';
import products from '../Data/Productdata';
import '../styles/productdetail.scss';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isInCart, addToCart, removeFromCart } = useCart();

  // Derived values
  const isWished = wishlist.some(item => item.id === product?.id);

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

  // State
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Refs for auto-scroll
  const listRef = useRef(null);
  const intervalRef = useRef(null);

  // Handlers
  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Similar products: pick 10 others
  const similarProducts = products.filter(p => p.id !== product.id).slice(0, 10);

  // Dynamic style for zoom position
  const zoomStyle = isZoomed ? {
    '--zoom-x': `${zoomPos.x}%`,
    '--zoom-y': `${zoomPos.y}%`
  } : {};

  // Auto-scroll for similar products list (robust, ref-based)
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const scrollFn = () => {
      if (!list) return;
      if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 2) {
        list.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        list.scrollBy({ left: 220, behavior: 'smooth' });
      }
    };
    const startScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(scrollFn, 2500);
    };
    const stopScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
    startScroll();
    return () => {
      stopScroll();
    };
  }, []);

  const handleListMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  const handleListMouseLeave = () => {
    const list = listRef.current;
    if (!list) return;
    const scrollFn = () => {
      if (!list) return;
      if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 2) {
        list.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        list.scrollBy({ left: 220, behavior: 'smooth' });
      }
    };
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(scrollFn, 2500);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        {/* Image, Actions, Description, Specs Section - now on the left */}
        <div className="main-image-and-actions">
          <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
          <div className="main-image-row">
            
            <div
              className={`main-product-image-zoom-container${isZoomed ? ' zoomed' : ''}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              style={zoomStyle}
            >
              <img
                src={productImages[selectedImageIdx]}
                alt={name}
                className={`main-product-image${isZoomed ? ' zoomed' : ''}`}
              />
            </div>
          </div>
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
          <div className="action-buttons">
            <button
              className={`btn btn-wish${isWished ? ' wished' : ''}`}
              title={isWished ? 'Go to Wish' : 'Add to Wish'}
              onClick={() => {
                if (isWished) {
                  navigate('/wishlist');
                } else {
                  addToWishlist(product);
                }
              }}
            >
              {isWished ? 'Go to Wish' : 'Add to Wish'}
            </button>
            <button className="btn btn-buy-now">Buy Now</button>
            <button
              className="btn btn-cart"
              title={isInCart(product.id) ? 'Go to Cart' : 'Add to Cart'}
              onClick={() => {
                if (isInCart(product.id)) {
                  navigate('/cart');
                } else {
                  addToCart(product);
                }
              }}
            >
              {isInCart(product.id) ? 'Go to Cart' : 'Add to Cart'}
            </button>
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
              <>
                <span className="product-old-price">₹{oldPrice.toLocaleString('en-IN')}</span>
                <span className="product-discount">
                  {`-${Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF`}
                </span>
              </>
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
          {/* Mobile-only specifications section that appears between description and reviews */}
          <div className="product-specifications mobile-specs">
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
        <div className="similar-products-list-wrapper">
          <button className="similar-products-arrow left" onClick={() => {
            const el = listRef.current;
            if (el) el.scrollBy({ left: -220, behavior: 'smooth' });
          }}>&#8592;</button>
          <div
            className="similar-products-list"
            ref={listRef}
            onMouseEnter={handleListMouseEnter}
            onMouseLeave={handleListMouseLeave}
          >
            {similarProducts.map(sp => {
              const isWished = wishlist.some(item => item.id === sp.id);
              const inCart = isInCart(sp.id);
              const handleWishClick = (e) => {
                e.stopPropagation();
                if (isWished) {
                  removeFromWishlist(sp.id);
                } else {
                  addToWishlist(sp);
                }
              };
              const handleCartClick = (e) => {
                e.stopPropagation();
                if (inCart) {
                  removeFromCart(sp.id);
                } else {
                  addToCart(sp);
                }
              };
              return (
                <div
                  className="similar-product-card"
                  key={sp.id}
                  onClick={() => navigate(`/product/${sp.id}`)}
                >
                  <span
                    className={`product-icon-wish${isWished ? ' wished' : ''}`}
                    onClick={handleWishClick}
                    title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    {isWished ? (
                      <svg width="16" height="16" fill="var(--accent-color)" stroke="var(--accent-color)" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    )}
                  </span>
                  <img src={sp.image || (sp.images && sp.images[0])} alt={sp.name} className="similar-product-image" />
                  <div className="similar-product-info">
                    <div className="similar-product-name">{sp.name}</div>
                    <div className="product-price-row">
                      {sp.oldPrice && (
                        <span className="similar-product-discount">
                          {`${Math.round(((sp.oldPrice - sp.price) / sp.oldPrice) * 100)}% OFF`}
                        </span>
                      )}
                      <span className="similar-product-price">₹{sp.price.toLocaleString('en-IN')}</span>
                      <span
                        className={`product-icon-cart${inCart ? ' in-cart' : ''}`}
                        onClick={handleCartClick}
                        title={inCart ? 'Remove from Cart' : 'Add to Cart'}
                      >
                        {inCart ? (
                          <svg width="16" height="16" fill="none" stroke="var(--accent-color)" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 17h7.72a2 2 0 0 0 1.96-1.61L23 6H6"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 17h7.72a2 2 0 0 0 1.96-1.61L23 6H6"/>
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="similar-products-arrow right" onClick={() => {
            const el = listRef.current;
            if (el) el.scrollBy({ left: 220, behavior: 'smooth' });
          }}>&#8594;</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
