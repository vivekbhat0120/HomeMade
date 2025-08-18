import React, { useState, useEffect } from 'react';
import './../styles/home.scss';
import products from '../Data/Productdata';
import Product from '../components/Product';
import Footer from '../components/Footer';
import Filter from '../components/Filter';

const Home = ({ searchQuery }) => {
  // Find min and max price in the product data
  const minProductPrice = Math.min(...products.map(p => p.price));
  const maxProductPrice = Math.max(...products.map(p => p.price));
  
  // State for filters
  const [sortOption, setSortOption] = useState('popularity');
  const [priceRange, setPriceRange] = useState([minProductPrice, maxProductPrice]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming there's an 'id' or 'createdAt' that indicates newness
        result.sort((a, b) => b.id - a.id);
        break;
      case 'popularity':
      default:
        // Assuming higher rating means more popular
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, sortOption, priceRange]);
  
  const handleSortChange = (option) => {
    setSortOption(option);
  };
  
  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  return (
    <div className="home">
      <div className="home-content">
        <div className="filter-sidebar">
          <Filter 
            onSortChange={handleSortChange}
            onPriceRangeChange={handlePriceRangeChange}
            minPrice={minProductPrice}
            maxPrice={maxProductPrice}
            currentMinPrice={priceRange[0]}
            currentMaxPrice={priceRange[1]}
          />
        </div>
        <div className="product-content">
          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Product key={product.id} {...product} />
              ))
            ) : (
              <div className="no-products-message">
                No products match your criteria. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
