import ChatRoomOnlineUsersListItem from "./ChatRoomOnlineUsersListItem";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {uniqArrayBy} from "custom-util";
import {Store} from "typescript-types";

const ChatRoomOnlineUsersListStyledDiv = styled.div`
  display: initial;
  background-color: var(--secondary-background-color, #181818);
  position: absolute;
  width: 150px;
  top: 0;
  right: 0;
  bottom: 50px;
  height: 70vh;
  padding: 5px;
  overflow-y: scroll;
  //border-radius: 15px;
  box-sizing: border-box;
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
        <ChatRoomOnlineUsersListStyledDiv className='chatroom-online-users-list custom-scroll'>
            {renderOnlineUsers}

        </ChatRoomOnlineUsersListStyledDiv>
    );

};
export default ChatRoomOnlineUsersList;
