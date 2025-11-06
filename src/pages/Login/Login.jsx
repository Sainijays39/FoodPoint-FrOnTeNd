import React, { useContext, useState } from 'react';
import './Login.css';
import './../../main.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const { url, token, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
      const payload = currState === "Login"
        ? { email: data.email, password: data.password }
        : { name: data.name, email: data.email, password: data.password };

      const response = await axios.post(`${url}${endpoint}`, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    
    
    <div className="loginpage-container">
      
      <form onSubmit={onLogin} className="loginpage-card">
        <h2 className="loginpage-title">{currState}</h2>

        {currState === "Login" ? (
          <>
            <h3 className="login-subtitle">Welcome Back!</h3>
            <p className="login-desc">Login to continue your food journey</p>
          </>
        ) : (
          <>
            <h3 className="login-subtitle">Join FoodPoint</h3>
            <p className="login-desc">Create your account and start your food journey</p>
          </>
        )}

        <div className="loginpage-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onHandleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={onHandleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={data.password}
            onChange={onHandleChange}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          {currState === "Sign Up" ? "Create Your FoodPoint Account" : "Login Into FoodPoint"}
        </button>

        {currState === "Login" && (
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="forgot-btn"
          >
            Forgot Password
          </button>
        )}

        <div className="login-conditions">
          <input type="checkbox" required />
          <p>
            I agree to the{" "}
            <span className="link">
              <Link to="/terms">Terms of Service</Link>
            </span>{" "}
            and{" "}
            <span className="link">
              <Link to="/privacypolicy">Privacy Policy</Link>.
            </span>
          </p>
        </div>

        <p className="toggle-link">
          {currState === "Login" ? (
            <>
              Create a New Account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
            </>
          ) : (
            <>
              Already Have an Account?{" "}
              <span onClick={() => setCurrState("Login")}>Login Here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
