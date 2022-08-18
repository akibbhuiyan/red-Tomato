import React, { useEffect, useState } from 'react';
import './PlaceOrder.css'
import { getDatabaseCart, removeFromDatabaseCart } from '../LocalStorage/fakeDb';
import Menu from '../MenuItem/ManeuItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
const PlaceOrder = () => {


    useEffect(() => {
        const savedFood = getDatabaseCart();
        const foodId = Object.keys(savedFood);
        const cartFood = foodId.map(existingid => {
            const product = Menu.find(food => food.id === Number(existingid))
            product.quantity = savedFood[existingid];
            return product;
        })
        setFood(cartFood)
    }, [])
    const [food, setFood] = useState([])
    // console.log(food)
    const formatNumber = num => {
        const pricision = num.toFixed(2)
        return Number(pricision)
    }
    let total = 0;
    for (let i = 0; i < food.length; i++) {
        const eachfood = food[i];
        total = total + eachfood.price * eachfood.quantity
    }
    let delivery = 0;
    if (total > 35) {
        delivery = 0
    }
    else if (total > 15) {
        delivery = 4.99;
    }
    else if (total > 0) {
        delivery = 12.99;
    }
    let tax = total / 10;
    const grandTotal = total + delivery + tax;


    const removeFood = (productid) => {
        const newCart = food.filter(fd => fd.id !== productid)
        setFood(newCart)
        removeFromDatabaseCart(productid)
    }
    const [state, setState] = useState({
        disabled: true
    });
    const handleChange = (e) => {
        e.preventDefault()
        setState({
            disabled: false
        })
    }
    return (
        <div className='container row mx-auto'>

            <div className="col-12 col-md-12 col-lg-6 col-xl-6" >
                <form className='shiping w-100' onSubmit={handleChange} >
                    <input type='text' placeholder='Delivey States' required />
                    <input type='text' placeholder='Address' required />
                    <input type='text' placeholder='Flat,Suit or Floor' required />
                    <input type='text' placeholder='Buissness Name' required />
                    <input type='text' placeholder='Add Delivery Instruction' required />
                    <input type="submit" className='main-btn' value='Save and Continue' />
                </form>
            </div>
            <div className="col-12 col-md-12 col-lg-5 col-xl-5 placeOrder mt-5" >
                <p>From <span>Gulshan Plaza Restaurant GPR</span></p>
                <p>Arriving in 20-30 min</p>
                <p>107 Rd No 8</p>
                {
                    food.map(fd => <Cart fooditem={fd} key={fd.id} removeFood={removeFood} ></Cart>)
                }
                <div className="cart">
                    <table>
                        <tbody>
                            <tr>
                                <td>Subtotal ·<span>{food.length} item</span></td>
                                <td>${formatNumber(total)}</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td>${formatNumber(tax)}</td>
                            </tr>
                            <tr>
                                <td>Delivery Fee</td>
                                <td>${formatNumber(delivery)}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>${formatNumber(grandTotal)}</td>
                            </tr>
                        </tbody>
                    </table>
                    {state.disabled ? <button disabled={state.disabled}>Place Order</button> :

                        <Link to='/orderComplete'> <button disabled={state.disabled}>Place Order</button></Link>

                    }
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;