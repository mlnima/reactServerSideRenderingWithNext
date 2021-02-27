import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../../../context/AppContext";
import './AddToBasket.scss'


const AddToBasket = props => {
    const contextData = useContext(AppContext);
    const countInput = useRef(null)
    const [count,setCount]=useState(1)

    const onAddToBasketHandler = e => {
        e.preventDefault()
        if (props.productId) {
            countInput.current.style.backgroundColor = 'white'

            if (count>0){
                const existSimilarItems = contextData.checkOutData.items.filter(i=>i.productId === props.productId )
                if (existSimilarItems.length>0){
                    const items = contextData.checkOutData.items.map(item=>{
                        if (item.productId === props.productId){
                            let currentCount = parseInt(item.count)
                            item.count = currentCount +  parseInt(count)
                        }
                        return item
                    })
                    contextData.setCheckOutData({
                        ...contextData.checkOutData,
                        items
                    })
                    localStorage.setItem('checkOutItems',JSON.stringify(items))
                }else {
                    const items= [...contextData.checkOutData.items, {
                        productId:props.productId,
                        count:parseInt(count),
                        date:Date.now()
                    }]
                    contextData.setCheckOutData({
                        ...contextData.checkOutData,
                        items
                    })
                    localStorage.setItem('checkOutItems',JSON.stringify(items))
                }
            console.log(contextData.checkOutData.items)
            }else{
                countInput.current.style.backgroundColor = 'red'
            }
        }
    }

    if (props.render) {
        return (
            <form className='add-item-to-basket' onSubmit={e=>onAddToBasketHandler(e)}>
                <input ref={countInput}  className='add-item-to-basket-count' type='number' value={count} onChange={e=>setCount(e.target.value)}/>
                <button onClick={onAddToBasketHandler} className='add-item-to-basket-action'><FontAwesomeIcon icon={faCartPlus} className='svg-logo-medium '/></button>
            </form>
        );
    } else return null

};
export default AddToBasket;
