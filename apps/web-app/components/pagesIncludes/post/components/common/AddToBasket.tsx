import React, {useState, useRef, FC} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";

const AddToBasketStyledFrom = styled.form`
  display: flex;
  max-width: 300px;
  align-items: center;

  .add-item-to-basket-count {
    border: none;
    padding: 6px;
    width: 30%;

  }

  .add-item-to-basket-action {
    border: none;
    height: 100%;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

interface AddToBasketPropTypes {
    render: boolean
}

const AddToBasket: FC<AddToBasketPropTypes> = ({render}) => {
    const countInput = useRef(null)
    const [count, setCount] = useState(1)

    const onAddToBasketHandler = e => {
        e.preventDefault()
        // if (props.productId) {
        //     countInput.current.style.backgroundColor = 'white'
        //
        //     if (count>0){
        //         const existSimilarItems = contextData.checkOutData.items.filter(i=>i.productId === props.productId )
        //         if (existSimilarItems.length>0){
        //             const items = contextData.checkOutData.items.map(item=>{
        //                 if (item.productId === props.productId){
        //                     let currentCount = parseInt(item.count)
        //                     item.count = currentCount +  parseInt(count)
        //                 }
        //                 return item
        //             })
        //             contextData.setCheckOutData({
        //                 ...contextData.checkOutData,
        //                 items
        //             })
        //             localStorage.setItem('checkOutItems',JSON.stringify(items))
        //         }else {
        //             const items= [...contextData.checkOutData.items, {
        //                 productId:props.productId,
        //                 count:parseInt(count),
        //                 date:Date.now()
        //             }]
        //             contextData.setCheckOutData({
        //                 ...contextData.checkOutData,
        //                 items
        //             })
        //             localStorage.setItem('checkOutItems',JSON.stringify(items))
        //         }
        //
        //     }else{
        //         countInput.current.style.backgroundColor = 'red'
        //     }
        // }
    }

    if (render) {
        return (
            <AddToBasketStyledFrom className='add-item-to-basket' onSubmit={e => onAddToBasketHandler(e)}>
                <input ref={countInput}
                       className='add-item-to-basket-count'
                       type='number'
                       value={count}
                       onChange={e => setCount(parseInt(e.target.value))}/>

                <button onClick={onAddToBasketHandler} className='add-item-to-basket-action'>
                    <FontAwesomeIcon icon={faCartPlus} style={{width:25,height:25}}/>
                </button>

            </AddToBasketStyledFrom>
        );
    } else return null

};
export default AddToBasket;
