import ChatRoomOnlineUsersListItem from "./ChatRoomOnlineUsersListItem";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {uniqArrayBy} from "custom-util";
import {Store} from "typescript-types";
import {useEffect, useMemo} from "react";

const ChatRoomOnlineUsersListStyledDiv = styled.div`
  background-color: var(--secondary-background-color, #181818);
  width: 100%;
  height: 100%;
  padding: 5px;
  overflow-y: scroll;
  border: var(--default-border);
  box-sizing: border-box;
  grid-area: chatroomOnlineUsersList;
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
            {renderOnlineUsers}

        </ChatRoomOnlineUsersListStyledDiv>
    );

};
export default ChatRoomOnlineUsersList;
