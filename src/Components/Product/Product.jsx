import React from "react";
import "./Product.scss";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Tooltip from "@mui/material/Tooltip";

import Product1 from "../../assets/images/bag.png";

const Product = (props) => {
  return (
    <div className="productThumb">
      {/* Display product tag if available */}
      {props.tag !== null && props.tag !== undefined && (
        <span className={`badge ${props.tag}`}>{props.tag}</span>
      )}

      {/* Product image with overlay actions */}
      <Link to="/product-details">
        <div className="imgWrapper">
          <img src={Product1} alt="Running Shoes" loading="lazy" />
          <div className="overlay">
            <ul className="list">
              {/* Add to Wishlist */}
              <li>
                <Tooltip title="Add to Wishlist" placement="top">
                  <Link>
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                  </Link>
                </Tooltip>
              </li>
              {/* Compare Product */}
              <li>
                <Tooltip title="Compare" placement="top">
                  <Link>
                    <CompareArrowsOutlinedIcon fontSize="small" />
                  </Link>
                </Tooltip>
              </li>
              {/* Quick View */}
              <li>
                <Tooltip title="Quick View" placement="top">
                  <Link>
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </Link>

      {/* Product information */}
      <div className="info">
        {/* Category name */}
        <span className="catName">Bags</span>
        {/* Product title */}
        <h4 className="title">
          <Link to="/product-details">School Bag</Link>
        </h4>
        {/* Product rating */}
        <Rating
          name="half-rating-read"
          defaultValue={4.5}
          precision={0.5}
          readOnly
          size="small"
        />
        {/* Brand name */}
        <span className="brand">
          by <Link to="/brand/puma">PUMA</Link>
        </span>

        {/* Price section */}
        <div className="priceSection">
          <div className="d-flex align-items-center">
            {/* Current price */}
            <span className="price text-g font-weight-bold">Rs.1599</span>
            {/* Old price */}
            <span className="oldPrice">2199</span>
          </div>
          {/* Add to cart button */}
          <Button>
            <ShoppingCartOutlinedIcon fontSize="small" />
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
