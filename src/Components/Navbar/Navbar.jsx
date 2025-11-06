import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import './../../main.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Profiler } from 'react'


const Navbar = () => {
   
    const [menu, setMenu ] =  useState("menu");

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
    const navigate = useNavigate();

    const logOut = () =>{
    
        localStorage.removeItem("token");
        setToken("");
        navigate("/");

    }

    return (
    <div className='navbar sticky top-0 z-50 bg-white shadow-subtle '>
      <div className="flex items-center  m-4 logo">
            <a href="/" className="flex items-center space-x-2 m-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">                          
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
            </div>
                <span className="text-2xl font-playfair font-bold text-primary ">FoodPoint</span>
            </a>
      </div>

      <ul className="navbar-menu">
        <a href='/' onClick = {()=>setMenu("home")} className={menu==="home"?"active":""}>Home</a>
        <a  href='#explore-menu' onClick = {()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href = '#app-download' onClick = {()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-App</a> 
        <a href = '#footer' onClick = {()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</a>  
      </ul>

        <div className="navbar-right">
            
            <div className="navbar-search-icon">
                <Link to='/Cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()?"dot":""}></div>
            </div>
           { !token?<button onClick={() => navigate("/login")}>Sign In</button>
           : <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="navbar-profile-menu">
                  <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
           </div>
           }
        </div>    
    </div>
  )
}

export default Navbar
