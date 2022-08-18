import React, { useContext } from 'react';
import { userContext } from '../../App';
import Map from '../../images/map.jpg';
import MotorCycle from '../../images/Group 1151.png';
import Halmet from '../../images/Group 1152.png';
import './OrderComplete.css'
const OrderComplete = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <div className='container row mx-auto justify-content-evenly'>

            <div className="col-12 col-md-12 col-lg-7 col-xl-7" >
                <img src={Map} alt="map" className='map' />
            </div>
            <div className="col-12 col-md-12 col-lg-3 col-xl-3 ordercomplete mt-5 ml-auto" >
                <img src={MotorCycle} alt="motorCycle" />
                <ul className="location">
                    <li>
                        <h6>Your Location</h6>
                        <p>107 Rd No 8</p>
                    </li>
                    <li>
                        <h6>Shop Address</h6>
                        <p>Gulshan Plaza Restaurant GPR</p>
                    </li>
                </ul>
                <h2>09:30</h2>
                <h3>Estimated Delivery Time</h3>
                <div className="user">
                    <img src={Halmet} alt="Halemet" />
                    <div className="info">
                        <h4>Hamim</h4>
                        <p>Your Raider</p>
                    </div>
                </div>
                <button className='main-btn'>Contact</button>
            </div>
        </div>
    );
};

export default OrderComplete;