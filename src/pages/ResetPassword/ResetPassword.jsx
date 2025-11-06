import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password/${token}`, { newPassword: password });
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (


      <div className="login-page">

      {/* ✅ Centered form just like Login box */}
      <div className="login-content">
        <div className="login-popup-container">
          <h2 className="black">Reset Password</h2>
          <p style={{ textAlign: "center", marginBottom: "15px", color: "#555" }}>
            Enter your new password.
          </p>

          <form onSubmit={handleReset} className="login-popup-inputs">
            <input
              type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
