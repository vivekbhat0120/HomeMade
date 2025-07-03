import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productDetails } from '../../Data/ProductData';

import { useCart } from '../../Components/CartContext/CartContext';
import { useWishlist } from '../../Components/WishlistContext/WishlistContext';
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ProductDetails = () => {
  // Hooks and state management
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Find the product based on the ID
  const product = productDetails.find(p => p.id === parseInt(id));


  // Handle product not found case
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }


  // Data calculations and preparations
  const discountPercentage = Math.round(((product.oldprice - product.newprice) / product.oldprice) * 100);


  const productInfo = {
    id: product.id,
    name: product.name,
    price: product.newprice,
    oldprice: product.oldprice,

    image: product.images?.[0] || product.image,
    category: product.category,
    brand: product.brand,
  };


  const productImages = product.images || [product.image];


  // Similar products logic
  const similarCategoryProducts = productDetails
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 6);


  const popularProducts = productDetails
    .filter(p => p.id !== product.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);


  const combinedSimilarProducts = [
    ...similarCategoryProducts,



    ...popularProducts.filter(p => !similarCategoryProducts.some(sp => sp.id === p.id)),
  ];

  return (
    <div className="product-details-bg">
      <div className="product-details-card">
        {/* Header Section */}
        <div className="product-details__header">
          <Link to="/" className="back-link">
            <ArrowBackIosNewIcon fontSize="small" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="product-details">
          {/* Left Section - Images and Actions */}
          <div className="product-details__left">
            {/* Image Gallery */}
            <div className="image-gallery">
              <div className="thumbnail-list">
                {productImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} - ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="main-image">
                <img src={productImages[selectedImage]} alt={product.name} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="add-to-wishlist" onClick={() => addToWishlist(productInfo)}>
                <FavoriteBorderIcon style={{marginRight: 8}} />
                ADD TO WISHLIST
              </button>
              <button className="add-to-cart" onClick={() => addToCart(productInfo)}>
                <ShoppingCartOutlinedIcon style={{marginRight: 8}} />
                ADD TO CART
              </button>
              <button className="buy-now">
                <FlashOnIcon style={{marginRight: 8}} />
                BUY NOW
              </button>
            </div>


            {/* Ratings & Reviews Section */}
            <div className="ratings-reviews-section">
              <h2>Ratings & Reviews</h2>
              <div className="ratings-summary">
                <div className="avg-rating">
                  <span className="rating-value">{product.rating || 4.5}</span>
                  <span className="star">★</span>
                  <div className="rating-count">{product.numReviews || 0} Ratings & {product.reviews ? product.reviews.length : 0} Reviews</div>
                </div>
                <div className="rating-bars">
                  {[5,4,3,2,1].map(star => (
                    <div className="bar-row" key={star}>
                      <span>{star}★</span>
                      <div className="bar-bg">
                        <div className="bar-fill" style={{width: `${Math.max(10, (product.reviews ? product.reviews.filter(r => r.rating === star).length / (product.reviews.length || 1) * 100 : 0))}%`}}></div>
                      </div>
                      <span>{product.reviews ? product.reviews.filter(r => r.rating === star).length : 0}</span>
                    </div>
                  ))}
                </div>
                <div className="rating-categories">
                  {product.ratingCategories && product.ratingCategories.map((cat, idx) => (
                    <div key={idx}><span>{cat.value}</span><div>{cat.label}</div></div>
                  ))}
                </div>
              </div>

              <div className="customer-reviews">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, idx) => (
                    <div className="review-block" key={idx}>
                      <div className="review-header">
                        <span className="review-rating">{review.rating}★</span>
                        <span className="review-title">{review.title}</span>
                      </div>
                      <div className="review-body">
                        {review.body}
                      </div>
                      <div className="review-footer">
                        <span className="reviewer">{review.reviewer}</span>
                        <span className="review-date">{review.date}</span>
                        <span className="review-actions">👍 {review.likes} &nbsp; 💬 {review.comments}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No reviews yet.</div>
                )}
              </div>
            </div>
          </div>

          <div className="divider-vertical"></div>

          {/* Right Section - Product Information */}
          <div className="product-details__right">
            {/* Basic Product Info */}
            <h1 className="product-title">
              <div className="product-meta">
                <span className="category">{product.category}</span>
                <span className="brand">{product.brand}</span>
              </div>
              <span className="product-name">{product.name}</span>
            </h1>

            <div className="product-rating">
              <Rating 
                name="product-rating"
                value={product.rating}
                precision={0.5}
                readOnly
                size="medium"
              />
              <span className="reviews">{product.numReviews} ratings</span>
            </div>

            {/* Price Information */}
            <div className="product-price">
              <span className="special-price">₹{product.newprice}</span>
              <span className="mrp">₹{product.oldprice}</span>
              <span className="discount">{discountPercentage}% off</span>
            </div>

            {/* Offers Section */}
            <div className="offers-section">
              <h3>Available offers</h3>
              <ul>
                <li>Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
                <li>Bank Offer: 10% off on Axis Credit Card Transactions</li>
                <li>Bank Offer: 10% off on Kotak Credit Card Transactions</li>
              </ul>
            </div>

            {/* Delivery and Highlights */}
            <div className="product-info-columns">
              <div className="delivery-info">
                <h3>Delivery</h3>
                <div className="pincode-checker">
                  <input type="text" placeholder="Enter delivery pincode" maxLength="6" pattern="[0-9]*"/>
                  <button>Check</button>
                </div>
                <p className="delivery-message">Usually delivered in 5-7 days</p>
              </div>

              <div className="product-highlights">
                <h3>Highlights</h3>
                <ul>
                  <li>100% Genuine Product</li>
                  <li>Easy 7 Days Return Policy</li>
                  <li>Secure Payments</li>

                </ul>
              </div>
            </div>

            {/* Product Description */}
            <div className="product-description-section">
              <h2>Product Description</h2>
              <div className="description-block">
                <div>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="specifications-section">
              <h2>Specifications</h2>
              <table className="spec-table">
                <tbody>
                  {product.specifications && product.specifications.map((spec, idx) => (
                    <tr key={idx}>
                      <td>{spec.label}</td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href="#" className="read-more-specs">Read More</a>
            </div>
          </div>

        </div>
        

        {/* Similar Products Section */}
        <section className="similar-products-section-wide">
          <h2>Similar Products</h2>
          <div className="similar-products-list-scroll">
            {/* Similar Category Products */}
            {similarCategoryProducts.length > 0 && (
              <>
                <div className="similar-products-label">Similar Category</div>
                {similarCategoryProducts.map(p => (
                  <div className="similar-product-card" key={`cat-${p.id}`}>
                    <img src={p.images?.[0] || p.image} alt={p.name} />
                    <div className="similar-product-title">{p.name}</div>
                    <div className="similar-product-rating">
                      <span>{p.rating}★</span>
                      <span className="assured">✔️</span>
                    </div>
                    <div className="similar-product-price">
                      <span>₹{p.newprice.toLocaleString()}</span>
                      <span className="old">₹{p.oldprice.toLocaleString()}</span>
                      <span className="discount">
                        {Math.round(((p.oldprice - p.newprice) / p.oldprice) * 100)}% off
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
            {/* Popular Products */}
            {popularProducts.length > 0 && (
              <>
                <div className="similar-products-label">Popular Products</div>
                {popularProducts
                  .filter(p => !similarCategoryProducts.some(sp => sp.id === p.id))
                  .map(p => (
                    <div className="similar-product-card" key={`pop-${p.id}`}>
                      <img src={p.images?.[0] || p.image} alt={p.name} />
                      <div className="similar-product-title">{p.name}</div>
                      <div className="similar-product-rating">
                        <span>{p.rating}★</span>
                        <span className="assured">✔️</span>
                      </div>
                      <div className="similar-product-price">
                        <span>₹{p.newprice.toLocaleString()}</span>
                        <span className="old">₹{p.oldprice.toLocaleString()}</span>
                        <span className="discount">
                          {Math.round(((p.oldprice - p.newprice) / p.oldprice) * 100)}% off
                        </span>
                      </div>
                    </div>
                  ))}
              </>
            )}
            {/* No Similar Products */}
            {combinedSimilarProducts.length === 0 && (
              <div className="no-similar">No similar products found.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;

