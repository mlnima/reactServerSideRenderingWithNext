import ChatRoomOnlineUsersListItem from "./ChatRoomOnlineUsersListItem";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {uniqArrayBy} from "custom-util";
import {Store} from "typescript-types";

const ChatRoomOnlineUsersListStyledDiv = styled.div`
  display: initial;
  background-color: var(--navigation-background-color, #18181b);
  position: fixed;
  width: 150px;
  top: 48px;
  right: 0;
  bottom: 50px;
  padding: 5px;
  overflow-y: scroll;
`

const ChatRoomOnlineUsersList = () => {

    const chatroomUsers = useSelector(({chatroom}:Store) => chatroom?.onlineUsers)

    const renderOnlineUsers = [...uniqArrayBy(chatroomUsers,'username')]
        .sort((a, b) => a.username > b.username ? 1 : -1).map(onlineUser => {
            return (
                <ChatRoomOnlineUsersListItem key={`${onlineUser.username + Date.now()}`} onlineUser={onlineUser}/>
            )
        }
    )

    return (
        <ChatRoomOnlineUsersListStyledDiv className='chatroom-online-users-list'>
            {renderOnlineUsers}
        </ChatRoomOnlineUsersListStyledDiv>
    );

};
export default ChatRoomOnlineUsersList;
