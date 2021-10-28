import React from 'react';
import {useDispatch} from "react-redux";
import {setActiveVisibleProfile} from "../../../../store/actions/chatroomActions";
import styled from "styled-components";
const ChatRoomOnlineUsersListItemStyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  background-color: transparent;
  border-radius: 10px;
  padding: 2px 5px;

  .chatroom-online-users-list-item-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .chatroom-online-users-list-item-username {
    color: var(--navigation-text-color, #ccc);
    margin-left: 5px;
  }

  .chatroom-online-users-list-item-more-info-button {
    background-color: transparent;
    color: var(--navigation-text-color, #ccc);
    border: none;

  }

  .chatroom-online-users-list-item-user-data {
    display: flex;
    align-items: center;
  }

  .chatroom-online-users-list-item-user-section {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
const ChatRoomOnlineUsersListItem = ({onlineUser}) => {

    const dispatch = useDispatch()

    return (
        <ChatRoomOnlineUsersListItemStyledDiv className='chatroom-online-users-list-item'
             onClick={() => dispatch(setActiveVisibleProfile({
                 username: onlineUser.username,
                 _id: onlineUser.id,
                 profileImage: onlineUser.profileImage
             }))}
        >

            <div className='chatroom-online-users-list-item-user-section' >
                <div className='chatroom-online-users-list-item-user-data'>
                    <img className='chatroom-online-users-list-item-image'
                         src={
                             onlineUser.profileImage ?
                                 onlineUser.profileImage :
                                 '/public/asset/images/user/noGenderAvatar150.jpg'}
                         alt="chatroom-online-users"
                    />
                    <p className='chatroom-online-users-list-item-username'>{onlineUser.username}</p>
                </div>
            </div>
        </ChatRoomOnlineUsersListItemStyledDiv>
    );
};

export default ChatRoomOnlineUsersListItem;
