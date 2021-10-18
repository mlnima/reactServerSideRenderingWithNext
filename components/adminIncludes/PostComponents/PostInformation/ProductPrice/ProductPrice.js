import React, {useEffect, useState, useContext, useRef} from 'react';
import {useSelector} from "react-redux";

const ProductPrice = props => {
    const price = useSelector((state) => state.adminPanelPosts.post?.price);
    const priceType = useSelector((state) => state.adminPanelPosts.post?.priceType);
    const priceInputAcceptCharacterLimiter = e =>{
        const supportedChar = ['0','1','2','3','4','5','6','7','8','9','.']
        const lastTypedChar = e.target.value.split('')[e.target.value.split('').length -1]
       if (supportedChar.includes(lastTypedChar) ){
           props.onChangeHandler(e)
       }else{

       }
    }

    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div>
                    <p>Price :</p>
                    <input name='price' type='text' placeholder='Price' onChange={e => priceInputAcceptCharacterLimiter(e)}
                           value={price || 0}/>
                </div>
                <div>
                    <p>Price Type:</p>
                    <select name='priceType' onChange={e => props.onChangeHandler(e)} value={priceType}>
                        <option>Select</option>
                        <option value='negotiable'>Negotiable</option>
                        <option value='last'>Last Price</option>
                        <option value='giveAway'>Give Away</option>
                    </select>

                </div>

                {/*<div>*/}
                {/*    <p>Currency :</p>*/}
                {/*    <input name='currency' placeholder='currency' onChange={e => props.onChangeHandler(e)}*/}
                {/*           value={props.postData.currency}/>*/}
                {/*</div>*/}
            </div>
        );
    } else return null
};
export default ProductPrice;
