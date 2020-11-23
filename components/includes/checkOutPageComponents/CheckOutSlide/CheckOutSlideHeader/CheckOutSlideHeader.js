import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import './CheckOutSlideHeader.scss'

const CheckOutSlideHeader = props => {
    const [state, setState] = useState({});

    useEffect(() => {
    }, []);

    return (
        <div className='checkout-slide-header'>
            <button className='close-checkout-slide-button'> <FontAwesomeIcon icon={faTimes} className='navigation-mobile-button-logo'/></button>
        </div>
    );
};
export default CheckOutSlideHeader;
