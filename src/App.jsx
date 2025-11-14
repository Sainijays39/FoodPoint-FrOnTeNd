import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import AppDownload from './Components/AppDownload/AppDownload'
import './index.css'
import './main.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
import { Preferences } from '@capacitor/preferences';
import { app } from '@capacitor/app';





const App = () => {

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // ✅ Load saved token from Capacitor Preferences on startup
  useEffect(() => {
    const loadAuthToken = async () => {
      const { value } = await Preferences.get({ key: 'auth_token' });
      if (value) {
        setToken(value);
      } else {
        setToken(null);
      }
    };
    loadAuthToken();
  }, []);

  useEffect(() => {
    app.addListener('appUrlOpen', (event) => {
      const url = event.url;
      console.log("App opened with URL:", url);

      if (url) {
        const path = url.split('.vercel.app').pop(); // e.g. /reset-password/token
        if (path) navigate(path);
      }
    });
  }, []);

  // ✅ Protected Route Wrapper
  const ProtectedRoute = ({ element }) => {
    if (!token) {
      navigate('/login');
      return null;
    }
    return element;
  };

  return (
    <>
      <div className='app '>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Home /> <Testimony /> <AppDownload /> </>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />

          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsOfService />} />
          <Route path="/CancellationRefund" element={<CancellationRefund />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* 🔒 Protected Routes */}
          <Route path='/placeorder' element={<ProtectedRoute element={<PlaceOrder />} />} />
          <Route path='/myorders' element={<ProtectedRoute element={<MyOrders />} />} />
        </Routes>

        <footer className="footer"><Footer /> </footer>
      </div>

    </>

  )
}

export default App
