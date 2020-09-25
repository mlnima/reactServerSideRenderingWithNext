import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {likeDislikeView} from "../../../../../_variables/ajaxPostsVariables";

const RatingButtons = props => {
    const ratingBtnArea = useRef(null)
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    if (props.rating !== 'disable') {
        return(
            <div ref={ratingBtnArea} className="like">
                <button onClick={() => likeDislikeView(props.id, 'likes') }>
                    <FontAwesomeIcon icon={faThumbsUp} className='rate-logo' />
                </button>
                <button onClick={() => likeDislikeView(props.id, 'disLikes')}>
                    <FontAwesomeIcon icon={faThumbsDown} className='rate-logo'/>

                </button>
            </div>
        )
    } else return null
};
export default RatingButtons;
