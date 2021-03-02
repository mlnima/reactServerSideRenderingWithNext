import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ItemCountUI from "./ItemCountUI";
import {AppContext} from "../../../../context/AppContext";

const CheckOutItemPreview = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        postData: {}
    });

    const onRemoveItemFromBasketHandler = () =>{
        const items = contextData.checkOutData.items.filter(i=>i.productId !== props.orderData.productId )
        contextData.setCheckOutData({
            ...contextData.checkOutData,
            items
        })
        localStorage.setItem('checkOutItems',JSON.stringify(items))
    }

    const FullDataForFinalPage = () => {
            return (
                <>
                    <span>{props.price * props.orderData.count } {props.currency || 'Euro'}</span>
                    <div className='count-remove'>
                        <button className='check-out-item-remove' onClick={()=>onRemoveItemFromBasketHandler()}><FontAwesomeIcon className='check-out-item-remove-icon' style={state.titleStyle} icon={faTrash}/></button>
                        <ItemCountUI count={props.orderData.count} productId={props.orderData.productId}/>
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
