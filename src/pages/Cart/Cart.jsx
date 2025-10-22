import React, { useContext } from 'react';
import './Cart.css';
import './../../main.css';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {Object.keys(cartItems).map((cartKey) => {
          if (cartItems[cartKey] > 0) {
            const [id, size] = cartKey.split("_");
            const item = food_list.find((product) => product._id === id);
            if (!item) return null;

            // ✅ Handle pizza sizes properly
            let price = item.price;
            if (item.sizes && size) {
              price = item.sizes[size];
            }
            return (
              <div key={cartKey}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name} {size ? `(${size})` : ""}</p>
                  <p>₹{price}</p>
                  <p>{cartItems[cartKey]}</p>
                  <p>₹{price * cartItems[cartKey]}</p>
                  <p onClick={() => removeFromCart(cartKey)} className='cross'>X</p>
                </div>

                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2 className='main-title'>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Charges (calculated at checkout)</p>
              <p>₹0</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
          </div>
          <Link to='/placeorder'><button>PROCEED TO CHECKOUT</button></Link>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
