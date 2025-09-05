import React from 'react';
import '../styles/header.scss';

const Header = () => {
  return (
    <header className="header" id="home">
      <div className="header-container">
        <div className="header-content">
          <h1>Homemade Goodness, <br />Delivered to Your Door</h1>
          <p>
            Authentic home-cooked meals made with love and premium ingredients.
            Taste the difference of real homemade food.
          </p>
          <div className="header-buttons">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
          <div className="header-features">
            <div className="feature">
              <span className="feature-icon">🌿</span>
              <span className="feature-text">Natural Ingredients</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏠</span>
              <span className="feature-text">Homemade Fresh</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <span className="feature-text">Fast Delivery</span>
            </div>
          </div>
        </div>
        <div className="header-image">
          <div className="image-container">
            <img src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                 alt="Homemade food delights" />
          </div>
        </div>
      </div>
      <div className="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;
