import _ from "lodash";
import ChatRoomOnlineUsersListItem from "./ChatRoomOnlineUsersListItem";
import {useSelector} from "react-redux";
import styled from "styled-components";

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

    const chatroomUsers = useSelector(store => store?.chatroom?.onlineUsers)

    const renderOnlineUsers = _.uniqBy(chatroomUsers, e => e.username).sort((a, b) => a.username > b.username ? 1 : -1).map(onlineUser => {
            return (
                <ChatRoomOnlineUsersListItem key={_.uniqueId('message_')} onlineUser={onlineUser}/>
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
