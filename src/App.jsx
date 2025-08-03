import { useState } from 'react'
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <BrowserRouter>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
