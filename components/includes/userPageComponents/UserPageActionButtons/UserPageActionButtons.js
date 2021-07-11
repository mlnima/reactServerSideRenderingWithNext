import React, {useEffect, useState, useContext, useRef} from 'react';
import {followUser,unFollowUser} from "../../../../_variables/_userSocialAjaxVariables";
import {AppContext} from "../../../../context/AppContext";

const UserPageActionButtons = ({_id}) => {
    const contextData = useContext(AppContext);

    useEffect(() => {
        console.log(contextData.userData)
    }, [contextData.userData]);


    const onFollowHandler = () => {
        followUser(_id).then(res => {
            const newFollowingListForReqSender = res?.data?.updatedRequestSenderData || {}
            contextData.dispatchUserData({
                ...contextData.userData,
                ...newFollowingListForReqSender
            })
        })
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


    return (
        <div className='user-page-action-buttons'>
        <style jsx>{`
            .user-page-action-buttons{
                display: flex;
                justify-content: center;
                flex-wrap:wrap;
                align-items: center;
            }
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
                .user-page-action-buttons{
                    justify-content: flex-start;
                }
            }
        `}
        </style>
            <button className='user-page-action-button'>Add Friend</button>
            {
                contextData?.userData?.following?.includes(_id) ?
                <button className='user-page-action-button' onClick={onUnFollowHandler}>Following</button>  :
                <button className='user-page-action-button' onClick={onFollowHandler}>Follow</button>
            }
            <button className='user-page-action-button'>Message</button>
        </div>
    );
};
export default UserPageActionButtons;
