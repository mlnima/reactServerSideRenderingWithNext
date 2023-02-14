import React, {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import {capitalizeFirstLetters} from "custom-util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";

const Style = styled.div`
  height: 45px;
  padding: 8px 8px;
  box-sizing: border-box;
  background-color: var(--secondary-background-color, #181818);
  color: var(--secondary-text-color, #ccc);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: var(--default-border);
  border-bottom: var(--default-border);
  grid-area: chatroomTopbar;
  .chatrooms-links {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .chatrooms-link {
      padding: 6px 12px;
      color: var(--secondary-text-color, #ccc);
    }
    .active{
      font-weight: bold;
      background-color: var(--secondary-text-color, #ccc);
      color: var(--secondary-background-color, #181818) ;
      border-radius: 5px;
    }
  }

  .open-online-user-list {
    border: none;
    outline: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--secondary-text-color, #ccc);
    width: 45px;
    height: 45px;
  }
`;

interface PropTypes {
    chatrooms: { name: string, _id: string }[],
    chatroomId: string,
    onOnlineUserListVisibilityChangeHandler: any,
    onlineUserListVisibility: boolean
}

const ChatroomTopbar: FC<PropTypes> = ({
                                           chatrooms,
                                           chatroomId,
                                           onlineUserListVisibility,
                                           onOnlineUserListVisibilityChangeHandler
                                       }) => {
//onlineUserListVisibility={onlineUserListVisibility}
    return (
        <Style>
            <div className={'chatrooms-links'}>
                {(chatrooms || []).map(chatroom => {
                    return(
                        <Link href={`/chatroom/${chatroom._id}`}
                              key={chatroom._id}
                              className={`chatrooms-link${ chatroomId === chatroom._id ? ' active' : ''}`}>
                            {capitalizeFirstLetters(chatroom.name)}
                        </Link>
                    )
                })}
            </div>
            <button className='open-online-user-list' onClick={onOnlineUserListVisibilityChangeHandler}>
                <FontAwesomeIcon icon={faUsers} style={{width: 25, height: 25}}/>
            </button>
        </Style>
    )
};
export default ChatroomTopbar;