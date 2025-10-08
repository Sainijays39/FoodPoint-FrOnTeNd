import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'
import './../../main.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';


const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(Data => ({ ...Data, [name]: value }))
  }


  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return alert("Your cart is empty!");


    const orderPayload = {
      items: Object.entries(cartItems)
        .filter(([cartKey, qty]) => {
          if (!qty || qty <= 0) return false;

          const [id, size] = (cartKey || "").split("_");
          // Reject if id is missing, empty, "undefined", or not found in food_list
          const isValidId = id && id !== "undefined" && food_list.some(p => String(p._id) === String(id));
          return isValidId;
        })
        .map(([cartKey, qty]) => {
          const [id, size] = (cartKey || "").split("_");
          const product = food_list.find(p => String(p._id) === String(id));
          const selectedPrice = product?.sizes?.[size] || product?.price || 0;

          return {
            id,
            name: product?.name || "Unknown",
            category: product?.category || "Other",
            size,
            qty,
            price: selectedPrice,
          };
        }),


      amount: getTotalCartAmount(), // convert to paise for Razorpay
      address: {
        name: data.firstName + " " + data.lastName,
        street: data.street,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        phone: data.phone
      }
    };

    try {
      setLoading(true);

      // 1️⃣ Create order in backend and get Razorpay orderId
      const res = await axios.post(`${url}/api/order/create-order`, orderPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const { orderId, amount } = res.data; // _id = order id in your DB
      console.log(orderId, amount);
      // 2️⃣ Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "Food Point",
        description: "Test Order",
        order_id: orderId,             // optional: you can use Razorpay orderId from backend
        handler: async function (res) {
          // 3️⃣ On payment success, update payment status in backend
          try {
            const verifyRes = await axios.post(`${url}/api/order/verify-payment`, {
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature
            },
              {

                headers: { Authorization: `Bearer ${token}` }
              }
            );



            if (verifyRes.data.success) {
              alert("Payment Successful! Order Completed.");
              setOrderResponse(verifyRes.data.order);
              navigate("/myorders");
            } else {
              alert("Payment verification failed!");
              navigate("/");
            }
          } catch (err) {
            console.error(err);
            alert("Error verifying payment.");
          }
        },

        prefill: {
          name: `${data.firstName} ${data.lastName}` || "Test User",
          email: data.email || "test@example.com",
          contact: data.phone || "9999999999"
        },
        theme: { color: "#F37254" }
      };



      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])


  return (
    <form className="place-order" onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Details</p>
        <div className="multi-fields">
          <input type="text" required name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
          <input type="text" required name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
        </div>
        <input type="email" required name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input type="text" required name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input type="text" required name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input type="text" required name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' required type="text" onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
        </div>
        <input type="text" required name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2 className='main-title'>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 0}</p>
            </div>
          </div>
          <button type='submit' disabled={loading}>{loading ? "Placing Order..." : "Place Your Order"}</button>
        </div>
        {orderResponse && (
          <div className="order-confirmation">
            <h4>Order Confirmation:</h4>
            <pre>{JSON.stringify(orderResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </form>

  )
}

export default PlaceOrder
