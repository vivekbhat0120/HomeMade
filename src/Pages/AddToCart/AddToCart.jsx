import React from 'react';
import { useCart } from '../../Components/CartContext/CartContext';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const AddToCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
          <div style={{ flexGrow: 1 }}>
            <h4>{item.name}</h4>
            <p>Price: Rs.{item.price}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}><RemoveIcon fontSize="small" /></Button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <Button size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></Button>
            </div>
          </div>
          <div>
            <p>Subtotal: Rs.{item.price * item.quantity}</p>
            <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)} startIcon={<DeleteIcon />}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <h3>Total Amount: Rs.{totalAmount.toFixed(2)}</h3>
        <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;