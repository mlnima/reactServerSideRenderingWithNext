'use client';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginRegisterForm } from '@store/reducers/globalStateReducer';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import './UserPageActionButtons.styles.scss';
import FollowingOptionsPopup from './FollowingOptionsPopup/FollowingOptionsPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AxiosResponse } from 'axios';
import { IUserPageData } from '@repo/typescript-types';
import { follow, unfollow } from '@lib/database/operations/users';
import { clearACacheByTag } from '@lib/serverActions';
import { newConversation } from '@lib/database/operations/Messenger';

interface IProps {
  _id?: string;
  dictionary: {
    [key: string]: string;
  };
  userPageData: IUserPageData;
  getUserPageData: Function;
}

const UserPageActionButtons: FC<IProps> = (
  {
    _id,
    dictionary,
    userPageData,
    getUserPageData,
  }) => {

  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { userData, loggedIn } = useAppSelector(({ user }) => user);
  const [followingOptionsPop, setFollowingOptionsPop] = useState(false);

  const onFollowHandler = async () => {
    try {
      await follow({
        follower: userData._id,
        followed: _id,
      });
      await clearACacheByTag(`CUserPageInitial-${_id}`);
      await clearACacheByTag(`CUserPageLoaded-${_id}-${userData._id}`);
      await getUserPageData();
    } catch (error) {
      console.error(`onFollowHandler=> `, error);
      return;
    }
  };

  const onUnFollowHandler = async () => {
    try {
      await unfollow({
        follower: userData._id,
        followed: userPageData._id,
      });
      await clearACacheByTag(`CUserPageInitial-${userPageData._id}`);
      await clearACacheByTag(`CUserPageLoaded-${userPageData._id}-${userData._id}`);
      await getUserPageData();
    } catch (error) {
      console.error(`onUnFollowHandler=> `, error);
      return;
    }
  };

  const onConversationHandler = async () => {
    if (loggedIn && userPageData._id && _id) {

      const conversation = await newConversation({
        token:localStorage.getItem('wt'),
        users: [_id, userData?._id]
      })

      if (!conversation || !conversation?._id){
        return
      }

      push(`/messenger?_id=${conversation._id}`);

    } else {
      dispatch(loginRegisterForm('login'));
    }
  };

  return (
    <div className="userPageActionButtons">
      {userData?._id === userPageData._id && (
        <>
          <button
            className={'userPageActionButton btn btn-transparent'}
            onClick={() => push(`/account/edit`)}
          >
            {dictionary?.['Edit Profile'] || 'Edit Profile'}
          </button>
        </>
      )}

      {userData?._id != userPageData._id && (
        <>
          <button className={'userPageActionButton btn btn-transparent'} onClick={onConversationHandler}>
            {dictionary?.['Send Message'] || 'Send Message'}
          </button>
          <div>
            {followingOptionsPop && (
              <FollowingOptionsPopup
                setFollowingOptionsPop={setFollowingOptionsPop}
                onUnFollowHandler={onUnFollowHandler}
                username={userPageData.username}
                profileImage={userPageData?.profileImage}
                dictionary={dictionary}
              />
            )}
            {userPageData?.isFollowed ? (
              <button
                className={'userPageActionButton btn btn-transparent'}
                onClick={() => setFollowingOptionsPop(true)}
              >
                {dictionary?.['Follow'] || 'Follow'}
                <FontAwesomeIcon icon={faChevronDown} style={{ width: 10, height: 10 }} />
              </button>
            ) : (
              <button className="userPageActionButton btn btn-transparent"
                      onClick={onFollowHandler}
              >
                {dictionary?.['Follow'] || 'Follow'}{' '}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default UserPageActionButtons;


// {didRequesterFollowThisUser ?
//     <button className='user-page-action-button action-client-button-link'
//             onClick={onUnFollowHandler}>{dictionary?.['Unfollow'] || 'Unfollow'}  </button> :
//     <button className='user-page-action-button action-client-button-link'
//             onClick={onFollowHandler}>{dictionary?.['Follow'] || 'Follow'} </button>
// }