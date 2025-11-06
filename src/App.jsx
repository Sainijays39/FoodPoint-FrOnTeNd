import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import AppDownload from './Components/AppDownload/AppDownload'
import './index.css'
import './main.css'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/home/Home'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import TermsOfService from './pages/TermAndServices/TermAndServices'
import CancellationRefund from './pages/Cancelation/Cancelation'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Testimony from './Components/Testimony/Testimony'
import Login from './pages/Login/Login'
import MyOrders from "./pages/MyOrders/MyOrders";
import ResetPassword from './pages/ResetPassword/ResetPassword'
import ForgotPassword from './pages/ForgetPassword/ForgotPassword'



const App = () => {
  
  return (
    <>    
      <div className='app '>
        <Navbar />
        <Routes>
          <Route path='/' element={ <><Home  /> <Testimony /> <AppDownload /> </>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsOfService />} />
          <Route path="/CancellationRefund" element={<CancellationRefund />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes> 
       
       <footer className="footer"><Footer /> </footer> 
      </div>
      
    </>

  )
}

export default App
