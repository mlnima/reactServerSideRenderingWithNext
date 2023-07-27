import React, {FC, useEffect} from 'react';
import {useRouter} from "next/router";
import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {followUserAction} from "@store_toolkit/clientReducers/userReducers/followUserAction";
import {unfollowUserAction} from "@store_toolkit/clientReducers/userReducers/unfollowUserAction";
import {startAConversationAction} from "@store_toolkit/clientReducers/messengerActions/startAConversationAction";
import {clientAPIRequestStartAConversation} from "api-requests";

const UserPageActionButtonsStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  .user-page-action-button {
    background-color: transparent;
    color: var(--primary-text-color,#fff);
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
      background-color: var(--primary-text-color,#fff);
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
    const [startedTheConversation, setStartedTheConversation] = React.useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {userData, loggedIn, userPageData} = useAppSelector(({user}) => user)

    const {activeConversation} = useAppSelector(({messenger}) => messenger)


    const onFollowHandler = () => {
        if (userPageData?._id && loggedIn && userData?._id) {
            dispatch(followUserAction(userPageData._id))
        } else {
            dispatch(loginRegisterForm('login'))
        }
    }

    const onUnFollowHandler = () => {
        if (userPageData?._id) {
            dispatch(unfollowUserAction(userPageData?._id))
        }
    }


    const onConversationHandler = async () => {
        if (!!userData?._id && !!userPageData?._id) {
            await clientAPIRequestStartAConversation({users: [userPageData?._id, userData?._id]}).then(response => {
                //@ts-ignore
                if (response?.data?.conversation?._id) {
                    //@ts-ignore
                    router.push(`/messenger?_id=${response.data.conversation._id}`)
                }
            })
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


