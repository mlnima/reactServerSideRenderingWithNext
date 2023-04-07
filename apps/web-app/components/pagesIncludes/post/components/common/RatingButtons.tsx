import React, {FC, useEffect, useState} from "react";
import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import shortNumber from "custom-util/src/math-util/shortNumber";
import likePostAction from "@store_toolkit/clientReducers/postsReducers/likePostAction";
import disLikePostAction from "@store_toolkit/clientReducers/postsReducers/disLikePostAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import {faThumbsDown} from "@fortawesome/free-solid-svg-icons/faThumbsDown";

const RatingButtonsStyledDiv = styled.div`
  padding: 0 8px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
 
  .rated-message {
    color: var(--secondary-text-color, #ccc);
  }

  .rating-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: transparent;
    color: var(--secondary-text-color, #ccc);
    outline: none;
    border: none;
    
    .thumbs-up ,.thumbs-down{
        color: ${({buttonsDisabledStatus}: { buttonsDisabledStatus: boolean }) => {
        return buttonsDisabledStatus ? `#666` : ` var(--secondary-text-color,#ccc)`
      }};
    }


    .rating-item-value {
      padding: 0 5px;
      margin-top: 5px;
      font-size: small;
    }
  }
  
  .rating-item-value:disabled {
    color: #33373c;
  }

  .rating-item-value:hover {
    transition: all 1s;
    transform: scale(1.2);
  }
  @media only screen and (min-width: 768px) {
    .rating-item{
      flex-direction: row;
      
      .rating-item-value {
        margin: 0 0 0 5px;
        font-size: small;
        padding: 0;
      }
    }
  }
`

interface RatingButtonsPropTypes {
    rating: boolean
}

const RatingButtons: FC<RatingButtonsPropTypes> = ({rating}) => {

    const {t} = useTranslation('common');
    const dispatch = useAppDispatch();
    const [isRated, setIsRated] = useState(null)
    const {likes, disLikes, views, _id} = useSelector(({posts}: Store) => {
        return {
            likes: posts.post?.likes,
            disLikes: posts.post?.disLikes,
            views: posts.post?.views,
            _id: posts.post?._id,
        }
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const ratingsDataFromLocalStorage = localStorage?.ratingData ?
                  JSON.parse(localStorage.ratingData) :
                  {likes: [], disLikes: []};

            setIsRated(
                       ratingsDataFromLocalStorage?.likes?.includes(_id) ||
                             ratingsDataFromLocalStorage?.disLikes?.includes(_id)
            )
        }

    }, [rating, likes, disLikes]);

    return (
        <RatingButtonsStyledDiv className="rating-buttons sub-content"
                                //@ts-ignore
                                buttonsDisabledStatus={isRated}>
            {views ?
                <span className='like-disLike-count-items rating-item views'
                      title={t<string>('Views')}>
                         <FontAwesomeIcon className={'rate-logo view'}
                                          color={'var(--secondary-text-color,#ccc)'}
                                          icon={faEye} style={{width: 16, height: 16}}/>
                        <p className='rating-item-value'>{shortNumber(views)} </p>
                    </span>
                : null
            }

            {rating ?
                <>
                    <button className='rating-item'
                            onClick={() => dispatch(likePostAction(_id))}
                            disabled={!!isRated}
                            aria-label="like"
                            title={t<string>('Like')}>

                        <FontAwesomeIcon className={'rate-logo thumbs-up'}
                                         icon={faThumbsUp} style={{width: 16, height: 16}}/>
                        <p className='rating-item-value'>{likes}</p>
                    </button>
                    <button className='rating-item'
                            onClick={() => dispatch(disLikePostAction(_id))}
                            disabled={!!isRated}
                            aria-label="dislike"
                            title={t<string>('Dislike')}>
                        <FontAwesomeIcon className={'rate-logo thumbs-down'}
                                         icon={faThumbsDown} style={{width: 16, height: 16}}/>
                        <p className='rating-item-value'>{disLikes}</p>
                    </button>
                </> : null
            }

        </RatingButtonsStyledDiv>
    )
};

export default RatingButtons;

