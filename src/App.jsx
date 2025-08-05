import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Navbar />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
