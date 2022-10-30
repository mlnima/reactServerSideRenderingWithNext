import React, {FC} from 'react';
import styled from "styled-components";
import {setActiveVisibleProfile} from "../../../../store_toolkit/clientReducers/chatroomReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";

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

interface ChatRoomOnlineUsersListItemPropType{
    onlineUser:{
        username: string,
        id: string,
        profileImage: string
    }
}

const ChatRoomOnlineUsersListItem:FC<ChatRoomOnlineUsersListItemPropType> = ({onlineUser}) => {

    const dispatch = useAppDispatch()

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
