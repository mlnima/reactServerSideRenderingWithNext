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
    .rate-logo{
      width: 24px;
      height: 24px;
    }
    .thumbs-up{
      background-color: var(--post-page-info-color, #ccc);
      mask: url('/public/asset/images/icons/thumbs-up-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/thumbs-up-solid.svg') no-repeat center;
    }
    .thumbs-down{
      background-color: var(--post-page-info-color, #ccc);
      mask: url('/public/asset/images/icons/thumbs-down-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/thumbs-down-solid.svg') no-repeat center;
    }
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

    const onRateHandler = (type) => {
        likeDislikeView(_id, type).then(res => {
            if (res.data.updatedData) {
                setRatingAndViewData(res.data.updatedData)
            }
        })
    }

    return (
        <RatingButtonsStyledDiv className="rating-buttons">
            {ratingAndViewData.views ?
                <span className='like-disLike-count-items rating-item'
                      title={t([`common:Views`, t(`customTranslation:Views`)])}
                >
                        {/*<FontAwesomeIcon icon={faEye} className='rate-logo'/>*/}
                       <svg className={'rate-logo'}
                         xmlns={'http://www.w3.org/2000/svg'}
                         width={'14'}
                         height={'14'}
                         viewBox={'0 0 24 24'}
                         fill={'none'}
                         stroke={'currentColor'}
                         strokeWidth={'2'}
                         strokeLinecap={'round'}
                         strokeLinejoin={'round'}>
                            <path d={'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'}/>
                            <circle cx={'12'} cy={'12'} r={'3'}/>
                        </svg>
                        <p className='rating-item-value'>{_shortNumber(ratingAndViewData.views)} </p>
                    </span>
                : null
            }

            {rating ?
                <>
                    <button className='rating-item'
                            onClick={() => onRateHandler('likes')}
                            aria-label="Center Align"
                            title={t([`common:Like`, t(`customTranslation:Like`)])}
                    >
                        {/*<FontAwesomeIcon icon={faThumbsUp} className='rate-logo'/>*/}
                        <span className='rate-logo thumbs-up' />
                        <p className='rating-item-value'>{ratingAndViewData.likes}</p>
                    </button>
                    <button className='rating-item'
                            onClick={() => onRateHandler('disLikes')}
                            aria-label="Center Align"
                            title={t([`common:Dislike`, t(`customTranslation:Dislike`)])}
                    >
                        {/*<FontAwesomeIcon icon={faThumbsDown} className='rate-logo'/>*/}
                        <span className='rate-logo thumbs-down' />
                        <p className='rating-item-value'>{ratingAndViewData.disLikes}</p>
                    </button>
                </> : null
            }

        </RatingButtonsStyledDiv>
    )
};

export default withTranslation(['common'])(RatingButtons);

