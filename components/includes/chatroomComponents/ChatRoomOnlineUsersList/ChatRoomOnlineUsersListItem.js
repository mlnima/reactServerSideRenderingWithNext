import React, {useState} from 'react';;
import ChatRoomOnlineUsersListItemMoreInfo from "./ChatRoomOnlineUsersListItemMoreInfo";

const ChatRoomOnlineUsersListItem = ({onlineUser,onUserInfoShowHandler}) => {
    const [state, setState] = useState({
        moreInfo:false
    });

    return (
        <div className='chatroom-online-users-list-item' >
            <style jsx>{`
                .chatroom-online-users-list-item{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    background-color: ${state.moreInfo ?  'var(--navigation-text-color, #ccc)' : 'transparent' } ;
                    border-radius: 10px;
                    padding: 2px 5px ;
                }
                .chatroom-online-users-list-item-image{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                .chatroom-online-users-list-item-username{
                    color:${state.moreInfo ?  'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color, #ccc)' } ;;
                    margin-left: 5px;
                }
                .chatroom-online-users-list-item-more-info-button{
                    background-color: transparent;
                    color:  ${ state.moreInfo ?  'var(--navigation-background-color,#18181b)' : 'var(--navigation-text-color, #ccc)' } ;
                    border:none;
                
                }
                .chatroom-online-users-list-item-user-data{
                    display: flex;
                    align-items: center;
                }
                .chatroom-online-users-list-item-user-section{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
            `}</style>
            <div className='chatroom-online-users-list-item-user-section' onClick={()=>onUserInfoShowHandler(onlineUser.username,onlineUser.userId,onlineUser.profileImage)}>
                <div className='chatroom-online-users-list-item-user-data'>
                    <img className='chatroom-online-users-list-item-image' src={ onlineUser.profileImage ? onlineUser.profileImage : '/public/asset/images/user/noGenderAvatar150.jpg'} alt=""/>
                    <p className='chatroom-online-users-list-item-username'>{onlineUser.username}</p>
                </div>

            </div>

            <ChatRoomOnlineUsersListItemMoreInfo moreInfo={state.moreInfo} username={onlineUser.username} />
        </div>
    );
};
export default ChatRoomOnlineUsersListItem;
