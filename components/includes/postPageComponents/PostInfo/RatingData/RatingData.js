import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";

const RatingData = props => {

    if (props.rating !== 'disable') {
        return (
            <div className='post-rate'>
                <div className='like-disLike-count'>

                    <span className='like-disLike-count-items'>
                        <FontAwesomeIcon style={props.svgDefaultStyle} icon={faThumbsUp} className='like-disLike-count-items-logo'/>
                        <p>{props.likes}</p>
                    </span>
                    <span className='like-disLike-count-items'>
                         <FontAwesomeIcon style={props.svgDefaultStyle} icon={faThumbsDown} className='like-disLike-count-items-logo'/>
                         <p>{props.disLikes}</p>
                    </span>
                </div>
            </div>
        )

    } else return null
};
export default RatingData;
