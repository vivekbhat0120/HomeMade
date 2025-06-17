import React from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Tooltip from "@mui/material/Tooltip";

import { useCart } from "../CartContext/CartContext";
import { useWishlist } from "../WishlistContext/WishlistContext";

const Product = (props) => {
  const { product, tag } = props; // Destructure product and tag from props
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // If no product data is passed, render nothing or a placeholder
  if (!product) {
    return null;
  }

  // Prepare productInfo for cart/wishlist actions using the passed 'product' prop
  const productInfo = {
    id: product.id,
    name: product.name,
    price: product.newprice, // Assuming newprice is the one to use for cart
    oldprice: product.oldprice, // Add oldprice to be available in cart
    image: product.image,
    category: product.category,
    brand: product.brand,
    rating: product.rating,
  };
  const isDaily = props.daily || false;

  return (
    <div className={isDaily ? "dailyBestThumb" : "productThumb"}> {/* Different styles for daily best sells */}
      {/* Display product tag if available */}
      {tag !== null && tag !== undefined && (
        <span className={`badge ${tag}`}>{tag}</span>
      )}

      {/* Product image with overlay actions */}
      <Link to={`/product-details/${product.id}`}>
        <div className="imgWrapper">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
          <div className="overlay">
            <ul className="list">
              {/* Add to Wishlist */}
              <li>
                <Tooltip title="Add to Wishlist" placement="top">
                  <Link // Keep as Link or change to Button if no navigation
                    to="#" // Add a placeholder href or handle navigation appropriately
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation if it's a Link
                      addToWishlist(productInfo);
                    }}
                  >
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                  </Link>
                </Tooltip>
              </li>
              {/* Compare Product */}
              <li>
                <Tooltip title="Compare" placement="top">
                  <Link to="#"><CompareArrowsOutlinedIcon fontSize="small" /></Link>
                </Tooltip>
              </li>
              {/* Quick View */}
              <li>
                <Tooltip title="Quick View" placement="top">
                  <Link to="#"><RemoveRedEyeOutlinedIcon fontSize="small" /></Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </Link>

      {/* Product information */}
      <div className="info">
        {/* Category name */}
        <span className="catName">{product.category}</span>
        {/* Product title */}
        <h4 className="title">
          <Link to={`/product-details/${product.id}`}>{product.name}</Link>
        </h4>
        {/* Product rating */}
        <div className="rating-wrapper">
          <Rating
            name={`product-rating-${product.id}`}
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <span>({product.numReviews})</span>
        </div>
        {/* Brand name */}
        <span className="brand">
          by <Link to={`/brand/${product.brand.toLowerCase()}`}>{product.brand}</Link>
        </span>

        {/* Price section */}
        <div className="priceSection">
          <div className="price-wrapper">
            {product.oldprice && product.oldprice > product.newprice && (
              <span className="discountPercentage">
                {Math.round(((product.oldprice - product.newprice) / product.oldprice) * 100)}% Off
              </span>
            )}
            <div className="price-row">
              <span className="price">Rs.{product.newprice}</span>
              {product.oldprice && product.oldprice > product.newprice && (
                <span className="oldPrice">Rs.{product.oldprice}</span>
              )}
            </div>
          </div>
          <Button onClick={() => addToCart(productInfo)}>
            <ShoppingCartOutlinedIcon fontSize="small" />
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
