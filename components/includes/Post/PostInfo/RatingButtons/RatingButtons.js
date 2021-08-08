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
                    <style jsx>{`
                        .rating-buttons{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .rated-message{
                            color: var(--post-page-info-color);
                        }
                        .rating-item{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: transparent;
                            color: var(--post-page-info-color);
                            outline: none;
                            border: none;
                            margin: 0 10px;
                        }
                        .rating-item-value{
                            font-size: 1rem;
                            padding: 0 5px;
                        }
                        .rating-item-value:disabled {
                            color: #33373c;
                        }
                        .rating-item-value:hover {
                            transition: all 1s ;
                            transform: scale(1.2);
                        }
                        
                    `}</style>
                    <span className='like-disLike-count-items rating-item'>
                        <FontAwesomeIcon style={{width: '24px', height: '24px'}} icon={faEye}  className='rate-logo' />
                        <p className='rating-item-value'>{ratingAndViewData.views} </p>
                    </span>
            {rating !== 'disable'?
                <>
                    <button className='rating-item' onClick={() => onRateHandler('likes')  } aria-label="Center Align">
                        <FontAwesomeIcon  icon={faThumbsUp} style={{width: '24px', height: '24px'}} className='rate-logo' />
                        <p className='rating-item-value'>{ratingAndViewData.likes}</p>
                    </button>
                    <button className='rating-item' onClick={() =>onRateHandler('disLikes')} aria-label="Center Align">
                        <FontAwesomeIcon style={{width: '24px', height: '24px'}} icon={faThumbsDown} className='rate-logo'/>
                        <p className='rating-item-value'>{ratingAndViewData.disLikes}</p>
                    </button>
                </>:null}

        </div>
    )
};
export default RatingButtons;
