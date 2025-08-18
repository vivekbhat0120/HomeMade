import React, { useState, useEffect } from 'react';
import '../styles/filter.scss';

const Filter = ({ 
  onSortChange, 
  onPriceRangeChange, 
  minPrice, 
  maxPrice, 
  currentMinPrice, 
  currentMaxPrice 
}) => {
  const [sortOption, setSortOption] = useState('popularity');
  const [priceRange, setPriceRange] = useState([currentMinPrice, currentMaxPrice]);
  
  useEffect(() => {
    setPriceRange([currentMinPrice, currentMaxPrice]);
  }, [currentMinPrice, currentMaxPrice]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = newValue;
    
    // Ensure min doesn't exceed max and max doesn't go below min
    if (index === 0 && newValue > priceRange[1]) {
      newRange[0] = priceRange[1];
    } else if (index === 1 && newValue < priceRange[0]) {
      newRange[1] = priceRange[0];
    }
    
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleReset = () => {
    // Reset sort option
    setSortOption('popularity');
    onSortChange('popularity');
    
    // Reset price range
    setPriceRange([minPrice, maxPrice]);
    onPriceRangeChange([minPrice, maxPrice]);
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>Filters</h2>
        <button className="reset-button" onClick={handleReset}>
          Reset All
        </button>
      </div>
      
      <div className="filter-section">
        <h3>Sort By</h3>
        <div className="sort-dropdown-container">
          <select 
            value={sortOption} 
            onChange={handleSortChange}
            className="sort-dropdown"
          >
            <option value="popularity">Relevance</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <div className="dropdown-arrow">
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-display">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <div className="range-slider-container">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="range-slider range-slider-min"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="range-slider range-slider-max"
          />
          <div className="range-slider-track"></div>
        </div>
      </div>
    </div>
  );
};


export default Filter;
