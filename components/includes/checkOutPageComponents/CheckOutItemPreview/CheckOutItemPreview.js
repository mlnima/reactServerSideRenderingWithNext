import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ItemCountUI from "./ItemCountUI";
import {AppContext} from "../../../../context/AppContext";

const CheckOutItemPreview = props => {
    const contextData = useContext(AppContext);

    const onRemoveItemFromBasketHandler = () => {
        const items = contextData.checkOutData.items.filter(i => i.productId !== props.productId)
        contextData.setCheckOutData({
            ...contextData.checkOutData,
            items
        })
        localStorage.setItem('checkOutItems', JSON.stringify(items))
    }

    const FullDataForFinalPage = () => {
        return (
            <>
                <span>{props.eCommerce?.data?.currencySymbol ?? ' € ' }{Number(props.price) * Number(props.count) }</span>
                <div className='count-remove'>
                    <button className='check-out-item-remove' onClick={() => onRemoveItemFromBasketHandler()}><FontAwesomeIcon className='check-out-item-remove-icon'
                                                                                                                               icon={faTrash}/></button>
                    <ItemCountUI count={props.count} productId={props.productId}/>
                </div>

            </>
        )
    }

    return (
        <div className='check-out-item-preview'>
            <img src={props.mainThumbnail} alt={props.title}/>
            <div className='check-out-item-preview-title'>
                <h4>{props.title} </h4>
                <FullDataForFinalPage/>
            </div>
        </div>
    );
};
export default CheckOutItemPreview;
