import React, {FC, useEffect} from "react";
import styled from "styled-components";
import Link from "next/link";
import {capitalizeFirstLetters} from "custom-util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import {faMaximize} from "@fortawesome/free-solid-svg-icons/faMaximize";
import {useAppDispatch} from "@store_toolkit/hooks";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {faMinimize} from "@fortawesome/free-solid-svg-icons/faMinimize";
import {setMaximize} from "@store_toolkit/clientReducers/chatroomReducer";
import {useRouter} from "next/router";

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
  
  .chatroom-selector{
    width: auto;
    outline: none;
    border: none;
  }
  .chatroom-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;

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
  }

`;

interface PropTypes {
    chatrooms: { name: string, _id: string }[],
    chatroomId: string,
    onOnlineUserListVisibilityChangeHandler: any,
    onlineUserListVisibility: boolean
}

const ChatroomTopbar: FC<PropTypes> = (
    {
        chatrooms,
        chatroomId,
        onlineUserListVisibility,
        onOnlineUserListVisibilityChangeHandler
    }) => {
    const {push,asPath} = useRouter()
    const isMaximized = useSelector(({chatroom}: Store) => chatroom.isMaximized)
    const dispatch = useAppDispatch();

    useEffect(() => {
         setTimeout(()=>{
             if (localStorage.isMaximized === 'true'){
                 dispatch(setMaximize(null))
             }
         },100)
    }, [asPath]);

    const onSetMaximizedHandler = ()=>{
        dispatch(setMaximize(null))
        localStorage.setItem('isMaximized',(!isMaximized).toString())
    }

    const onChatroomChangeHandler = (e)=>{
        push(`/chatroom/${e.target.value}`)
    }

    return (
        <Style>
            <select className={'custom-select chatroom-selector'}  onChange={e=>onChatroomChangeHandler(e)} value={chatroomId}>
                {(chatrooms || []).map(chatroom => {
                    return (
                        <option value={chatroom._id}
                                key={chatroom._id}

                            // className={`chatrooms-link${chatroomId === chatroom._id ? ' active' : ''}`}
                        >
                            {capitalizeFirstLetters(chatroom.name)}
                        </option>
                    )
                })}
            </select>
            <div className="chatroom-actions">
                <button className='open-online-user-list' onClick={onSetMaximizedHandler}>
                    <FontAwesomeIcon icon={isMaximized ? faMinimize : faMaximize} style={{width: 20, height: 20}}/>
                </button>
                <button className='open-online-user-list' onClick={onOnlineUserListVisibilityChangeHandler}>
                    <FontAwesomeIcon icon={faUsers} style={{width: 25, height: 25}}/>
                </button>
            </div>

        </Style>
    )
};
export default ChatroomTopbar;