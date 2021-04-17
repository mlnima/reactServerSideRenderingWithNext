import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";

const TopLeft = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='top-left'>
            <span className='view-count value-next-icon'>%{props.rating}</span>
            <FontAwesomeIcon  style={props.svgDefaultStyle} icon={faThumbsUp} className='post-element-info-logo'/>
        </div>
    );
};
export default TopLeft;
