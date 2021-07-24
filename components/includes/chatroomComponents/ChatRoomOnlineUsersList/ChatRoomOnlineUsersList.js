import _ from "lodash";


const ChatRoomOnlineUsersList = ({onlineUsers}) => {



   const renderOnlineUsers = onlineUsers.map(onlineUser=>{
       return(
           <div className='chatroom-online-users-list-item' key={_.uniqueId('message_')}>
               <style jsx>{`
.chatroom-online-users-list-item{
display: flex;
align-items: center;
}
.chatroom-online-users-list-item-image{
width: 30px;
height: 30px;
border-radius: 50%;
}
.chatroom-online-users-list-item-username{
color:var(--navigation-text-color);
margin-left: 5px;
}
`}</style>
               <img className='chatroom-online-users-list-item-image' src={onlineUser.profileImage} alt=""/>
               <p className='chatroom-online-users-list-item-username'>{onlineUser.username}</p>
           </div>
       )
   })



    return (
        <div className='chatroom-online-users-list'>
            <style jsx>{`
                .chatroom-online-users-list{
                    background-color: var(--navigation-background-color);
                    position: fixed;
                    width: 150px;
                    top:33px;
                    right: 0;
                    bottom: 0;
                    padding: 5px;
                }
            `}</style>
            {renderOnlineUsers}
        </div>
    );
};
export default ChatRoomOnlineUsersList;
