import React, {useEffect, useState, useContext, useRef} from 'react';
import CheckOutSlideHeader from "./CheckOutSlideHeader/CheckOutSlideHeader";
import {AppContext} from "../../../../context/AppContext";
import './CheckoutSlide.scss'

const CheckoutSlide = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    if (contextData.state.checkoutSlideEnable){
        return (
            <div className='checkout-slide'>
                <div className='checkout-container'>
                    <CheckOutSlideHeader/>
                    <p>checkout text test</p>
                </div>
            </div>
        );
    }else return null

};
export default CheckoutSlide;
