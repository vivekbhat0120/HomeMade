import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
