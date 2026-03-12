import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { BsShare } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { ProductContext } from '../context/ProductContext.jsx';
import Footer from '../components/Footer';
import '../styles/productdetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const product = (products || []).find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      // prefer the first non-empty image, fall back to single `image` field
      const firstImage = (product.images && product.images.find(img => img)) || product.image || null;
      setSelectedImage(firstImage);
      // Scroll to top on component mount
      window.scrollTo(0, 0);
    } else {
      setSelectedImage(null);
    }
  }, [product]);

  const isWished = wishlist.some(item => item.id === product?.id);

  const toggleWish = (e) => {
    e.stopPropagation();
    if (!product) return;
    
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    alert('Proceeding to checkout...');
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleGoBack = () => {
    navigate('/'); // Navigate to home page
  };

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found">
            <h2>Product Not Found</h2>
            <p>Sorry, the product you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.oldprice - product.newprice) / product.oldprice) * 100);

  return (
    <div className="product-detail">
      <div className="container">
        <div className="back-button">
          <button onClick={handleGoBack} className="btn-back">
            ← Back
          </button>
        </div>
        
        <div className="product-content">
          <div className="product-gallery">
            <div className="main-image">
              {selectedImage ? (
                <img src={selectedImage} alt={product.name} />
              ) : (
                <div className="image-placeholder">No image available</div>
              )}
              <BsShare className="share-icon" />
              <FaHeart 
                className={`wish-icon ${isWished ? 'wished' : ''}`} 
                onClick={toggleWish} 
              />
            </div>
            <div className="thumbnail-gallery">
              {(product.images || []).filter(Boolean).map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="product-actions">
              <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-meta">
              <div className="rating">
                <FaStar /> <span>{product.rating}</span>
              </div>
              <div className="category">Category: <span>{product.category}</span></div>
            </div>
            
            <div className="price-container">
              <div className="price">
                <span className="old-price">Rs {product.oldprice}</span>
                <span className="current-price">Rs {product.newprice}</span>
              </div>
              <div className="discount-badge">
                {discount}% OFF
              </div>
            </div>
            
            <div className="description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="quantity-selector">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button onClick={decreaseQuantity}>−</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>
            
            <div className="product-features">
              <div className="feature">
                <span className="icon">🚚</span>
                <span>Free shipping on orders over Rs 500</span>
              </div>
              <div className="feature">
                <span className="icon">🔄</span>
                <span>Easy 7-day returns</span>
              </div>
              <div className="feature">
                <span className="icon">✅</span>
                <span>100% authentic products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;