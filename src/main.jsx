import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import { App as CapacitorApp } from '@capacitor/app';


CapacitorApp.addListener('appUrlOpen', (data) => {
  const url = data.url;
  console.log('Deep link received:', url);
  if (url.includes('/reset-password')) {
    const token = url.split('/reset-password/')[1];
    // Redirect inside your app
    window.location.href = `/reset-password/${token}`;
  }
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App /> 
    </StoreContextProvider>
     
  </BrowserRouter>  
)
