import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          </Routes>
          <Navbar />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
