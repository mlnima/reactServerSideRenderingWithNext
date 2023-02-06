import React, {FC} from 'react';
import styled from "styled-components";
import {setActiveVisibleProfile} from "@store_toolkit/clientReducers/chatroomReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import UserPreviewImage from "ui/src/UserPreviewImage";
import Link from "next/link";

const ChatRoomOnlineUsersListItemStyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  border-radius: 10px;
  padding: 2px 5px;
  
  .chatroom-online-users-list-item-user-section {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .chatroom-online-users-list-item-user-data {
      a{
        display: flex;
        align-items: center;
        .chatroom-online-users-list-item-username {
          color: var(--main-text-color, #fff);
          margin-left: 5px;
        }
      }
    }
  }
`

interface ChatRoomOnlineUsersListItemPropType {
    onlineUser: {
        username: string,
        id: string,
        profileImage: string
    }
}

const ChatRoomOnlineUsersListItem: FC<ChatRoomOnlineUsersListItemPropType> = ({onlineUser}) => {

    // const dispatch = useAppDispatch()

    // const onClickHandler = () => {
    //     dispatch(setActiveVisibleProfile({
    //         username: onlineUser.username,
    //         _id: onlineUser.id,
    //         profileImage: onlineUser.profileImage
    //     }))
    // }

    return (
        <ChatRoomOnlineUsersListItemStyledDiv className='chatroom-online-users-list-item'>
            <div className='chatroom-online-users-list-item-user-section'>
                <div className='chatroom-online-users-list-item-user-data'>
                    <Link href={`/user/${onlineUser.username}`}>
                        <UserPreviewImage imageUrl={onlineUser?.profileImage} size={16}/>
                        <p className='chatroom-online-users-list-item-username'>{onlineUser.username}</p>
                    </Link>
                </div>
            </div>
        </ChatRoomOnlineUsersListItemStyledDiv>
    );
};

export default ChatRoomOnlineUsersListItem;
