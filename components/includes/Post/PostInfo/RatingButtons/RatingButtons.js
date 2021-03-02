import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {likeDislikeView} from "../../../../../_variables/ajaxPostsVariables";
//import {ratingSetter} from "../../../../../_variables/_variables";

const RatingButtons = props => {
    const ratingBtnArea = useRef(null)
    const [state, setState] = useState({
        rated:false
    });


    const onRateHandler = (type)=>{
        likeDislikeView(props.id, type)
        setState({
            ...state,
            rated: true
        })
    }

    if (props.rating !== 'disable') {
        if (state.rated){
            return (
                <p>Thanks</p>
            )
        }else {
            return(
                <div ref={ratingBtnArea} className="like">
                    <button onClick={() => onRateHandler('likes')  }>
                        <FontAwesomeIcon icon={faThumbsUp} className='rate-logo' />
                    </button>
                    <button onClick={() =>onRateHandler('disLikes')}>
                        <FontAwesomeIcon icon={faThumbsDown} className='rate-logo'/>
                    </button>
                </div>
            )
        }

    } else return null
};
export default RatingButtons;
