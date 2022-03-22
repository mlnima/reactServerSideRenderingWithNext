import React, {FC} from 'react';
// import {conversation} from "@_variables/_userSocialAjaxVariables";
import {useRouter} from "next/router";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";
import {followUser, unFollowUser, getSpecificUserData, conversation} from "@store/clientActions/userActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const UserPageActionButtonsStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  .user-page-action-button {
    background-color: transparent;
    color: var(--navigation-text-color, #ccc);
    border: none;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;

    &:hover {
      transition: .5s;
      transform: scale(1.1);
    }

    &:active {
      color: var(--navigation-background-color, #18181b);
      background-color: var(--navigation-text-color, #ccc);
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
    const dispatch = useDispatch()
    const userData = useSelector((store: StoreTypes) => store?.user?.userData)
    const userPageData = useSelector((store: StoreTypes) => store?.user?.userPageData)

    const onFollowHandler = () => {
        if (userPageData?._id) {
            dispatch(followUser(userPageData._id))
            dispatch(getSpecificUserData(['following']))
            // followUser(userPageData._id).then(() => {
            //     dispatch(getSpecificUserData(['following']))
            // })
        } else {
            dispatch(setLoginRegisterFormStatus('login'))
        }
    }

    const onUnFollowHandler = () => {
        dispatch(unFollowUser(userPageData._id))
        dispatch(getSpecificUserData(['following']))
        // unFollowUser(userPageData._id).then(() => {
        //     dispatch(getSpecificUserData(['following']))
        // })
    }


    const onConversationHandler = () => {

        if (userData._id && userPageData._id) {
            dispatch(conversation(userPageData._id,push))
            // conversation(userPageData._id).then(res => {
            //     const conversation = res.data.conversation
            //     router.push(`/messenger/${conversation._id}`)
            // }).catch(err => {
            //     console.log(err)
            // })
        } else {
            dispatch(setLoginRegisterFormStatus('login'))
        }

    }


    return (

        <UserPageActionButtonsStyledDiv className='user-page-action-buttons'>


            <button className='user-page-action-button action-client-button-link'
                    onClick={onConversationHandler}>{t('Send Message')}</button>
            <div>
                {userData?.following?.includes(userPageData._id) ?
                    <button className='user-page-action-button action-client-button-link'
                            onClick={onUnFollowHandler}>{t('Unfollow')}  </button> :
                    <button className='user-page-action-button action-client-button-link'
                            onClick={onFollowHandler}>{t('Follow')} </button>
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
