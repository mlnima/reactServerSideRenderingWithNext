import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../../../context/AppContext";

const CheckOutSlideHeader = props => {
    const contextData = useContext(AppContext);
    const onCloseCheckoutSlideHandler = ()=>{
        contextData.dispatchState({
            ...contextData.state,
            checkoutSlideEnable:false
        })
    }
    return (
        <div className='checkout-slide-header'>
            <button className='close-checkout-slide-button' onClick={onCloseCheckoutSlideHandler}> <FontAwesomeIcon icon={faTimes} className='navigation-mobile-button-logo'/></button>
        </div>
    );
};
export default CheckOutSlideHeader;
