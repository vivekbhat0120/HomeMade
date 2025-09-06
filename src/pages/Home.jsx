import React from 'react';
// import Navbar from '../components/Navbar'; // Removed to avoid duplication
import Header from '../components/Header'; // Removed import as Header is no longer used here
import Footer from '../components/Footer';
import '../styles/home.scss';
import { FaStar, FaLeaf, FaHeart, FaClock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import products from '../Data/Productdata';

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="home">
      {/* Removed <Navbar /> to avoid duplication */}
      {/* Removed <Header /> to avoid duplication */}
      
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to HomeMade Delights</h1>
            <p>Discover the taste of homemade goodness, made fresh just for you.</p>
            <button className="btn-primary">Explore Our Products</button>
          </div>
        </div>
      </section>
      
      <section className="featured-products" id="products">
        <div className="container">
          <div className="section-header">
            <h2>Our Best Sellers</h2>
            <p>Handcrafted with love, enjoyed by many</p>
          </div>
          
          <div className="product-grid">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-badge">{product.category}</div>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-meta">
                    <span className="product-rating">
                      <FaStar /> {product.rating}
                    </span>
                    <span className="product-price">${product.price}</span>
                  </div>
                  <button 
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
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
                Started in 2015, HomeMade Delights began with a simple mission: to share authentic family recipes with food lovers everywhere. 
                What started as weekend farmers market sales has grown into a beloved brand, but our commitment to quality remains unchanged.
              </p>
              <p>
                Every product is made in small batches using traditional methods and premium ingredients. We never use preservatives or artificial flavors - just pure, 
                honest food made with care.
              </p>
              <button className="btn-primary">Learn More About Us</button>
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
              <button className="btn-secondary">Join Our Newsletter</button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
