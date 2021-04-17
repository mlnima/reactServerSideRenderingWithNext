import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";

const BottomRight = props => {

    return (
        <span className='bottom-right'>
                 <FontAwesomeIcon style={props.svgDefaultStyle} icon={faEye} className='post-element-info-logo'/>
                 <span className='view-count value-next-icon'>{props.views}</span>

         </span>
    );
};
export default BottomRight;
