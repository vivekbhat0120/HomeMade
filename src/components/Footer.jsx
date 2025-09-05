import React from 'react';
import '../styles/footer.scss';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <div className="footer-logo">
              <h2>HomeMade<span>Delights</span></h2>
            </div>
            <p className="footer-desc">
              Handcrafted food products made with love, using time-tested family recipes and premium ingredients.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><FaFacebook /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
              <a href="#" className="social-link"><FaPinterest /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li><a href="#">Sauces & Dips</a></li>
              <li><a href="#">Preserves & Jams</a></li>
              <li><a href="#">Bakery</a></li>
              <li><a href="#">Desserts</a></li>
              <li><a href="#">Gift Boxes</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>
                <FaPhone className="contact-icon" />
                <span>(123) 456-7890</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>hello@homemadedelights.com</span>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Cooking Lane, Foodville, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-middle">
          <div className="newsletter">
            <h3>Subscribe to our Newsletter</h3>
            <p>Get updates on new products, special offers, and seasonal recipes.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} HomeMade Delights. All rights reserved.</p>
          </div>
          <div className="payment-methods">
            <span className="payment-icon"><FaCreditCard /></span>
            <span className="payment-icon"><FaPaypal /></span>
            <span className="payment-icon"><FaApplePay /></span>
            <span className="payment-icon"><FaGooglePay /></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
