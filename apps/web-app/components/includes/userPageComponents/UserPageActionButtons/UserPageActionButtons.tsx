import React, {FC, useEffect} from 'react';
import {useRouter} from "next/router";
// import {useTranslation} from 'next-i18next';
import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import { useSelector} from "react-redux";
import {
    fetchFollowUser,
    fetchSpecificUserData,
    fetchStartConversation,
    fetchUnFollowUser
} from "../../../../store_toolkit/clientReducers/userReducer";
import {loginRegisterForm} from "../../../../store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "typescript-types";
const UserPageActionButtonsStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  .user-page-action-button {
    background-color: transparent;
    color: var(--main-text-color, #fff);
    border: none;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;

    &:hover {
      transition: .5s;
      transform: scale(1.1);
    }

    &:active {
      color: var(--secondary-background-color, #181818);
      background-color: var(--main-text-color, #fff);
    }
  }


  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`

interface UserPageActionButtonsPropType {
    _id: string
}

const UserPageActionButtons: FC<UserPageActionButtonsPropType> = ({_id}) => {
    const {t} = useTranslation('common');
    const {push} = useRouter()
    const dispatch = useAppDispatch()
    const {userData,loggedIn} = useSelector((store: Store) => store?.user)
    const userPageData = useSelector((store: Store) => store?.user?.userPageData)

    // useEffect(() => {
    //     console.log(loggedIn)
    // }, [userData]);
    const onFollowHandler = () => {
        if (userPageData?._id && loggedIn && userData._id ) {
            dispatch(fetchFollowUser(userPageData._id))
            dispatch(fetchSpecificUserData({fields:['following']}))
        } else {
            dispatch(loginRegisterForm('login'))
        }
    }

    const onUnFollowHandler = () => {
        dispatch(fetchUnFollowUser(userPageData._id))
        dispatch(fetchSpecificUserData({fields:['following']}))
    }


    const onConversationHandler = () => {

        if (userData._id && userPageData._id) {
            dispatch(fetchStartConversation({_id:userPageData._id, push}))

        } else {
            dispatch(loginRegisterForm('login'))
        }

    }


    return (

        <UserPageActionButtonsStyledDiv className='user-page-action-buttons'>


            <button className='user-page-action-button action-client-button-link'
                    onClick={onConversationHandler}>{t<string>('Send Message')}</button>
            <div>
                {userData?.following?.includes(userPageData._id) ?
                    <button className='user-page-action-button action-client-button-link'
                            onClick={onUnFollowHandler}>{t<string>('Unfollow')}  </button> :
                    <button className='user-page-action-button action-client-button-link'
                            onClick={onFollowHandler}>{t<string>('Follow')} </button>
                }
            </div>

            {/*<div className='follow-count'>*/}
            {/*    <p>{t([`common:Followers`])} :  <span>{userData?.followers ? userData.followers?.length : 0}</span></p>*/}
            {/*    <p>{t([`common:Following`])} :  <span>{userData?.following ? userData.following?.length : 0}</span></p>*/}
            {/*</div>*/}

        </UserPageActionButtonsStyledDiv>
    );
};
export default UserPageActionButtons;


// {
//     contextData?.userData?.pendingSentFriendRequests?.includes(_id) ?
//         <button className='user-page-action-button' onClick={onCancelFriendRequest}>Cancel Request</button> :
//         contextData?.userData?.friends?.includes(_id) ?
//             <button className='user-page-action-button' onClick={onUnfriendHandler}>Unfriend</button> :
//             contextData?.userData?.pendingReceivedFriendRequests?.includes(_id) ?
//                 <button className='user-page-action-button' onClick={onAcceptFriendRequestHandler}>Accept Friend Request</button> :
//                 <button className='user-page-action-button' onClick={onSendFriendRequestHandler}>Add Friend</button>
// }
