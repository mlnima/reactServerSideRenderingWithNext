import {useState,useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {likeDislikeView} from "../../../../../_variables/ajaxPostsVariables";
import styled from "styled-components";
let StyledDiv = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      .rated-message{
        color: var(--post-page-info-color);
      }
      button,span {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        color: var(--post-page-info-color);
        outline: none;
        border: none;
        margin: 0 10px;
        p{
          font-size: 1rem;
          padding: 0 5px;
        }
        &:disabled {
          color: #33373c;
        }
        &:hover {
          transition: all 1s ;
          transform: scale(1.2);

        }
      }
`
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
        <StyledDiv ref={ratingBtnArea} className="rating-buttons">
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

        </StyledDiv>
    )
};
export default RatingButtons;
