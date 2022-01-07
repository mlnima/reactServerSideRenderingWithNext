import {useState, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {likeDislikeView} from "../../../../../_variables/ajaxPostsVariables";
import _shortNumber from '../../../../../_variables/clientVariables/_shortNumber'
import {withTranslation} from 'next-i18next';
import styled from "styled-components";

const RatingButtonsStyledDiv = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;

  .rated-message {
    color: var(--post-page-info-color, #ccc);
  }

  .rating-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: var(--post-page-info-color, #ccc);
    outline: none;
    border: none;
    margin: 0 10px;
  }

  .rating-item-value {
    font-size: 1rem;
    padding: 0 5px;
  }

  .rating-item-value:disabled {
    color: #33373c;
  }

  .rating-item-value:hover {
    transition: all 1s;
    transform: scale(1.2);
  }

`

const RatingButtons = ({t, _id, ratingAndViewData, rating, setRatingAndViewData}) => {
    const ratingBtnArea = useRef(null)
    const [state, setState] = useState({
        rated: false
    });

    const onRateHandler = (type) => {
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

    return (
        <RatingButtonsStyledDiv ref={ratingBtnArea} className="rating-buttons">
                    <span className='like-disLike-count-items rating-item' title={t([`common:Views`, t(`customTranslation:Views`)])}>
                        <FontAwesomeIcon icon={faEye} className='rate-logo'/>
                        <p className='rating-item-value'>{_shortNumber(ratingAndViewData.views)} </p>
                    </span>
            {rating ?
                <>
                    <button className='rating-item' onClick={() => onRateHandler('likes')} aria-label="Center Align" title={t([`common:Like`, t(`customTranslation:Like`)])}>
                        <FontAwesomeIcon icon={faThumbsUp} className='rate-logo'/>
                        <p className='rating-item-value'>{ratingAndViewData.likes}</p>
                    </button>
                    <button className='rating-item' onClick={() => onRateHandler('disLikes')} aria-label="Center Align" title={t([`common:Dislike`, t(`customTranslation:Dislike`)])}>
                        <FontAwesomeIcon icon={faThumbsDown} className='rate-logo'/>
                        <p className='rating-item-value'>{ratingAndViewData.disLikes}</p>
                    </button>
                </> : null
            }

        </RatingButtonsStyledDiv>
    )
};
//export default RatingButtons;
export default withTranslation(['common'])(RatingButtons);
