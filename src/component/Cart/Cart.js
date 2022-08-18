import React from 'react';
import { GiCrossedBones } from 'react-icons/gi';
const Cart = (props) => {
    const { img, name, price, quantity, id } = props.fooditem


    return (
        <>

            <div className='product'>
                <div className="row">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-6 foodimg">
                                <img src={img} alt="" />
                            </div>
                            <div className="col-6">
                                <h4>{name}</h4>
                                <h3>{price}</h3>
                                <span>Delivery Free</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 squantity">
                        <button className='crossIcon' onClick={() => props.removeFood(id)} ><GiCrossedBones /></button>
                        <h3>Quantity:{quantity}</h3>
                    </div>

                </div>
            </div>


        </>
    );
};

export default Cart;