import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import Header from '../Header/Header';
import { useForm } from "react-hook-form";
import './PlaceOrder.css'
import demo from '../../images/burrito-chicken-close-up-461198.png'
const PlaceOrder = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { register, formState: { errors } } = useForm();

    const [input, setInput] = useState(1);

    const handleIncrease = () => {
        setInput(input + 1)
    }
    const handleDeccrease = () => {
        if (input > 0) {
            setInput(input - 1)
        } else {
            setInput(input)
        }
    }
    return (
        <div className='container row mx-auto'>
            <div className="col-12 col-md-12 col-lg-6 col-xl-6" >
                <form className='shiping w-100'>

                    <input {...register("address", { required: true })} placeholder='Delivey States' />
                    {errors.address && <span>This field is required</span>}
                    <input {...register("readNo", { required: true })} placeholder='Address' />
                    {errors.readNo && <span>This field is required</span>}
                    <input {...register("flat", { required: true })} placeholder='Flat,Suit or Floor' />
                    {errors.flat && <span>This field is required</span>}
                    <input {...register("name", { required: true })} placeholder='Buissness Name' />
                    {errors.name && <span>This field is required</span>}
                    <input {...register("deliveruInstruction", { required: true })} placeholder='Add Delivery Instruction' />
                    {errors.deliveruInstruction && <span>This field is required</span>}
                    <input type="submit" value='Save and Continue' className='main-btn' />
                </form>
            </div>
            <div className="col-12 col-md-12 col-lg-5 col-xl-5 placeOrder" >
                <p>From <span>Gulshan Plaza Restaurant GPR</span></p>
                <p>Arriving in 20-30 min</p>
                <p>107 Rd No 8</p>
                <div className='product'>
                    <div className="row">
                        <div className="col-7">
                            <div className="row">
                                <div className="col-6 foodimg">
                                    <img src={demo} alt="" />
                                </div>
                                <div className="col-6">
                                    <h4>Butter Naan</h4>
                                    <h3>$40</h3>
                                    <span>Delivery Free</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-5 squantity">
                            <div className="shiping-quantity">
                                <button onClick={handleDeccrease}>-</button>
                                <h3>{input}</h3>
                                <button onClick={handleIncrease}>+</button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="cart">
                    <table>
                        <tbody>
                            <tr>
                                <td>Subtotal .<span>4 item</span></td>
                                <td>$40</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td>$5</td>
                            </tr>
                            <tr>
                                <td>Delivery Fee</td>
                                <td>$2</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>$100</td>
                            </tr>
                        </tbody>
                    </table>
                    <button disabled>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;