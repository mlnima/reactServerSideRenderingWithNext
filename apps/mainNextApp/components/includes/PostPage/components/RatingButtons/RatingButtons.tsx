import React, {FC, useEffect, useState} from "react";
import _shortNumber from '@_variables/_clientVariables/clientVariables/_shortNumber'
// import {useTranslation} from 'next-i18next';
import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import {useSelector} from "react-redux";
import disLikePost
    from "../../../../../store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksDisLikePost";
import likePost
    from "../../../../../store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksLikePost";
import {useAppDispatch} from "../../../../../store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";

// it just prevent user or visitor do not rate multiple time,
// we need to create session id for none registered user or inject rating posts to the user schema
const RatingButtonsStyledDiv = styled.div`
 
  .rated-message {
    color: var(--post-page-info-color, #ccc);
  }
  .rating-item {
    .thumbs-up ,.thumbs-down{
      background-color: ${({buttonsDisabledStatus}: { buttonsDisabledStatus: boolean }) => {
        return buttonsDisabledStatus ? `#666` : ` var(--post-page-info-color, #ccc)`
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
        <RatingButtonsStyledDiv className="rating-buttons" buttonsDisabledStatus={isRated}>
            {views ?
                <span className='like-disLike-count-items rating-item'
                      title={t<string>('Views')}
                >
                        <SvgRenderer svgUrl={'/public/asset/images/icons/eye-regular.svg'}
                                     size={16}
                                     customClassName={'rate-logo view'}
                                     color={'var(--post-page-info-color,#ccc)'}/>
                        <p className='rating-item-value'>{_shortNumber(views)} </p>
                    </span>
                : null
            }

            {rating ?
                <>
                    <button className='rating-item'
                            onClick={() => dispatch(likePost(_id))}
                            disabled={!!isRated}
                            aria-label="like"
                            title={t<string>('Like')}
                    >
                        <SvgRenderer svgUrl={'/public/asset/images/icons/thumbs-up-solid.svg'}
                                     size={16}
                                     customClassName={'rate-logo thumbs-up'}
                                     color={'var(--post-page-info-color,#ccc)'}/>
                        <p className='rating-item-value'>{likes}</p>
                    </button>
                    <button className='rating-item'
                            onClick={() => dispatch(disLikePost(_id))}
                            disabled={!!isRated}
                            aria-label="dislike"
                            title={t<string>('Dislike')}
                    >
                        <SvgRenderer svgUrl={'/public/asset/images/icons/thumbs-down-solid.svg'}
                                     size={16}
                                     customClassName={'rate-logo thumbs-down'}
                                     color={'var(--post-page-info-color,#ccc)'}/>
                        <p className='rating-item-value'>{disLikes}</p>
                    </button>
                </> : null
            }

        </RatingButtonsStyledDiv>
    )
};

export default RatingButtons;

