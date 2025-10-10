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
import TermsOfService from './pages/termServices/Term&Services'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Testimony from './Components/Testimony/Testimony'
import LoginPopup from './Components/LoginPopUP/LoginPopUp'
import MyOrders from "./pages/MyOrders/MyOrders";




const App = () => {
   
  const[showLogin, setShowLogin] = useState(false);
  
  return (
    <>    
    {showLogin?<LoginPopup setShowLogin = {setShowLogin} />:<></>}
      <div className='app '>
        <Navbar setShowLogin = {setShowLogin} />
        <Routes>
          <Route path='/' element={ <><Home  /> <Testimony /> <AppDownload /> </>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsOfService />} />
        </Routes> 
       
       <footer className="footer"><Footer /> </footer> 
      </div>
      
    </>

  )
}

export default App
