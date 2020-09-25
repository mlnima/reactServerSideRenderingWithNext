import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../../../context/AppContext";


const AddToBasket = props => {
    const contextData = useContext(AppContext);

    const onAddToBasketHandler = () => {
        if (props.productId) {
            contextData.setCheckOutData({
                ...contextData.checkOutData,
                items: [...new Set([...contextData.checkOutData.items, props.productId])]
            })
        }
    }

    if (props.render) {
        return (
            <div className='action-wide-button'>
                <button onClick={onAddToBasketHandler}><FontAwesomeIcon icon={faCartPlus} className='svg-logo-medium'/></button>
            </div>
        );
    } else return null

};
export default AddToBasket;
