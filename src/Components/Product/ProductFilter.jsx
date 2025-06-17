import React, { useState, useEffect } from 'react';
import { Slider, Checkbox, FormControlLabel, FormGroup, Select, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ProductFilter = ({ onFilterChange }) => {
    const defaultFilters = {
        price: [0, 100000],
        categories: [],
        brands: [],
        sort: 'default'
    };

    const [filters, setFilters] = useState(defaultFilters);
    const [collapsed, setCollapsed] = useState({
        categories: false,
        brands: false
    });

    // Ensure categories and brands match exactly with your product data
    const categories = ['Electronics', 'Fashion', 'Bags', 'Footwear', 'Groceries', 'Beauty', 'Wellness', 'Jewellery']
        .sort((a, b) => a.localeCompare(b));
    
    const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Puma', 'Sony', 'LG', 'HP']
        .sort((a, b) => a.localeCompare(b));

    useEffect(() => {
        // Debounce filter changes to prevent too many updates
        const timeoutId = setTimeout(() => {
            onFilterChange(filters);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [filters, onFilterChange]);

    const handlePriceChange = (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            price: newValue
        }));
    };

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleBrandChange = (brand) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...prev.brands, brand]
        }));
    };

    const handleSortChange = (event) => {
        setFilters(prev => ({
            ...prev,
            sort: event.target.value
        }));
    };

    const toggleCollapse = (section) => {
        setCollapsed(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handlePriceInput = (type, value) => {
        // Remove all non-numeric characters and convert to number
        const numValue = Number(value.replace(/[^0-9]/g, ''));
        const validValue = Math.min(Math.max(numValue, 0), 100000);
        
        setFilters(prev => ({
            ...prev,
            price: type === 'min' 
                ? [validValue, Math.max(validValue, prev.price[1])]
                : [Math.min(prev.price[0], validValue), validValue]
        }));
    };

    // Add formatIndianPrice helper function
    const formatIndianPrice = (value) => {
        return value.toLocaleString('en-IN');
    };

    const handleReset = () => {
        setFilters(defaultFilters);
    };

    return (
        <div className="filter-section">
            <div className="filter-header-wrapper">
                <h3>Filters</h3>
                <button className="reset-btn" onClick={handleReset}>
                    Reset All
                </button>
            </div>

            <div className="filter-group">
                <h3 className="filter-header">Sort By</h3>
                <Select
                    value={filters.sort}
                    onChange={handleSortChange}
                    fullWidth
                    size="small"
                    className="sort-select"
                >
                    <MenuItem value="default">Relevance</MenuItem>
                    <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                    <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Popularity</MenuItem>
                    <MenuItem value="newest">Newest First</MenuItem>
                </Select>
            </div>

            <div className="filter-group">
                <h3>Price Range</h3>
                <div className="slider-wrapper">
                    <div className="price-input-group">
                        <div className="price-field">
                            <label>Min Price</label>
                            <input
                                type="text"
                                value={`₹${formatIndianPrice(filters.price[0])}`}
                                onChange={(e) => handlePriceInput('min', e.target.value)}
                            />
                        </div>
                        <span className="price-separator">-</span>
                        <div className="price-field">
                            <label>Max Price</label>
                            <input
                                type="text"
                                value={`₹${formatIndianPrice(filters.price[1])}`}
                                onChange={(e) => handlePriceInput('max', e.target.value)}
                            />
                        </div>
                    </div>
                    <Slider
                        value={filters.price}
                        onChange={handlePriceChange}
                        min={0}
                        max={100000}
                        step={1000}
                        valueLabelDisplay="off"
                        marks={[
                            { value: 0, label: '₹0' },
                            { value: 100000, label: '₹1L' }  // Updated format
                        ]}
                    />
                </div>
            </div>

            <div className="filter-group">
                <h3 onClick={() => toggleCollapse('categories')} className="filter-header">
                    Categories
                    {collapsed.categories ? 
                        <KeyboardArrowDownIcon className="collapse-icon" /> : 
                        <KeyboardArrowUpIcon className="collapse-icon" />
                    }
                </h3>
                <div className={`collapse-content ${collapsed.categories ? 'collapsed' : ''}`}>
                    <FormGroup>
                        {categories.map(category => (
                            <FormControlLabel
                                key={category}
                                control={
                                    <Checkbox 
                                        checked={filters.categories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                }
                                label={category}
                            />
                        ))}
                    </FormGroup>
                </div>
            </div>

            <div className="filter-group">
                <h3 onClick={() => toggleCollapse('brands')} className="filter-header">
                    Brands
                    {collapsed.brands ? 
                        <KeyboardArrowDownIcon className="collapse-icon" /> : 
                        <KeyboardArrowUpIcon className="collapse-icon" />
                    }
                </h3>
                <div className={`collapse-content ${collapsed.brands ? 'collapsed' : ''}`}>
                    <FormGroup>
                        {brands.map(brand => (
                            <FormControlLabel
                                key={brand}
                                control={
                                    <Checkbox 
                                        checked={filters.brands.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                }
                                label={brand}
                            />
                        ))}
                    </FormGroup>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;