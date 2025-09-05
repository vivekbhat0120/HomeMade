import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/home.scss';
import { FaStar, FaLeaf, FaHeart, FaClock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "Homemade Pasta Sauce",
      description: "Traditional recipe passed down through generations with fresh tomatoes and herbs",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      rating: 4.8,
      category: "Sauces"
    },
    {
      id: 2,
      name: "Grandma's Apple Pie",
      description: "Sweet and tart apples baked in a flaky homemade crust with cinnamon",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      rating: 5.0,
      category: "Desserts"
    },
    {
      id: 3,
      name: "Artisan Sourdough Bread",
      description: "Naturally leavened bread with a perfect crust and soft interior",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      rating: 4.7,
      category: "Bakery"
    },
    {
      id: 4,
      name: "Homemade Pickles",
      description: "Crisp cucumbers in a special brine with herbs and spices",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      rating: 4.5,
      category: "Preserves"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      testimonial: "I've never tasted pasta sauce this authentic outside of Italy! It's like having my grandmother's cooking at home.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      testimonial: "The sourdough bread is incredible - perfect texture, amazing flavor. I've ordered it weekly for months now!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      testimonial: "These homemade pickles remind me of my childhood. Crunchy, flavorful, and not too sour - just perfect!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ];

  return (
    <div className="home">
      <Navbar />
      <Header />
      
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
      
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Customer Love</h2>
            <p>What our happy customers are saying</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.testimonial}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <span>{testimonial.name}</span>
                </div>
              </div>
            ))}
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
