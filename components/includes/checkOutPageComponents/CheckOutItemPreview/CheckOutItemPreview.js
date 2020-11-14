import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './CheckOutItemPreview.scss'
import { faTrash} from "@fortawesome/free-solid-svg-icons";
const CheckOutItemPreview = props => {
    const [state, setState] = useState({});
    useEffect(() => {
        console.log(props)
    }, [props]);
    return (
        <div className='check-out-item-preview'>
            <img src={props.mainThumbnail} alt={props.title}/>
            <div className='check-out-item-preview-title'>
                <h4>{props.title}</h4>
                <span>{props.price} {props.currency || 'Euro'}</span>
                <div className='count-remove'>
                    <button className='check-out-item-remove'> <FontAwesomeIcon  className='check-out-item-remove-icon' style={state.titleStyle} icon={faTrash} /></button>
                    <input type='number' value={props.orderData.count}/>
                </div>

            </div>
        </div>
    );
};
export default CheckOutItemPreview;
