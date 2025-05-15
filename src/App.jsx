import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Styles/_global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components using more standard Vite/React conventions
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';  // Points to Home.jsx
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AddToCart from "./Pages/AddToCart/AddToCart";
import WishList from "./Pages/WishList/WishList"; // Corrected path
import { WishlistProvider } from './Components/WishListContext/WishListContext'; // Import WishlistProvider
import { CartProvider } from './Components/CartContext/CartContext';

function App() {
  return (
    <CartProvider>
      <WishlistProvider> {/* Wrap with WishlistProvider */}
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-to-cart" element={<AddToCart />} />
            <Route path="/WishList" element={<WishList />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
