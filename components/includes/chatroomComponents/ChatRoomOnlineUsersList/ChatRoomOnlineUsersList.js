import _ from "lodash";
import ChatRoomOnlineUsersListItem from "./ChatRoomOnlineUsersListItem";

const ChatRoomOnlineUsersList = ({onlineUsers,onlineUserListVisibility,onUserInfoShowHandler}) => {
    const renderOnlineUsers = onlineUsers.map(onlineUser=>{
        return(
            <ChatRoomOnlineUsersListItem key={_.uniqueId('message_')} onlineUser={onlineUser} onUserInfoShowHandler={onUserInfoShowHandler}/>
        )
    })
    return (
        <div className='chatroom-online-users-list'>
            <style jsx>{`
                .chatroom-online-users-list{
                    display: ${onlineUserListVisibility ? 'initial' : 'none' };
                    background-color: var(--navigation-background-color);
                    position: fixed;
                    width: 150px;
                    top:50px;
                    right: 0;
                    bottom: 50px;
                    padding: 5px;
                    overflow-y: scroll;
                }
            `}</style>
            {renderOnlineUsers}
        </div>
    );
};
export default ChatRoomOnlineUsersList;
