import styled from "styled-components";
import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";

const Style = styled.button`
  position: absolute;
  //position: fixed;
  border:none;
  outline: none;
  right: ${({onlineUserListVisibility}:{onlineUserListVisibility:boolean})=> onlineUserListVisibility ? 156 : 16 }px;
  top: 16px;
  background-color: var(--secondary-background-color, #181818);
  color: var(--secondary-text-color, #ccc) ;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 45px;
  height: 45px;
  
`

interface ChatRoomHeaderPropTypes{
    onOnlineUserListVisibilityChangeHandler:any
    onlineUserListVisibility:boolean
}

const ChatRoomUserListButton:FC<ChatRoomHeaderPropTypes> = ({onOnlineUserListVisibilityChangeHandler,onlineUserListVisibility}) => {
    return (
        <Style className='chatroom-header' onClick={onOnlineUserListVisibilityChangeHandler}
               onlineUserListVisibility={onlineUserListVisibility}>
            <FontAwesomeIcon icon={faUsers} style={{width:35,height:35}}/>
        </Style>
    );
};
export default ChatRoomUserListButton;
