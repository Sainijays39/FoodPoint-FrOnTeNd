import React, { useState, useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, sizes, price, description, image, category }) => {

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const [selectedSize, setSelectedSize] = useState(null);

  // Check if the item is Pizza
  const isPizza = category && category.toLowerCase() === "pizza";
  if (isPizza && sizes && typeof sizes === "string") {
    try {
      sizes = JSON.parse(sizes);
    } catch (e) {
      sizes = {};
    }
  }
  // Unique key for cart: if pizza, include size
  const cartKey = isPizza && selectedSize ? `${id}_${selectedSize}` : id;

  // Price logic
  let displayPrice;
  if (isPizza) {
    if (selectedSize && sizes && sizes[selectedSize]) {
      displayPrice = sizes[selectedSize]; // Show selected size price
    } else {
      displayPrice = "Choose size"; // Show message until size selected
    }
  } else {
    displayPrice = price; // Normal items just show price
  }

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={url + "/images/" + image} alt='' className='food-item-image' />
        <div className='food-item-action'>
          {!cartItems[cartKey] ? (
            <button
              className='add-to-cart-btn'
              onClick={() => {
                if (isPizza && !selectedSize) {
                  alert("Please select a size first!");
                  return;
                }
                addToCart(cartKey, isPizza ? sizes[selectedSize] : price);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <div className='food-item-quantity-controller'>
              <button className='quantity-btn' onClick={() => removeFromCart(cartKey)}>-</button>
              <span className='quantity-value'>{cartItems[cartKey]}</span>
              <button className='quantity-btn' onClick={() => addToCart(cartKey, isPizza ? sizes[selectedSize] : price)}>+</button>
            </div>
          )}
        </div>
      </div>

      <div className="food-item-info">
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>

        {/* ✅ Show size buttons only for Pizza */}
        {isPizza && sizes && Object.keys(sizes).length > 0 && (
          <div className="size-options">
            {Object.keys(sizes).map((sizeKey) => (
              sizes[sizeKey] > 0 && ( // ✅ Only show if price > 0
                <button
                  key={sizeKey}
                  className={`size-btn ${selectedSize === sizeKey ? "active" : ""}`}
                  onClick={() => setSelectedSize(sizeKey)}
                >
                  {sizeKey} - ₹{sizes[sizeKey]}
                </button>
              )
            ))}
          </div>
        )}

        <p className='food-item-price'>₹{displayPrice}</p>
      </div>
    </div>
  );
};

export default FoodItem;
