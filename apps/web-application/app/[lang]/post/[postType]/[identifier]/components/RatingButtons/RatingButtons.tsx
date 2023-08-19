'use client';
import React, {FC, useEffect, useState} from "react";
import {useAppDispatch} from "@store/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {shortNumber} from "custom-util";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import {faThumbsDown} from "@fortawesome/free-solid-svg-icons/faThumbsDown";
import likePostAction from "@store/reducers/postsReducers/likePostAction";
import disLikePostAction from "@store/reducers/postsReducers/disLikePostAction";
import './RatingButtons.styles.scss'

interface IProps {
    rating: boolean,
    dictionary: {
        [key: string]: string
    },
    likes: number | undefined,
    disLikes: number | undefined,
    views: number| undefined,
    _id: string | undefined
}


const RatingButtons: FC<IProps> = ({rating, likes, disLikes, views, dictionary, _id}) => {
    const dispatch = useAppDispatch();
    const [isRated, setIsRated] = useState<boolean>(false)

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


    return <div className={'rating-buttons'}>

        {views ?
            <span className='like-disLike-count-items rating-item views'
                  title={dictionary?.['Views'] || 'Views'}>
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
                        disabled={isRated}
                        aria-label="like"
                        title={dictionary?.['Like'] || 'Like'}>

                    <FontAwesomeIcon className={'rate-logo thumbs-up'}
                                     icon={faThumbsUp} style={{width: 16, height: 16}}/>
                    <p className='rating-item-value'>{likes}</p>
                </button>
                <button className='rating-item'
                        onClick={() => dispatch(disLikePostAction(_id))}
                        disabled={isRated}
                        aria-label="dislike"
                        title={dictionary?.['Dislike'] || 'Dislike'}>
                    <FontAwesomeIcon className={'rate-logo thumbs-down'}
                                     color={isRated ? '#666' : 'var(--secondary-text-color,#ccc)'}
                                     icon={faThumbsDown} style={{width: 16, height: 16}}/>
                    <p className='rating-item-value'>{disLikes}</p>
                </button>
            </> : null
        }

    </div>
}

export default RatingButtons;