'use client';
import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {shortNumber} from "custom-util";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import {faThumbsDown} from "@fortawesome/free-solid-svg-icons/faThumbsDown";
// import likePostAction from "@store/reducers/postsReducers/likePostAction";
// import disLikePostAction from "@store/reducers/postsReducers/disLikePostAction";
import './ActionButtons.scss'
// import viewPostAction from "@store/reducers/postsReducers/viewPostAction";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {clientAPIRequestLikePost, clientAPIRequestViewPost} from "api-requests";
import {clientAPIRequestLikeDislikePost} from "api-requests/dist/src/client/clientPosts";
import {response} from "express";
import clearACacheByTag from "@lib/serverActions/clearACacheByTag";
import {faComments} from "@fortawesome/free-solid-svg-icons";

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

const ActionButtons: FC<IProps> = ({rating, likes, disLikes, views, dictionary, _id}) => {
    const dispatch = useAppDispatch();
    const {loggedIn} = useAppSelector(({user}) => user)
    const [didView, setDidView] = useState<boolean>(false)
    const [disableRatingButtons, setDisableRatingButtons] = useState<boolean>(false)

    useEffect(() => {
        if (_id && !didView) {
            setDidView(true)
            clientAPIRequestViewPost(_id)
            // dispatch(viewPostAction(_id))
        }
        return () => {
            setDidView(false)
        }
    }, []);

    const onLikeOrDisLikeHandler = async (type: 'likes' | 'disLikes') => {
        if (loggedIn && _id) {
            setDisableRatingButtons(true)
            await clientAPIRequestLikeDislikePost(_id, type).then(response => {
                // setDisLikesValue(response.data.disLikes || 0)
                // setLikesValue(response.data.likes || 0)
            }).catch(error => {
                console.log('error=> ', error)
            }).finally(() => {
                setDisableRatingButtons(false)
                clearACacheByTag(`${_id}Rating`)
            })
        } else {
            dispatch(loginRegisterForm('register'))
        }
    }

    const onCommentsButtonClickHandler = ()=>{
        if(typeof window !== 'undefined'){
            const commentElement = document.getElementById('commentSection')
            if (commentElement){
                commentElement.scrollIntoView({behavior: 'smooth'})
            }
            // window.scrollTo({
            //     top: document.getElementById('commentSection').offsetTop, behavior: 'smooth'
            // })
        }
    }

    return (
        <div className={'actionButtons'}>

            <div className="actionButtonsLeftArea">
                {views ?
                    <span className={'actionItem views'}
                          title={dictionary?.['Views'] || 'Views'}>
                         <FontAwesomeIcon className={'rate-logo view'}
                                          color={'var(--secondary-text-color,#b3b3b3)'}
                                          icon={faEye}/>
                        <p className='ActionItemValue'>{shortNumber(views + 1)} </p>
                    </span>
                    : null
                }

                {rating ?
                    <>
                        <button className={'actionItem ActionItemLike'}
                                onClick={() => onLikeOrDisLikeHandler('likes')}
                                disabled={disableRatingButtons}
                                aria-label="like"
                                title={dictionary?.['Like'] || 'Like'}>

                            <FontAwesomeIcon className={'rate-logo thumbs-up'}
                                             color={disableRatingButtons ? '#666' : 'var(--secondary-text-color,#b3b3b3)'}
                                             icon={faThumbsUp} />
                            <p className='ActionItemValue'>{likes}</p>
                        </button>
                        <button className={'actionItem ActionItemDisLike'}
                                onClick={() => onLikeOrDisLikeHandler('disLikes')}
                                disabled={disableRatingButtons}
                                aria-label="dislike"
                                title={dictionary?.['Dislike'] || 'Dislike'}>
                            <FontAwesomeIcon className={'rate-logo thumbs-down'}
                                             color={disableRatingButtons ? '#666' : 'var(--secondary-text-color,#b3b3b3)'}
                                             icon={faThumbsDown}/>
                        </button>
                    </> : null
                }
            </div>

            <div className="actionButtonsRightArea">
                <button onClick={onCommentsButtonClickHandler} className={'actionItem'}>
                    <FontAwesomeIcon className={'commentsIcon'}
                                     icon={faComments} />
                </button>
            </div>
        </div>
    )
}

export default ActionButtons;