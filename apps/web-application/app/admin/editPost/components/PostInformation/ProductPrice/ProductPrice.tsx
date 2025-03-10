'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';

interface PropTypes {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  rendering: boolean;
}

const ProductPrice: React.FC<PropTypes> = ({ onChangeHandler, rendering }) => {
  const price = useSelector((state: DashboardStore) => state.posts.post?.price);
  const priceType = useSelector((state: DashboardStore) => state.posts.post?.priceType);

  const priceInputAcceptCharacterLimiter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const supportedChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const lastTypedChar = e.target.value[e.target.value.length - 1];
    if (supportedChar.includes(lastTypedChar)) {
      onChangeHandler(e);
    }
  };

  if (rendering) {
    return (
      <div className='post-information-section'>
        <div>
          <p>Price:</p>
          <input
            name='price'
            type='text'
            placeholder='Price'
            onChange={priceInputAcceptCharacterLimiter}
            value={price || 0}
          />
        </div>
        <div>
          <p>Price Type:</p>
          <select name='priceType' onChange={onChangeHandler} value={priceType}>
            <option value='' disabled>Select</option>
            <option value='negotiable'>Negotiable</option>
            <option value='last'>Last Price</option>
            <option value='giveAway'>Give Away</option>
          </select>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductPrice;

// import React, {FC} from 'react';
// import {useSelector} from "react-redux";
// import {DashboardStore, Store} from "@repo/typescript-types";
// interface PropTypes{
//     onChangeHandler:Function,
//     rendering:boolean
// }
// const ProductPrice:FC<PropTypes> = props => {
//     const price = useSelector(({posts}: DashboardStore) => posts.post?.price);
//     //@ts-ignore
//     const priceType = useSelector(({posts}: DashboardStore) => posts.post?.priceType);
//
//     const priceInputAcceptCharacterLimiter = (e:React.ChangeEvent<HTMLInputElement>) =>{
//         const supportedChar = ['0','1','2','3','4','5','6','7','8','9','.']
//         const lastTypedChar = e.target.value.split('')[e.target.value.split('')?.length -1]
//        if (supportedChar.includes(lastTypedChar) ){
//            props.onChangeHandler(e)
//        }else{
//
//        }
//     }
//
//     if (props.rendering) {
//         return (
//             <div className='post-information-section'>
//                 <div>
//                     <p>Price :</p>
//                     <input name='price' type='text' placeholder='Price' onChange={e => priceInputAcceptCharacterLimiter(e)}
//                            value={price || 0}/>
//                 </div>
//                 <div>
//                     <p>Price Type:</p>
//                     <select name='priceType' onChange={e => props.onChangeHandler(e)} value={priceType}>
//                         <option value='' >Select</option>
//                         <option value='negotiable'>Negotiable</option>
//                         <option value='last'>Last Price</option>
//                         <option value='giveAway'>Give Away</option>
//                     </select>
//
//                 </div>
//
//                 {/*<div>*/}
//                 {/*    <p>Currency :</p>*/}
//                 {/*    <input name='currency' placeholder='currency' onChange={e => props.onChangeHandler(e)}*/}
//                 {/*           value={props.postData.currency}/>*/}
//                 {/*</div>*/}
//             </div>
//         );
//     } else return null
// };
// export default ProductPrice;
