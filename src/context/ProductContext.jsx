import React, { createContext, useEffect, useState } from 'react';
import initialProducts from '../Data/Productdata';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('products_v1');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (e) {
      return initialProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('products_v1', JSON.stringify(products));
    } catch (e) {
      // ignore write errors
    }
  }, [products]);

  const addProduct = (product) => {
    setProducts(prev => {
      const nextId = prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      const newProduct = { ...product, id: nextId };
      return [...prev, newProduct];
    });
  };

  const updateProduct = (updated) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const resetProducts = () => {
    setProducts(initialProducts);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
