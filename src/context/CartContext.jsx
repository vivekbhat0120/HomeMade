import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the cart
const initialState = (() => {
  const items = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart')) 
    : [];
  const totalAmount = items.reduce(
    (total, item) => total + (item.newprice || item.price) * item.quantity, 
    0
  );
  const totalItems = items.reduce(
    (total, item) => total + item.quantity, 
    0
  );
  return { items, totalAmount, totalItems };
})();

// Create the context
const CartContext = createContext(initialState);

// Cart reducer to handle all cart-related actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      let updatedItems;
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Item doesn't exist, add new item
        updatedItems = [...state.items, { ...product, quantity }];
      }
      
      // Calculate new totals
      const totalAmount = updatedItems.reduce(
        (total, item) => total + (item.newprice || item.price) * item.quantity, 
        0
      );
      
      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantity, 
        0
      );
      
      return { 
        ...state, 
        items: updatedItems,
        totalAmount,
        totalItems
      };
    }
    
    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      
      if (existingItemIndex === -1) return state;
      
      const existingItem = state.items[existingItemIndex];
      let updatedItems;
      
      if (existingItem.quantity === 1) {
        // Remove item completely if quantity is 1
        updatedItems = state.items.filter(item => item.id !== id);
      } else {
        // Decrease quantity by 1
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1
        };
      }
      
      // Calculate new totals
      const totalAmount = updatedItems.reduce(
        (total, item) => total + (item.newprice || item.price) * item.quantity, 
        0
      );
      
      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantity, 
        0
      );
      
      return {
        ...state,
        items: updatedItems,
        totalAmount,
        totalItems
      };
    }
    
    case 'REMOVE_ITEM_COMPLETELY': {
      const { id } = action.payload;
      const updatedItems = state.items.filter(item => item.id !== id);
      const totalAmount = updatedItems.reduce(
        (total, item) => total + (item.newprice || item.price) * item.quantity, 
        0
      );
      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantity, 
        0
      );
      return { ...state, items: updatedItems, totalAmount, totalItems };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalAmount: 0,
        totalItems: 0
      };
      
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        const updatedItems = state.items.filter(item => item.id !== id);
        const totalAmount = updatedItems.reduce(
          (total, item) => total + (item.newprice || item.price) * item.quantity, 
          0
        );
        const totalItems = updatedItems.reduce(
          (total, item) => total + item.quantity, 
          0
        );
        return { ...state, items: updatedItems, totalAmount, totalItems };
      }
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const totalAmount = updatedItems.reduce(
        (total, item) => total + (item.newprice || item.price) * item.quantity, 
        0
      );
      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantity, 
        0
      );
      return { ...state, items: updatedItems, totalAmount, totalItems };
    }
    
    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState.items));
  }, [cartState.items]);
  
  // Actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity }
    });
  };
  
  const removeFromCart = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const updateQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
  };
  
  const removeItemCompletely = (id) => {
    dispatch({
      type: 'REMOVE_ITEM_COMPLETELY',
      payload: { id }
    });
  };
  
  return (
    <CartContext.Provider 
      value={{
        cart: cartState.items,
        totalAmount: cartState.totalAmount,
        totalItems: cartState.totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        removeItemCompletely,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
