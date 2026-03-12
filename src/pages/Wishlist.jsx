import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';
import Footer from '../components/Footer';
import '../styles/wishlist.scss';
import { useCart } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';

const Wishlist = () => {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);

  // Filter products to only show those in the wishlist
  const wishlistItems = wishlist.map(item => item);

  // Function to handle adding to cart and removing from wishlist
  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>Your Wishlist</h1>
          <Link to="/" className="continue-shopping">
            <FaArrowLeft /> Add More
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-message">
              <h2>Your wishlist is empty</h2>
              <p>Add items you like to your wishlist so you can easily find them later.</p>
              <Link to="/" className="btn-primary">Start Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="wishlist-content">
            <div className="wishlist-grid">
              {wishlistItems.map((item) => {
                const discount = Math.round(((item.oldprice - item.newprice) / item.oldprice) * 100);
                return (
                  <div className="wishlist-item" key={item.id}>
                    <div className="product-badge">{discount}% OFF</div>
                    <div className="product-image">
                      <img src={item.image} alt={item.name} />
                      <FaHeart 
                        className="wish-icon wished" 
                        onClick={() => removeFromWishlist(item.id)}
                      />
                    </div>
                    <div className="product-info">
                      <h3>{item.name}</h3>
                      <p className="product-description">{item.description}</p>
                      <div className="product-meta">
                        <span className="product-rating">
                          <FaStar /> {item.rating}
                        </span>
                        <div className="product-prices">
                          <span className="old-price">Rs {item.oldprice}</span>
                          <span className="new-price">Rs {item.newprice}</span>
                        </div>
                      </div>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="wishlist-actions">
              <Link to="/" className="btn-outline">
                Continue Shopping
              </Link>
              <button 
                className="btn-primary"
                onClick={() => {
                  // First add all items to cart
                  wishlistItems.forEach(item => addToCart(item));
                  
                  // Clear the entire wishlist at once
                  clearWishlist();
                }}
              >
                Add All to Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;