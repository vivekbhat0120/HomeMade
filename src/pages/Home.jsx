import React from 'react';
import './../styles/home.scss';
import products from '../Data/Productdata';
import Product from '../components/Product';
import Footer from '../components/Footer';

const Home = () => (
  <div className="home">
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </div>
    <Footer />
  </div>
);

export default Home;
