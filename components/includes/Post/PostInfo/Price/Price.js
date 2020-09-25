import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";

const Price = props => {

    if (props.postType === 'product') {
        return (
            <div className='price-information'>
                <FontAwesomeIcon icon={props.currency === 'Usd' ? faDollarSign : faEuroSign} className='price-info-logo'/>

                <p>{props.price}</p>

            </div>
        )

    } else return null
};
export default Price;
