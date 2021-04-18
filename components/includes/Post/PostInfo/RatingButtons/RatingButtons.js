import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {likeDislikeView} from "../../../../../_variables/ajaxPostsVariables";
//import {ratingSetter} from "../../../../../_variables/_variables";

const RatingButtons = props => {
    const ratingBtnArea = useRef(null)
    const [state, setState] = useState({
        rated:false
    });


    const onRateHandler = (type)=>{
        likeDislikeView(props.id, type).then(res => {
            if (res.data.updatedData) {
                props.setRatingAndViewData(res.data.updatedData)
            }
        })
        setState({
            ...state,
            rated: true
        })
    }

    return(
        <div ref={ratingBtnArea} className="rating-buttons">
                    <span className='like-disLike-count-items'>
                        <FontAwesomeIcon style={props.svgDefaultStyle} icon={faEye}  className='rate-logo' />
                        <p>{props.ratingAndViewData.views} </p>
                    </span>
            {props.rating !== 'disable'?
                <>
                    <button onClick={() => onRateHandler('likes')  } aria-label="Center Align">
                        <FontAwesomeIcon style={props.svgDefaultStyle} icon={faThumbsUp} className='rate-logo' />
                        <p>{props.ratingAndViewData.likes}</p>
                    </button>
                    <button onClick={() =>onRateHandler('disLikes')} aria-label="Center Align">
                        <FontAwesomeIcon style={props.svgDefaultStyle} icon={faThumbsDown} className='rate-logo'/>
                        <p>{props.ratingAndViewData.disLikes}</p>
                    </button>
                </>:null}

        </div>
    )
};
export default RatingButtons;
