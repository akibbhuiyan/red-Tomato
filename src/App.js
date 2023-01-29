import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './component/Home/Home';
import SignUp from './component/Login/SignUp';
import FoodDetails from './component/FoodDetails/FoodDetails';
import Header from './component/Header/Header'
import { createContext, useState } from 'react';
import PlaceOrder from './component/PlaceOrder/PlaceOrder';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import OrderComplete from './component/OrderComplete/OrderComplete';

export const userContext = createContext()


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Header />

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} exact />
        <Route path='/cart' element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
        <Route path='/signin' element={<SignUp />} />
        <Route path='/login' element={<SignUp />} />
        <Route path='/placeorder' element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
        <Route path='/orderComplete' element={<PrivateRoute><OrderComplete /></PrivateRoute>} />
        <Route path='/food/:foodId' element={<FoodDetails />} />

      </Routes>
    </userContext.Provider>

  );
}

export default App;
