'use client';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { shortNumber } from '@repo/utils';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons/faThumbsDown';
import './ActionButtons.scss';
import { loginRegisterForm } from '@store/reducers/globalStateReducer';
// import {
//     clientAPIRequestViewPost,
// } from '@repo/api-requests';

import { faComments } from '@fortawesome/free-solid-svg-icons';
import {clearACacheByTag} from "@lib/serverActions";
import ratePost from '@lib/actions/database/operations/posts/ratePost';
import viewPost from '@lib/actions/database/operations/posts/viewPost';

interface IProps {
    rating: boolean;
    dictionary: {
        [key: string]: string;
    };
    likes: number | undefined;
    disLikes: number | undefined;
    views: number | undefined;
    _id: string | undefined;
}

const ActionButtons: FC<IProps> = ({
    rating,
    likes,
    disLikes,
    views,
    dictionary,
    _id,
}) => {
    const dispatch = useAppDispatch();
    const { loggedIn } = useAppSelector(({ user }) => user);
    const [didView, setDidView] = useState<boolean>(false);
    const [disableRatingButtons, setDisableRatingButtons] =
        useState<boolean>(false);

    useEffect(() => {
        if (_id && !didView) {
            setDidView(true);

          viewPost(_id)
        }
        return () => {
            setDidView(false);
        };
    }, []);

    const onLikeOrDisLikeHandler = async (type: 'likes' | 'disLikes') => {
        if (loggedIn && _id) {
            setDisableRatingButtons(true);
            await ratePost({
              token:localStorage.getItem('wt'),
              _id,
              type
            })
                .finally(() => {
                    setDisableRatingButtons(false);
                    clearACacheByTag(`CPostRating-${_id}`);
                });
        } else {
            dispatch(loginRegisterForm('register'));
        }
    };

    const onCommentsButtonClickHandler = () => {
        if (typeof window !== 'undefined') {
            const commentElement = document.getElementById('commentSection');
            if (commentElement) {
                commentElement.scrollIntoView({ behavior: 'smooth' });
            }
            // window.scrollTo({
            //     top: document.getElementById('commentSection').offsetTop, behavior: 'smooth'
            // })
        }
    };

    return (
        <div className={'actionButtons'}>
            <div className="actionButtonsLeftArea">
                {views ? (
                    <span className={'actionItem views'} title={dictionary?.['Views'] || 'Views'}>
                        <FontAwesomeIcon
                            className={'rate-logo view'}
                            color={'var(--primary-text-color)'}
                            icon={faEye}
                        />
                        <p className="ActionItemValue">{shortNumber(views + 1)} </p>
                    </span>
                ) : null}

                {rating ? (
                    <>
                        <button
                            className={'actionItem ActionItemLike'}
                            onClick={() => onLikeOrDisLikeHandler('likes')}
                            disabled={disableRatingButtons}
                            aria-label="like"
                            title={dictionary?.['Like'] || 'Like'}
                        >
                            <FontAwesomeIcon
                                className={'rate-logo thumbs-up'}
                                color={disableRatingButtons ? '#666' : 'var(--primary-text-color)'}
                                icon={faThumbsUp}
                            />
                            <p className="ActionItemValue">{likes}</p>
                        </button>
                        <button
                            className={'actionItem ActionItemDisLike'}
                            onClick={() => onLikeOrDisLikeHandler('disLikes')}
                            disabled={disableRatingButtons}
                            aria-label="dislike"
                            title={dictionary?.['Dislike'] || 'Dislike'}
                        >
                            <FontAwesomeIcon
                                className={'rate-logo thumbs-down'}
                                color={disableRatingButtons ? '#666' : 'var(--primary-text-color)'}
                                icon={faThumbsDown}
                            />
                            <p className="ActionItemValue">{disLikes}</p>
                        </button>
                    </>
                ) : null}
            </div>

            <div className="actionButtonsRightArea">
                <button onClick={onCommentsButtonClickHandler} className={'actionItem'}>
                    <FontAwesomeIcon className={'commentsIcon'} icon={faComments} />
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
