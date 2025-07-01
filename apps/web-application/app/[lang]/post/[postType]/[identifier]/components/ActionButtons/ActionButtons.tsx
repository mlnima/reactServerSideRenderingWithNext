'use client';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { shortNumber } from '@repo/utils';
import './ActionButtons.scss';
import { loginRegisterForm, setAlert } from '@store/reducers/globalStateReducer';


import { faComments, faHeart as faHeardSolid } from '@fortawesome/free-solid-svg-icons';
import { clearACacheByTag } from '@lib/serverActions';
import ratePost from '@lib/actions/database/posts/ratePost';
import viewPost from '@lib/actions/database/posts/viewPost';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { ServerActionResponse } from '@lib/actions/response';

interface IProps {
  rating: boolean;
  dictionary: {
    [key: string]: string;
  };
  likes: number | undefined;
  views: number | undefined;
  _id: string | undefined;
}

const ActionButtons: FC<IProps> = (
  {
    rating,
    likes,
    views,
    dictionary,
    _id,
  }) => {

  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector(({ user }) => user);
  const [didView, setDidView] = useState<boolean>(false);
  const [didLike, setDidLike] = useState<boolean>(false);
  const [rateLock, setRateLock] = useState<boolean>(false);

  useEffect(() => {
    if (_id && !didView) {
      setDidView(true);
      viewPost(_id);
    }
    return () => {
      setDidView(false);
    };
  }, []);

  useEffect(() => {
    if (_id && typeof window !== 'undefined') {
      const stored = localStorage.getItem('likedPosts');
      let likedPosts: string[] = stored ? JSON.parse(stored) : [];
      if (likedPosts.includes(_id))
        setDidLike(true);
    }
  }, []);

  const onRateHandler = async () => {
    if (rateLock) return;

    if (loggedIn && _id) {
      try {
        setRateLock(true);
        const { success, message , data } = await ratePost({ _id }) as ServerActionResponse<{result:string}>;

        if (!success || !data) {
          dispatch(setAlert({
            message,
            type: 'error',
          }));
          return;
        }

        const stored = localStorage.getItem('likedPosts');

        let likedPosts: string[] = stored ? JSON.parse(stored) : [];

        const result = data.result
        if (likedPosts.includes(_id)) {
          if (result === 'liked'){
            return
          }else {
            likedPosts = likedPosts.filter(id => id !== _id);
            setDidLike(false);
          }
        } else {
          if (result === 'liked') {
            likedPosts.push(_id);
            setDidLike(true);
          }else {
            setDidLike(false);
          }
        }
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
       // await clearACacheByTag(`CPostRating-${_id}`); since we are getting the rating along the post to avoid high memory usage, we will clear the post cache,
        await clearACacheByTag(`CPost-${_id}`);
      } catch (error) {
        dispatch(setAlert({
          message: 'Something Went Wrong',
          type: 'error',
        }));
      }
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


  useEffect(() => {
    if (rateLock) {
      setTimeout(() => {
        setRateLock(false);
      }, 1000);
    }
  }, [rateLock]);

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
              onClick={onRateHandler}
              disabled={rateLock}
              aria-label="like"
              title={dictionary?.['Like'] || 'Like'}>
              <FontAwesomeIcon
                className={'rate-logo thumbs-up'}
                color={rateLock ? '#666' : 'var(--primary-text-color)'}
                icon={didLike ? faHeardSolid : faHeartRegular}
              />
              <p className="ActionItemValue">{likes}</p>
            </button>
          </>
        ) : null}
        <button onClick={onCommentsButtonClickHandler} className={'actionItem'}>
          <FontAwesomeIcon className={'commentsIcon'} icon={faComments} />
        </button>
      </div>

      <div className="actionButtonsRightArea">

      </div>
    </div>
  );
};

export default ActionButtons;


// const onRateHandler = async () => {
//     if (loggedIn && _id) {
//       try {
//         setRateLock(true);
//         await ratePost({_id})
//         setRateLock(false)
//         await clearACacheByTag(`CPostRating-${_id}`)
//       }catch (error){
//
//       }
//     } else {
//         dispatch(loginRegisterForm('register'));
//     }
// };