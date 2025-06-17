import React, { useState, useEffect } from 'react';
import Product from './Product';
import ProductFilter from './ProductFilter';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const ProductList = ({ products }) => {
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleFilterChange = (filters) => {
        let filtered = [...products];

        // Apply filters first
        filtered = filtered.filter(product => {
            const priceMatch = product.newprice >= filters.price[0] && 
                             product.newprice <= filters.price[1];
            
            const categoryMatch = filters.categories.length === 0 || 
                                filters.categories.includes(product.category);
            
            const brandMatch = filters.brands.length === 0 || 
                             filters.brands.includes(product.brand);

            return priceMatch && categoryMatch && brandMatch;
        });

        // Apply sorting
        if (filters.sort !== 'default') {
            switch (filters.sort) {
                case 'price-low-high':
                    filtered.sort((a, b) => Number(a.newprice) - Number(b.newprice));
                    break;
                case 'price-high-low':
                    filtered.sort((a, b) => Number(b.newprice) - Number(a.newprice));
                    break;
                case 'rating':
                    filtered.sort((a, b) => {
                        const ratingA = Number(a.rating) || 0;
                        const ratingB = Number(b.rating) || 0;
                        const reviewsA = Number(a.numReviews) || 0;
                        const reviewsB = Number(b.numReviews) || 0;
                        // Consider both rating and number of reviews for popularity
                        return (ratingB * reviewsB) - (ratingA * reviewsA);
                    });
                    break;
                case 'newest':
                    filtered.sort((a, b) => {
                        const dateA = new Date(a.date || 0);
                        const dateB = new Date(b.date || 0);
                        return dateB - dateA;
                    });
                    break;
                default:
                    break;
            }
        }

        setFilteredProducts(filtered);
    };

    const renderContent = () => {
        if (filteredProducts.length === 0) {
            return (
                <div className="no-products">
                    <SentimentDissatisfiedIcon style={{ fontSize: 48, color: 'var(--first-color)' }} />
                    <h3>No Products Found</h3>
                    <p>Try adjusting your filter criteria</p>
                </div>
            );
        }

        return (
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        );
    };

    return (
        <div className="product-container">
            <ProductFilter onFilterChange={handleFilterChange} />
            {renderContent()}
        </div>
    );
};

export default ProductList;
