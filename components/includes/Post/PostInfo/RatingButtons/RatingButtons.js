import {useState,useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {likeDislikeView} from "../../../../../_variables/ajaxPostsVariables";

const RatingButtons = ({_id,svgDefaultStyle,ratingAndViewData,rating,setRatingAndViewData}) => {
    const ratingBtnArea = useRef(null)
    const [state, setState] = useState({
        rated:false
    });
    const onRateHandler = (type)=>{
        likeDislikeView(_id, type).then(res => {
            if (res.data.updatedData) {
                setRatingAndViewData(res.data.updatedData)
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
                        <FontAwesomeIcon style={svgDefaultStyle} icon={faEye}  className='rate-logo' />
                        <p>{ratingAndViewData.views} </p>
                    </span>
            {rating !== 'disable'?
                <>
                    <button onClick={() => onRateHandler('likes')  } aria-label="Center Align">
                        <FontAwesomeIcon style={svgDefaultStyle} icon={faThumbsUp} className='rate-logo' />
                        <p>{ratingAndViewData.likes}</p>
                    </button>
                    <button onClick={() =>onRateHandler('disLikes')} aria-label="Center Align">
                        <FontAwesomeIcon style={svgDefaultStyle} icon={faThumbsDown} className='rate-logo'/>
                        <p>{ratingAndViewData.disLikes}</p>
                    </button>
                </>:null}

        </div>
    )
};
export default RatingButtons;
