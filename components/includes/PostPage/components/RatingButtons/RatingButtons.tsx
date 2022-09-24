import {FC, useEffect, useState} from "react";
import _shortNumber from '@_variables/clientVariables/_shortNumber'
// import {useTranslation} from 'next-i18next';
import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import {useSelector} from "react-redux";
import disLikePost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksDisLikePost";
import likePost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksLikePost";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

// it just prevent user or visitor do not rate multiple time,
// we need to create session id for none registered user or inject rating posts to the user schema
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

    .rate-logo {
      width: 24px;
      height: 24px;
    }

    .thumbs-up {
      // background-color: var(--post-page-info-color, #ccc);
      background-color: ${({buttonsDisabledStatus}: { buttonsDisabledStatus: boolean }) => {
        return buttonsDisabledStatus ? `#666` : ` var(--post-page-info-color, #ccc)`
      }};
      mask: url('/public/asset/images/icons/thumbs-up-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/thumbs-up-solid.svg') no-repeat center;
    }

    .thumbs-down {
      //background-color: var(--post-page-info-color, #ccc);
      background-color: ${({buttonsDisabledStatus}: { buttonsDisabledStatus: boolean }) => {
        return buttonsDisabledStatus ? `#666` : ` var(--post-page-info-color, #ccc)`
      }};
      mask: url('/public/asset/images/icons/thumbs-down-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/thumbs-down-solid.svg') no-repeat center;
    }

    .view {
      background-color: var(--post-page-info-color, #ccc);
      mask: url('/public/asset/images/icons/eye-regular.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/eye-regular.svg') no-repeat center;
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
                     <span className='rate-logo view'/>
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
                        <span className='rate-logo thumbs-up'/>
                        <p className='rating-item-value'>{likes}</p>
                    </button>
                    <button className='rating-item'
                            onClick={() => dispatch(disLikePost(_id))}
                            disabled={!!isRated}
                            aria-label="dislike"
                            title={t<string>('Dislike')}
                    >
                        <span className='rate-logo thumbs-down'/>
                        <p className='rating-item-value'>{disLikes}</p>
                    </button>
                </> : null
            }

        </RatingButtonsStyledDiv>
    )
};

export default RatingButtons;

