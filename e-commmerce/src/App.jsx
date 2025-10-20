import { Routes,Route } from 'react-router-dom';
import { useState,useEffect } from 'react';
import HomePage from './Pages/home/Homepage';
import CheckoutPage from './Pages/checkout/CheckoutPage'; 
import Orders from './Pages/OrdersPage';
import './App.css';
import TrackingPage from './Pages/TrackingPage';
import axios from 'axios';
function App() {
  const [cart ,setCart]= useState([]);

  async function loadCart(){
      const response = await axios.get('http://localhost:3000/api/cart-items?expand=product')
      setCart(response.data);
    }
  useEffect(()=>{
    loadCart();
  },[]);
  return (
    <>
      <Routes>
         <Route index  element={ <HomePage cart={cart} loadCart={loadCart} />} />
         <Route path='/checkoutPage' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
         <Route path='/orders' element={<Orders cart={cart} loadCart={loadCart} />} />
         <Route path='/trackingPage' element={<TrackingPage cart={cart} />} />
      </Routes>
    </>
  )
}

export default App
