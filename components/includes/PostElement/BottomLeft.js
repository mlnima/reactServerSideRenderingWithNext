import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";

const BottomLeft = props => {


    if ((props.type === 'video' && props.duration) || props.type === 'redirect') {
        return (
            <span className='bottom-left'>
                <FontAwesomeIcon icon={faClock} className='post-element-info-logo' style={props.svgDefaultStyle}/>
                <span className='value-next-icon'>  {props.duration}</span>
            </span>
        );
    } else if (props.type === 'product') {
        return (
            <span className='bottom-left'>
                <FontAwesomeIcon  icon={props?.state?.currency === 'Usd' ? faDollarSign : faEuroSign} className='post-element-info-logo' style={props.svgDefaultStyle}/>
                <span className='value-next-icon'>{props.price}</span>
            </span>
        )
    } else return null

};
export default BottomLeft;
