import React, {FC} from 'react';
import {useRouter} from "next/router";
import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import { useSelector} from "react-redux";

import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import {followUserAction} from "@store_toolkit/clientReducers/userReducers/followUserAction";
import {unfollowUserAction} from "@store_toolkit/clientReducers/userReducers/unfollowUserAction";
import {startConversationAction} from "@store_toolkit/clientReducers/userReducers/startConversationAction";
import {getSpecificUserDataAction} from "@store_toolkit/clientReducers/userReducers/getSpecificUserDataAction";

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
    _id?: string
}

const UserPageActionButtons: FC<UserPageActionButtonsPropType> = ({_id}) => {
    const {t} = useTranslation('common');
    const {push} = useRouter()
    const dispatch = useAppDispatch()
    const {userData,loggedIn} = useSelector((store: Store) => store?.user)
    const userPageData = useSelector((store: Store) => store?.user?.userPageData)

    const onFollowHandler = () => {
        if (userPageData?._id && loggedIn && userData?._id ) {
            dispatch(followUserAction(userPageData._id))
        } else {
            dispatch(loginRegisterForm('login'))
        }
    }

    const onUnFollowHandler = () => {
        if (userPageData?._id){
            dispatch(unfollowUserAction(userPageData?._id))
        }
    }

    const onConversationHandler = () => {
        if (!!userData?._id && !!userPageData?._id) {
            dispatch(startConversationAction({_id:userPageData._id, push}))

        } else {
            dispatch(loginRegisterForm('login'))
        }
    }

    return (
        <UserPageActionButtonsStyledDiv className='user-page-action-buttons'>
            <button className='user-page-action-button action-client-button-link'
                    onClick={onConversationHandler}>{t<string>('Send Message')}</button>
            <div>
                {!!userPageData?.isFollowed ?
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


