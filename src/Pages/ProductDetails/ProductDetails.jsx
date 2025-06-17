import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productDetails } from '../../Data/ProductData';

import { useCart } from '../../Components/CartContext/CartContext';
import { useWishlist } from '../../Components/WishlistContext/WishlistContext';
import Rating from "@mui/material/Rating";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Find the product based on the ID
  const product = productDetails.find(p => p.id === parseInt(id));

  // If product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }

  // Calculate discount percentage
  const discountPercentage = Math.round(((product.oldprice - product.newprice) / product.oldprice) * 100);

  // Prepare product info for cart/wishlist
  const productInfo = {
    id: product.id,
    name: product.name,
    price: product.newprice,
    oldprice: product.oldprice,
    image: product.images?.[0] || product.image, // Use first image or fallback to single image
    category: product.category,
    brand: product.brand,
  };

  // Use product images array or create array from single image
  const productImages = product.images || [product.image];

  return (
    <div className="product-details">
      <div className="product-details__left">
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
        <div className="action-buttons">
          <button className="add-to-wishlist" onClick={() => addToWishlist(productInfo)}>ADD TO WISHLIST</button>
          <button className="add-to-cart" onClick={() => addToCart(productInfo)}>ADD TO CART</button>
          <button className="buy-now">BUY NOW</button>
        </div>
      </div>

      <div className="product-details__right">
        <h1 className="product-title">
          <span className="brand">{product.brand}</span>
          {product.name}
        </h1>
        
        <div className="product-rating">
          <Rating 
            name="product-rating"
            value={product.rating}
            precision={0.5}
            readOnly
          />
          <span className="reviews">{product.numReviews} ratings</span>
        </div>

        <div className="product-price">
          <span className="special-price">₹{product.newprice}</span>
          <span className="mrp">₹{product.oldprice}</span>
          <span className="discount">{discountPercentage}% off</span>
        </div>

        <div className="offers-section">
          <h3>Available offers</h3>
          <ul>
            <li>Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
            <li>Bank Offer: 10% off on Axis Credit Card Transactions</li>
            <li>Bank Offer: 10% off on Kotak Credit Card Transactions</li>
          </ul>
        </div>

        <div className="delivery-info">
          <h3>Delivery</h3>
          <div className="pincode-checker">
            <input type="text" placeholder="Enter delivery pincode" maxLength="6" pattern="[0-9]*"/>
            <button>Check</button>
          </div>
          <p className="delivery-message">Usually delivered in 5-7 days</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
