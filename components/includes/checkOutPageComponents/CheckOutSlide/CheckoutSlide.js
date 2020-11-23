import React, {useEffect, useState, useContext, useRef} from 'react';
import CheckOutSlideHeader from "./CheckOutSlideHeader/CheckOutSlideHeader";
//import './CheckoutSlide.scss'

const CheckoutSlide = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='checkout-slide'>
            <div className='checkout-container'>


                <CheckOutSlideHeader/>
            </div>
        </div>
    );
};
export default CheckoutSlide;
