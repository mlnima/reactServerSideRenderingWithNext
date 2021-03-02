import React, {useEffect, useState, useContext, useRef} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../../context/AppContext";

const ItemCountUI = props => {
    const contextData = useContext(AppContext);

    const changeAmountItems = valueData =>{
        if (props.count>0 || (props.count===0 && valueData === 1)){
            const items = contextData.checkOutData.items.map(item=>{
                if (item.productId === props.productId){
                    let currentCount = parseInt(item.count)
                    item.count = currentCount +  valueData
                }
                return item
            })

            contextData.setCheckOutData({
                ...contextData.checkOutData,
                items
            })
            localStorage.setItem('checkOutItems',JSON.stringify(items))
        }else if(props.count===0 ){
            const items = contextData.checkOutData.items.filter(item=>item.productId !==props.productId )
            contextData.setCheckOutData({
                ...contextData.checkOutData,
                items
            })
            localStorage.setItem('checkOutItems',JSON.stringify(items))
            console.log(items)
        }
    }

    return (
        <div className='item-count-ui'>
            <button disabled={props.count<=1} onClick={()=>changeAmountItems(-1)}><FontAwesomeIcon className='item-count-ui-btn'  icon={faMinus}/></button>
              {props.count}
            <button onClick={()=>changeAmountItems(1)}><FontAwesomeIcon className='item-count-ui-btn'  icon={faPlus}/></button>
        </div>
    );
};
export default ItemCountUI;
