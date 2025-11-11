import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './PlaceOrder.css'
import './../../main.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";


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
    const CAFE_LAT = import.meta.env.VITE_CAFE_LAT;
    const CAFE_LON = import.meta.env.VITE_CAFE_LON;

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const getUserLocation = async () => {
      try {
        let lat, lon;

        if (Capacitor.getPlatform() === "web") {
          // 🌐 Website mode
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                lat = pos.coords.latitude;
                lon = pos.coords.longitude;
                handleLocation(lat, lon);
              },
              (err) => {
                console.error("Web geolocation error:", err);
                alert("Please enable location access to place an order.");
                setCanOrder(false);
              },
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
          } else {
            alert("Geolocation not supported by your browser.");
            setCanOrder(false);
          }
        } else {
          // 📱 Android app mode (Capacitor)
          await Geolocation.requestPermissions();
          const pos = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
          });
          lat = pos.coords.latitude;
          lon = pos.coords.longitude;
          handleLocation(lat, lon);
        }

      } catch (err) {
        console.error("Location error:", err);
        alert("Please enable GPS or grant location permission.");
        setCanOrder(false);
      }
    };

    const handleLocation = (lat, lon) => {
      setUserLat(lat);
      setUserLon(lon);

      const distance = calculateDistance(CAFE_LAT, CAFE_LON, lat, lon);
      setDistance(distance);

      let charge = 0;
      if (distance > 10) {
        setCanOrder(false);
        alert("Sorry, delivery not available beyond 10 km.");
      } else if (distance > 5) {
        setCanOrder(true);
        charge = (distance - 5) * 15;
      }
      setDeliveryCharge(charge);
    };

    getUserLocation();
  }, []);




  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!canOrder) {
      return alert("❌ Orders are currently closed. Please try again later.");
    }

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
      payment: false,
      paymentMethod: paymentMethod === "online" ? "Online" : "COD",
    };

    try {
      setLoading(true);

      console.log("Order Payload:", orderPayload);


      if (paymentMethod === "cod") {

        const res = await axios.post(`${url}/api/order/create-cod-order`, orderPayload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.success) {
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
         
        };



      RazorpayCheckout.open(options);
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
            <hr />
            {Distance > 0 && (
              <p style={{ fontSize: "14px", color: "gray" }}>
                📍  Distance from café: {Distance.toFixed(2)} km
              </p>
            )}
          </div>


          <div className="payment-method">
            <h4>Payment Method</h4>
            <label>
              <input type="radio" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              Online Payment
            </label>
            <label>
              <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery
            </label>
          </div>
          {(Distance > 10) ? (
            <div className="divider">
              <h1 style={{ color: "red", marginTop: "10px" }}>Delivery is not available at your location. Delivery available only within 10 km</h1>
            </div>) : null}
          <hr />

          <button type='submit' disabled={loading || !canOrder} style={{
            opacity: loading || !canOrder ? 0.6 : 1,
            cursor: loading || !canOrder ? "not-allowed" : "pointer",
          }}>
            {loading
              ? "Placing Order..."
              : !canOrder
                ? "Orders Closed"
                : "Place Your Order"}
          </button>

          {!canOrder && <p style={{ color: "red", marginTop: "10px" }}>
            Orders are closed. ⏰ Will open at 10:00 AM ({timeLeft} left)
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
