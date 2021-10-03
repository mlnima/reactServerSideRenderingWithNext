import React, { useContext} from 'react';
import {followUser, unFollowUser, conversation} from "../../../../_variables/_userSocialAjaxVariables";
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setLoginRegisterFormStatus} from "../../../../store/actions/globalStateActions";
import {getSpecificUserData} from "../../../../store/actions/userActions";

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

const UserPageActionButtons = ({t, _id}) => {

    const router = useRouter()
    const contextData = useContext(AppContext);

    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.userData)
    const userPageData = useSelector(state => state.user.userPageData)

    const onFollowHandler = () => {
        if (userPageData._id) {
            followUser(userPageData._id).then(() => {
                dispatch(getSpecificUserData(['following']))
            })
        } else {
            dispatch(setLoginRegisterFormStatus('login'))
        }
    }

    const onUnFollowHandler = () => {
        unFollowUser(userPageData._id).then(() => {
            dispatch(getSpecificUserData(['following']))
        })
    }


    const onConversationHandler = () => {

        if (userData._id && userPageData._id) {
            conversation(userPageData._id).then(res => {
                const conversation = res.data.conversation
                router.push(`/messenger/${conversation._id}`)
            }).catch(err => {
                console.log(err)
            })
        } else {
            contextData.dispatchState({
                ...contextData.state,
                loginRegisterFormPopup: true
            })
        }

    }


    return (

        <UserPageActionButtonsStyledDiv className='user-page-action-buttons'>


            <button className='user-page-action-button action-client-button-link' onClick={onConversationHandler}>{t([`common:Send Message`])}</button>
            <div>
                {userData?.following?.includes(userPageData._id) ?
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
