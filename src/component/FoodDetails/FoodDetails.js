import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Menu from '../MenuItem/ManeuItem';
import { FiShoppingCart } from 'react-icons/fi'
import './FoodDetails.css'
const FoodDetails = () => {
    const { foodId } = useParams()
    const [FoodDetails, setFoodDetails] = useState({})
    useEffect(() => {
        const foodinfo = Menu.find(pd => pd.id === Number(foodId))
        setFoodDetails(foodinfo)
    }, [foodId])

    const { name, img, description, price } = FoodDetails;
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
        <div className='meal-container row'>
            <div className="meal_info col-12 col-md-12 col-lg-5 col-xl-5">
                <h1>{name}</h1>
                <p>{description}</p>
                <div className="price-quantity">
                    <span>${price}</span>
                    <div className="quantity">
                        <button onClick={handleDeccrease}>-</button>
                        <h3>{input}</h3>
                        <button onClick={handleIncrease}>+</button>
                    </div>
                </div>

                <Link to='/placeorder'> <button className='main-btn'><FiShoppingCart /> Add</button></Link>
            </div>
            <div className="mealimg col-12 col-md-12 col-lg-5 col-xl-5">
                <img src={img} alt={name} />
            </div>
        </div>
    );
};

export default FoodDetails;