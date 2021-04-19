import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";

const Price = ({currency,price}) => {

    return (
        <div className='price-information'>
            <FontAwesomeIcon style={props.svgDefaultStyle} icon={currency === 'Usd' ? faDollarSign : faEuroSign} className='price-info-logo'/>
            <p>{price}</p>
        </div>
    )
};
export default Price;
