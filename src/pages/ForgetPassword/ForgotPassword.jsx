import React, { useState } from "react";
import axios from "axios";
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`, { email });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <div className="login-page">

      {/* ✅ Centered form just like Login box */}
      <div className="login-content">
        <div className="login-popup-container">
          <h2 className="black">Forgot Password</h2>
          <p style={{ textAlign: "center", marginBottom: "15px", color: "#555" }}>
            Enter your registered email and we’ll send you a reset link.
          </p>

          <form onSubmit={handleSubmit} className="login-popup-inputs">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
        </div>
      </div>
    </div>
  
  );
};

export default ForgotPassword;
