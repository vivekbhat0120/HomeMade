import React, { useContext } from 'react';
import Footer from '../components/Footer';
import '../styles/home.scss';
import { FaStar, FaLeaf, FaHeart, FaClock } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import products from '../Data/Productdata';

const Home = () => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const toggleWish = (product) => {
    const isProductInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="home">
      {/* Removed <Navbar /> to avoid duplication */}
      {/* Removed <Header /> to avoid duplication */}
      
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Homey..!</h1>
            <p>Discover the taste of homemade goodness, made fresh just for you.</p>
            <button className="btn-primary">Explore Our Products</button>
          </div>
        </div>
      </section>
      
      <section className="featured-products" id="products">
        <div className="container">
          <div className="section-header">
            <h2>Our Best Products</h2>
            <p>Handcrafted with love, enjoyed by many</p>
          </div>
          
          <div className="product-grid">
            {products.map(product => {
              const discount = Math.round(((product.oldprice - product.newprice) / product.oldprice) * 100);
              const isWished = wishlist.some(item => item.id === product.id);
              return (
                <div className="product-card" key={product.id}>
                  <div className="product-badge">{discount}% OFF</div>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <FaHeart 
                      className={`wish-icon ${isWished ? 'wished' : ''}`} 
                      onClick={() => toggleWish(product)} 
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-meta">
                      <span className="product-rating">
                        <FaStar /> {product.rating}
                      </span>
                      <div className="product-prices">
                        <span className="old-price">Rs {product.oldprice}</span>
                        <span className="new-price">Rs {product.newprice}</span>
                      </div>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="add-to-cart"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="buy-now"
                        onClick={() => {
                          addToCart(product);
                          alert('Proceeding to checkout...');
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="see-more">
            <button className="btn-outline">View All Products</button>
          </div>
        </div>
      </section>
      
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <h3>From Family Kitchen to Your Table</h3>
              <p>
                Started in 2024, HomeMade Delights began with a simple mission: to share authentic family recipes with food lovers everywhere.
                Our commitment to quality remains unchanged.
              </p>
              <p>
                Every product is made in small batches using traditional methods and premium ingredients. We never use preservatives or artificial flavors - just pure, 
                honest food made with care.
              </p>
              {/* <button className="btn-primary">Learn More About Us</button> */}
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Our kitchen" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaLeaf />
              </div>
              <h3>Natural Ingredients</h3>
              <p>We use only fresh, high-quality ingredients with no artificial additives or preservatives.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaHeart />
              </div>
              <h3>Made With Love</h3>
              <p>Each product is handcrafted with the same care and attention we give to our own family meals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <h3>Time-Tested Recipes</h3>
              <p>Our recipes have been perfected over generations, preserving authentic flavors and traditions.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to taste the difference?</h2>
            <p>Join thousands of happy customers enjoying our homemade products</p>
            <div className="cta-buttons">
              <button className="btn-primary">Shop Now</button>
              {/* <button className="btn-secondary">Join Our Newsletter</button> */}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
