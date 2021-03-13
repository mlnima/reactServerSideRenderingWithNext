import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ItemCountUI from "./ItemCountUI";
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";

const CheckOutItemPreview = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const locale = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || ''
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
                <span>{props.eCommerce?.data?.currencySymbol ?? ' € '}{Number(props.price) * Number(props.count)}</span>
                {props.shippingCost ?
                    <>
                     <span>{props?.eCommerce?.data?.translations?.[locale]?.shippingCostText || 'Shipping Cost'} :</span>
                     <span>
                        + {props.eCommerce?.data?.currencySymbol ?? ' € '} {props.shippingCost}
                    </span>
                    </>
                    : null}
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
                <h4>{props?.translations?.[locale]?.title || props.title} </h4>
                <FullDataForFinalPage/>
            </div>
        </div>
    );
};
export default CheckOutItemPreview;
