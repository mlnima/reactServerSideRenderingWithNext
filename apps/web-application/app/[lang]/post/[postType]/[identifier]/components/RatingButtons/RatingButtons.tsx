'use client';
import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {shortNumber} from "custom-util";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import {faThumbsDown} from "@fortawesome/free-solid-svg-icons/faThumbsDown";
import likePostAction from "@store/reducers/postsReducers/likePostAction";
import disLikePostAction from "@store/reducers/postsReducers/disLikePostAction";
import './RatingButtons.styles.scss'
import viewPostAction from "@store/reducers/postsReducers/viewPostAction";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {clientAPIRequestLikePost} from "api-requests";
import {clientAPIRequestLikeDislikePost} from "api-requests/dist/src/client/clientPosts";
import {response} from "express";

interface IProps {
    rating: boolean,
    dictionary: {
        [key: string]: string
    },
    likes: number | undefined,
    disLikes: number | undefined,
    views: number | undefined,
    _id: string | undefined
}


const RatingButtons: FC<IProps> = ({rating, likes, disLikes, views, dictionary, _id}) => {
    const dispatch = useAppDispatch();
    const {loggedIn} = useAppSelector(({user}) => user)
    const {userData} = useAppSelector(({user}) => user)
    const [didView, setDidView] = useState<boolean>(false)
    const [disableRatingButtons, setDisableRatingButtons] = useState<boolean>(false)
    // const [isRated, setIsRated] = useState<boolean>(false)
    const [likesValue, setLikesValue] = useState<number>(0)
    const [disLikesValue, setDisLikesValue] = useState<number>(0)
    const [viewsValue, setViewsValue] = useState<number>(0)

    useEffect(() => {
        if (likes) {
            setLikesValue(likes)
        }
        if (disLikes) {
            setDisLikesValue(disLikes)
        }
        if (_id && !didView) {
            setDidView(true)
            dispatch(viewPostAction(_id))
            setViewsValue(views + 1)
        }
        return () => {
            setDidView(false)
        }
    }, []);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const ratingsDataFromLocalStorage = localStorage?.ratingData ?
    //             JSON.parse(localStorage.ratingData) :
    //             {likes: [], disLikes: []};
    //
    //         setIsRated(
    //             ratingsDataFromLocalStorage?.likes?.includes(_id) ||
    //             ratingsDataFromLocalStorage?.disLikes?.includes(_id)
    //         )
    //     }
    //
    // }, [rating, likes, disLikes]);

    // useEffect(() => {
    //     if (_id && !didView) {
    //         console.log('_id=> ', _id)
    //
    //         setDidView(true)
    //     }
    //     return () => {
    //         console.log('unmount _id=> ', _id)
    //         setDidView(false)
    //     }
    // }, [_id]);

    const onLikeOrDisLikeHandler = async (type: 'likes' | 'disLikes') => {
        if (loggedIn && _id) {
            setDisableRatingButtons(true)
            await clientAPIRequestLikeDislikePost(_id, type).then(response => {
                setDisLikesValue(response.data.disLikes || 0)
                setLikesValue(response.data.likes || 0)
            }).catch(error => {
                console.log('error=> ', error)
            }).finally(() => {
                setDisableRatingButtons(false)
            })
        } else {
            dispatch(loginRegisterForm('register'))
        }
    }


    return <div className={'rating-buttons'}>

        {views ?
            <span className='like-disLike-count-items rating-item views'
                  title={dictionary?.['Views'] || 'Views'}>
                         <FontAwesomeIcon className={'rate-logo view'}
                                          color={'var(--secondary-text-color,#b3b3b3)'}
                                          icon={faEye} style={{width: 24, height: 24}}/>
                        <p className='rating-item-value'>{shortNumber(viewsValue)} </p>
                    </span>
            : null
        }

        {rating ?
            <>
                <button className='rating-item'
                        onClick={() => onLikeOrDisLikeHandler('likes')}
                        disabled={disableRatingButtons}
                        aria-label="like"
                        title={dictionary?.['Like'] || 'Like'}>

                    <FontAwesomeIcon className={'rate-logo thumbs-up'}
                                     color={disableRatingButtons ? '#666' : 'var(--secondary-text-color,#b3b3b3)'}
                                     icon={faThumbsUp} style={{width: 24, height: 24}}/>
                    <p className='rating-item-value'>{likesValue}</p>
                </button>
                <button className='rating-item'
                        onClick={() => onLikeOrDisLikeHandler('disLikes')}
                        disabled={disableRatingButtons}
                        aria-label="dislike"
                        title={dictionary?.['Dislike'] || 'Dislike'}>
                    <FontAwesomeIcon className={'rate-logo thumbs-down'}
                                     color={disableRatingButtons ? '#666' : 'var(--secondary-text-color,#b3b3b3)'}
                                     icon={faThumbsDown} style={{width: 24, height: 24}}/>
                    <p className='rating-item-value'>{disLikesValue}</p>
                </button>
            </> : null
        }

    </div>
}

export default RatingButtons;