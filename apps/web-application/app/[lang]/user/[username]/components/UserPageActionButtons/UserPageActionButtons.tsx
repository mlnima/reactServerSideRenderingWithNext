'use client';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginRegisterForm } from '@store/reducers/globalStateReducer';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import './UserPageActionButtons.styles.scss';
import FollowingOptionsPopup from './FollowingOptionsPopup/FollowingOptionsPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IUserPageData } from '@repo/typescript-types';
import follow from '@lib/actions/database/operations/users/follow';
import unfollow from '@lib/actions/database/operations/users/unfollow';
import { clearACacheByTag } from '@lib/serverActions';
import newConversation from '@lib/actions/database/operations/messenger/newConversation';
import { setAlert } from '@store/reducers/globalStateReducer';
import { ServerActionResponse } from '@lib/actions/response';

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
      if (!_id) return;

      const { success,message } = await follow({
        followId: _id,
      }) as ServerActionResponse;

      if (!success) {
        dispatch(
          setAlert({
            message: message || 'Something went wrong please try again later',
            type: 'error',
          })
        )

        return;
      }

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
      if (!userPageData._id) return;
      const { success,message } = await unfollow({
        unfollowId: userPageData._id,
      }) as ServerActionResponse;

      if (!success) {
        setAlert({
          message: message || 'Something went wrong please try again later',
          type: 'error',
        });
        return;
      }

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

      const { success, data, message } = await newConversation({
        targetUsers: [_id],
      }) as ServerActionResponse<{ conversationId: string }>;

      if (!success || !data || !data?.conversationId) {
        if (message) {
          dispatch(setAlert({ message, type: 'error', active: true }));
        }
        return;
      }

      push(`/messenger?_id=${data?.conversationId}`);

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