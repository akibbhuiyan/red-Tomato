import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './component/Home/Home';
import SignUp from './component/Login/SignUp';
import FoodDetails from './component/FoodDetails/FoodDetails';
import Header from './component/Header/Header'
import { createContext, useState } from 'react';
import PlaceOrder from './component/PlaceOrder/PlaceOrder';

export const userContext = createContext()


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>email:{loggedInUser.email}</p>
      <Header />

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} exact />
        <Route path='/signin' element={<SignUp />} />
        <Route path='/login' element={<SignUp />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/food/:foodId' element={<FoodDetails />} />
      </Routes>
    </userContext.Provider>

  );
}

export default App;
