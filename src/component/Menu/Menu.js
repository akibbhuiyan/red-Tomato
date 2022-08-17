import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    const { name, shortDes, price, img, id } = props.menuitem;
    return (

        <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4'>

            <Link to={'/food/' + id}>
                <div className="item">
                    <img src={img} alt={name} />
                    <h3>{name}</h3>
                    <h4>{shortDes}</h4>
                    <span>${price}</span>
                </div>
            </Link>

        </div>
    );
};

export default Menu;