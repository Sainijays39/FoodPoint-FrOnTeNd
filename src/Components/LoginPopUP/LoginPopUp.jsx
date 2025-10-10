import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import './../../main.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const LoginPopup = ({ setShowLogin }) => {

    const { url } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { token, setToken } = useContext(StoreContext);

    const onHandleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            let newUrl = url;
            let payload = {};

            if (currState === "Login") {
                newUrl += "/api/user/login";
                payload = { email: data.email, password: data.password };
            } else {
                newUrl += "/api/user/register";
                payload = { name: data.name, email: data.email, password: data.password };
            }

            const response = await axios.post(newUrl, payload);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            if (err.response) {
                console.error("Backend error:", err.response.data);
                alert(err.response.data.message || "Request failed");
            } else {
                console.error("Unexpected error:", err.message);
                alert("Something went wrong");
            }
        }
    };



    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2 className='black'>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Login" ? <div className="text-center mb-6">
                        <h3 className="text-2xl font-playfair font-bold text-text-primary mb-2">Welcome Back!</h3>
                        <p className="text-text-secondary">Login to continue your food journey</p>
                    </div>
                        :
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-playfair font-bold text-text-primary mb-2">Join FoodPoint</h3>
                            <p className="text-text-secondary">Create your account and start your food journey</p>
                        </div>}
                    {currState === "Login" ? <></>
                        :

                        <input type="text" name="name" onChange={onHandleChange} value={data.name} placeholder='Your Name' required />}
                    <input type="email" name='email' onChange={onHandleChange} value={data.email} placeholder='Your Email' required />
                    <input type="Password" name='password' onChange={onHandleChange} value={data.password} placeholder='Your Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Your FoodPoint Account" : "Login Into FoodPoint"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>I agree to the <span className='text-tomato'><Link to="/terms">Terms of Service</Link></span> and <span className='text-tomato'><Link to="/privacypolicy">Privacy Policy</Link>.</span></p>
                </div>
                {
                    currState === "Login"
                        ? <p>Create A New Account? <span className=' pointer ' onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                        : <p>Already Have An Account?<span className=' pointer' onClick={() => setCurrState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
