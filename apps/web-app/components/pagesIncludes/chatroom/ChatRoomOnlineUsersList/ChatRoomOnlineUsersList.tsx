import ChatRoomOnlineUsersListItem from "./ChatRoomOnlineUsersListItem";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {uniqArrayBy} from "custom-util";
import {Store} from "typescript-types";
import {useEffect, useMemo} from "react";

const ChatRoomOnlineUsersListStyledDiv = styled.div`

  width: 100%;
  box-sizing: border-box;
  grid-area: chatroomOnlineUsersList;
  background-color: var(--secondary-background-color, #181818);
  .user-list {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    flex-grow: 1;
    max-height: 100vh;
    overflow-y: scroll;
  }

`

const ChatRoomOnlineUsersList = () => {

    const chatroomUsers = useSelector(({chatroom}: Store) => chatroom?.onlineUsers)

    const memoUsers = useMemo(()=> {
        return [...uniqArrayBy(chatroomUsers, 'username')].sort((a, b) => a.username > b.username ? 1 : -1)
    },[chatroomUsers])

    const renderOnlineUsers = memoUsers.map(onlineUser => {
                return (
                    <ChatRoomOnlineUsersListItem key={`${onlineUser.username + Date.now()}`} onlineUser={onlineUser}/>
                )
            }
        )

    return (
        <ChatRoomOnlineUsersListStyledDiv className='chatroom-online-users-list custom-scroll'>
            <div className={'user-list custom-scroll'}>
                {renderOnlineUsers}

            </div>
        </ChatRoomOnlineUsersListStyledDiv>
    );

};
export default ChatRoomOnlineUsersList;
