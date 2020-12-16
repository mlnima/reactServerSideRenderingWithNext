import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './CheckOutItemPreview.scss'
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import {getPost} from "../../../../_variables/ajaxPostsVariables";
const CheckOutItemPreview = props => {
    const [state, setState] = useState({
        postData:{}
    });

    // useEffect(() => {
    //     //const productId= props.oderData?.productId
    //     const requestBody = {_id: props.oderData?.productId};
    //     getPost(requestBody, window.location.origin, false).then(res=>{
    //         console.log(res.data)
    //     })
    //    // console.log(props.orderData.productId)
    // }, [props]);
    return (
        <div className='check-out-item-preview'>
            <img src={props.mainThumbnail} alt={props.title}/>
            <div className='check-out-item-preview-title'>
                <h4>{props.title}</h4>
                <span>{props.price} {props.currency || 'Euro'}</span>
                <div className='count-remove'>
                    <button className='check-out-item-remove'> <FontAwesomeIcon  className='check-out-item-remove-icon' style={state.titleStyle} icon={faTrash} /></button>
                    <input className='check-out-item-count' type='number' value={props.orderData.count}/>
                </div>

            </div>
        </div>
    );
};
export default CheckOutItemPreview;
