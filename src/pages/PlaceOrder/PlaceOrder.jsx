import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './PlaceOrder.css'
import './../../main.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const PlaceOrder = () => {

  const Token = localStorage.getItem("token");
  if (!Token) return alert("Please login first!");

  const decoded = jwtDecode(Token);
  const userId = decoded.id || decoded.userId || decoded._id;
  const user = { _id: userId };

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  const [canOrder, setCanOrder] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  const [DeliveryCharge, setDeliveryCharge] = useState(0);
  const [Distance, setDistance] = useState(0);


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

  // ⏰ Check if current time is within 10 AM - 10 PM
  const isWithinOrderTime = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 22;
  }

  // ✅ Fetch admin toggle and check time
  useEffect(() => {
    const checkOrderStatus = async () => {
      try {
        const res = await axios.get(`${url}/api/site/status`);
        const isAdminActive = res.data.isActive;
        setCanOrder(isAdminActive && isWithinOrderTime());
      } catch (err) {
        console.error(err);
        setCanOrder(false); // fallback: disable if error
      }
    }

    checkOrderStatus();
    const interval = setInterval(checkOrderStatus, 10000);
    return () => clearInterval(interval);
  }, [url]);

  // Countdown timer
  const calculateTimeLeft = () => {
    const now = new Date();
    const hour = now.getHours();
    let target = new Date();

    if (!canOrder) {
      if (hour >= 22) target.setDate(target.getDate() + 1);
      target.setHours(10, 0, 0, 0);
    } else {
      target.setHours(22, 0, 0, 0);
    }

    const diff = target - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(calculateTimeLeft());
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [canOrder]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLon = pos.coords.longitude;
          setUserLat(userLat);
          setUserLon(userLon);
        },
        (err) => {
          console.error("Location access denied:", err);
          alert("Please enable GPS to place an order.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  }, []);



  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!isWithinOrderTime()) {
      return alert("⏰ Orders can only be placed between 10:00 AM and 10:00 PM.");
    }

    if (cartItems.length === 0) return alert("Your cart is empty!");

    if (!getTotalCartAmount() || getTotalCartAmount() === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!userLat || !userLon) {
      alert("Unable to get your location. Please enable GPS.");
      return;
    }

    const orderPayload = {
      userId: user._id,           // REQUIRED
      items: Object.entries(cartItems)
        .filter(([cartKey, qty]) => {
          if (!qty || qty <= 0) return false;
          const [id, size] = (cartKey || "").split("_");
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
      amount: getTotalCartAmount(),          // must be number
      address: {
        name: `${data.firstName} ${data.lastName}`,
        street: data.street,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        phone: data.phone
      },
      userLocation: {
        latitude: userLat,
        longitude: userLon,
      },
      payment: false,
      paymentMethod: paymentMethod === "online" ? "Online" : "COD",
    };

    console.log("📦 Order Payload:", orderPayload);

    try {
      setLoading(true);

      const { razorpayOrderId, amount, deliveryCharge, distance } = res.data;
      setDeliveryCharge(deliveryCharge);
      setDistance(distance);

      if (paymentMethod === "cod") {

        const res = await axios.post(`${url}/api/order/create-cod-order`, orderPayload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.success) {
          const { deliveryCharge, distance } = res.data;
          setDeliveryCharge(deliveryCharge || 0);
          setDistance(distance || 0);

          alert("Order placed successfully (Cash on Delivery)");
          navigate("/myorders");
        }
        return;
      } else {

        const res = await axios.post(`${url}/api/order/create-order`, orderPayload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const { razorpayOrderId, amount } = res.data;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount,
          currency: "INR",
          name: "Food Point",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: async function (res) {
            console.log({
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature
            });

            try {
              const verifyRes = await axios.post(`${url}/api/order/verify-payment`, {
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature
              }, {
                headers: { Authorization: `Bearer ${token}` }
              });



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
          theme: { color: "#F37254" },
          method: {
            netbanking: true,
            card: true,
            upi: true,
            wallet: true,
          },
        };



        const rzp = new window.Razorpay(options);
        rzp.open();
      }

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
              <p>₹{DeliveryCharge?.toFixed(2) || 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{(getTotalCartAmount() + (DeliveryCharge || 0)).toFixed(2)}</p>
            </div>

            {Distance > 0 && (
              <p style={{ fontSize: "14px", color: "gray" }}>
                📍  Distance from café: {Distance.toFixed(2)} km
              </p>
            )}
          </div>

          <hr />
          <div className="payment-method">
            <h4>Payment Method</h4>
            <label>
              <input type="radio" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              Online Payment (Razorpay)
            </label>
            <label>
              <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery
            </label>
          </div>

          <button type='submit' disabled={loading || !canOrder}>
            {loading
              ? "Placing Order..."
              : !canOrder
                ? "Orders Closed"
                : "Place Your Order"}
          </button>

          {!canOrder && <p style={{ color: "red", marginTop: "10px" }}>
            Orders are closed. ⏰ Will open Soon!
          </p>}
          {canOrder && <p style={{ color: "green", marginTop: "10px" }}>
            Orders are open! Closing in: {timeLeft}
          </p>}
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
