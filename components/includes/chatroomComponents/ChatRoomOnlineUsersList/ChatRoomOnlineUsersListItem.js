import React, {useState} from 'react';

import {faEye} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ChatRoomOnlineUsersListItemMoreInfo from "./ChatRoomOnlineUsersListItemMoreInfo";

const ChatRoomOnlineUsersListItem = ({onlineUser,onUserInfoShowHandler}) => {
    const [state, setState] = useState({
        moreInfo:false
    });

    const onMoreInfoHandler = ()=>{
        state.moreInfo ? setState({...state,moreInfo: false}) :setState({...state,moreInfo: true})
    }

    return (
        <div className='chatroom-online-users-list-item' >
            <style jsx>{`
                .chatroom-online-users-list-item{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    background-color: ${state.moreInfo ?  'var(--navigation-text-color)' : 'transparent' } ;
                    border-radius: 10px;
                    padding: 2px 5px ;
                }
                .chatroom-online-users-list-item-image{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                .chatroom-online-users-list-item-username{
                    color:${state.moreInfo ?  'var(--navigation-background-color)' : 'var(--navigation-text-color)' } ;;
                    margin-left: 5px;
                }
                .chatroom-online-users-list-item-more-info-button{
                    background-color: transparent;
                    color:  ${ state.moreInfo ?  'var(--navigation-background-color)' : 'var(--navigation-text-color)' } ;
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
                    <img className='chatroom-online-users-list-item-image' src={onlineUser.profileImage} alt=""/>
                    <p className='chatroom-online-users-list-item-username'>{onlineUser.username}</p>
                </div>
                {/*<button className='chatroom-online-users-list-item-more-info-button' onClick={onMoreInfoHandler} onTouchMoveCapture={onMoreInfoHandler}>*/}
                {/*    <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faEye} />*/}
                {/*</button>*/}
            </div>

            <ChatRoomOnlineUsersListItemMoreInfo moreInfo={state.moreInfo} username={onlineUser.username} />
        </div>
    );
};
export default ChatRoomOnlineUsersListItem;
