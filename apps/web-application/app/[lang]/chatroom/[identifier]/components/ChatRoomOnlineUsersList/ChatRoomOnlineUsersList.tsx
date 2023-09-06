import ChatRoomOnlineUsersListItem from "./ChatRoomOnlineUsersListItem";
import './ChatRoomOnlineUsersList.styles.scss'
import {TChatroomUser} from "../interfaces";
import {FC} from "react";

interface IProps{
    chatroomUsers:TChatroomUser[]
}

const ChatRoomOnlineUsersList:FC<IProps> = ({chatroomUsers}) => {
    return (
        <div className={'chatroomOnlineUsersList custom-scroll'}>
            <div className={'user-list custom-scroll'}>
                {
                    chatroomUsers?.length>0 &&   chatroomUsers.map((chatroomUser: TChatroomUser) => {

                        return (
                            <ChatRoomOnlineUsersListItem key={`${chatroomUser.username}`}
                                                         username={chatroomUser?.username}
                                                         profileImage={chatroomUser?.profileImage}/>
                        )
                    })
                }
            </div>
        </div>
    );

};

export default ChatRoomOnlineUsersList;
