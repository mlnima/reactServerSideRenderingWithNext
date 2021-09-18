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
    color: var(--navigation-text-color);
    border: none;
    padding: 5px 10px;
    margin: 5px;
  }
  .user-page-action-button:hover{
    transition: .5s;
    transform: scale(1.1);
  }
  .user-page-action-button:active{
    color: var(--navigation-background-color);
    background-color: var(--navigation-text-color);
  }
  @media only screen and (min-width: 768px) {
      justify-content: flex-start;
  }
`

const UserPageActionButtons = ({t,_id, setParentState, parentState,username}) => {
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
        if (contextData.userData._id){
            conversation(_id).then(res => {
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

        <div className='user-page-action-buttons'>


            <button className='user-page-action-button' onClick={onConversationHandler}>Message</button>
            {
                    contextData?.userData?.following?.includes(_id) ?
                    <button className='user-page-action-button' onClick={onUnFollowHandler}>{t([`common:Unfollow`])}</button> :
                    <button className='user-page-action-button' onClick={onFollowHandler}>{t([`common:Follow`])}</button>
            }
        </div>
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
