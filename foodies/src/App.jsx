import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Menubar from './components/Menubar/Menubar';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import ExploreFood from './pages/ExploreFood/ExploreFood';
import FoodDetail from './pages/FoodDetails/FoodDetail';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import OrderStatus from './pages/OrderStatus/orderStatus';
import MyOrders from './pages/MyOrders/MyOrders';

import { StoreContext } from './context/StoreContext';

const App = () => {
  const { token } = useContext(StoreContext);

  return (
    <div>
      <Menubar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={token ? <PlaceOrder /> : <Login />} />
        <Route path="/login"  element={token ? <Home /> : <Login />} />
        <Route path="/register" element={token ? <Home /> : <Register />} />
        <Route path="/status" element={<OrderStatus />} />
        <Route path="/myorders" element={token ? <MyOrders /> : <Login />} />
      </Routes>
    </div>
  );
};

export default App;
