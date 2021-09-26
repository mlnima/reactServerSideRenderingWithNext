import React, {useEffect, useState, useContext, useRef} from 'react';
import {followUser, unFollowUser, sendFriendRequest, acceptFriendRequest, unfriendRequest, cancelFriendRequest, conversation} from "../../../../_variables/_userSocialAjaxVariables";
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";
import styled from "styled-components";
const UserPageActionButtonsStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap:wrap;
  align-items: center;

  .user-page-action-button{
    background-color: transparent;
    color: var(--navigation-text-color, #ccc);
    border: none;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
    &:hover{
      transition: .5s;
      transform: scale(1.1);
    }
    &:active{
      color: var(--navigation-background-color,#18181b);
      background-color: var(--navigation-text-color, #ccc);
    }
  }


  @media only screen and (min-width: 768px) {
      justify-content: flex-start;
  }
`

const UserPageActionButtons = ({t,_id, setParentState, parentState,userData}) => {
    const router = useRouter()
    const contextData = useContext(AppContext);

    const onFollowHandler = () => {
        if (contextData.userData._id){
            followUser(_id).then(res => {
                const newFollowingListForReqSender = res?.data?.updatedRequestSenderData || {}
                contextData.dispatchUserData({
                    ...contextData.userData,
                    ...newFollowingListForReqSender
                })
            })
        }else {
            contextData.dispatchState({
                ...contextData.state,
                loginRegisterFormPopup:true
            })
        }

    }

    const onUnFollowHandler = () => {
        unFollowUser(_id).then(res => {
            const newFollowingListForReqSender = res?.data?.updatedRequestSenderData || {}
            contextData.dispatchUserData({
                ...contextData.userData,
                ...newFollowingListForReqSender
            })
        })
    }



    const onConversationHandler = () => {

        if (contextData.userData._id && userData._id){
            conversation(userData._id).then(res => {
                const conversation = res.data.conversation
                router.push(`/messenger/${conversation._id}`)
            }).catch(err => {
                console.log(err)
            })
        }else {
            contextData.dispatchState({
                ...contextData.state,
                loginRegisterFormPopup:true
            })
        }

    }


    return (

        <UserPageActionButtonsStyledDiv className='user-page-action-buttons'>


            <button className='user-page-action-button action-client-button-link' onClick={onConversationHandler}>{t([`common:Send Message`])}</button>
            <div>
                {
                    contextData?.userData?.following?.includes(_id) ?
                        <button className='user-page-action-button action-client-button-link' onClick={onUnFollowHandler}>{t([`common:Unfollow`])}  </button> :
                        <button className='user-page-action-button action-client-button-link' onClick={onFollowHandler}>{t([`common:Follow`])} </button>
                }
            </div>

            {/*<div className='follow-count'>*/}
            {/*    <p>{t([`common:Followers`])} :  <span>{userData?.followers ? userData.followers?.length : 0}</span></p>*/}
            {/*    <p>{t([`common:Following`])} :  <span>{userData?.following ? userData.following?.length : 0}</span></p>*/}
            {/*</div>*/}

        </UserPageActionButtonsStyledDiv>
    );
};
export default withTranslation(['common'])(UserPageActionButtons);


// {
//     contextData?.userData?.pendingSentFriendRequests?.includes(_id) ?
//         <button className='user-page-action-button' onClick={onCancelFriendRequest}>Cancel Request</button> :
//         contextData?.userData?.friends?.includes(_id) ?
//             <button className='user-page-action-button' onClick={onUnfriendHandler}>Unfriend</button> :
//             contextData?.userData?.pendingReceivedFriendRequests?.includes(_id) ?
//                 <button className='user-page-action-button' onClick={onAcceptFriendRequestHandler}>Accept Friend Request</button> :
//                 <button className='user-page-action-button' onClick={onSendFriendRequestHandler}>Add Friend</button>
// }
