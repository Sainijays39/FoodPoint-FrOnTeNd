import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "../MyOrders/MyOrders.css"

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      const res = await axios.get(`${url}/api/order/userorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>{
                order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + (item.size ? ` (${item.size})` : "") + " X " + item.qty


                  } else {
                    return item.name + (item.size ? ` (${item.size})` : "") + " X " + item.qty + " , "
                  }
                })
              }</p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
