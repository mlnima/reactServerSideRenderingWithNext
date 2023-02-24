import React, {FC, useEffect, useState} from 'react';
import {socket} from 'custom-util/src/socket-utils/socketIoClient';
import {useRouter} from "next/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";

const ChatRoomToolsStyledFrom = styled.form`
  height: 45px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: transparent;
  //grid-area: chatroomTools;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  .chatroom-someone-typing {
    position: absolute;
    top: -14px;
    left: 10px;
    background-color: var(--secondary-background-color, #181818);
    color: var(--main-text-color, #fff);
  }

  .chatroom-tools-text {
    border-top: var(--default-border);
    border-bottom: var(--default-border);
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--secondary-background-color, #181818);
    padding: 8px;
    box-sizing: border-box;
    height: 45px;
    .chatroom-tools-input {
      background-color: var(--secondary-background-color, #181818);
      color: var(--secondary-text-color, #181818);
      border: none;
      outline: none;
      height: 27px;
      width: 100%;
    }
  }

  .chatroom-tools-Send {
    z-index: 10;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 8px;

    .submit-button {
      background-color: var(--secondary-background-color, #181818);
      color: var(--secondary-text-color, #181818);
      border: none;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

`
interface PropTypes{
    chatroomId:string
}

const ChatRoomTools:FC<PropTypes> = ({chatroomId}) => {
    const dispatch = useAppDispatch()
    const {loggedIn,_id,username} = useSelector(({user}: Store) => {
        return {
            loggedIn: user?.loggedIn,
            _id:user.userData?._id,
            username:user.userData?.username,
        }
    })
    const router = useRouter()

    const [messageText, setMessageText] = useState('')

    const [someoneTypes, setSomeoneTypes] = useState({
        username: '',
        active: false
    });

    const onSubmitHandler = e => {
        e.preventDefault()
        if (loggedIn && messageText) {
            const messageBody = {
                chatroom:chatroomId,
                author: _id,
                type: 'message',
                messageData: messageText
            }
            socket.emit('messageToChatroom', messageBody)
            setMessageText('')
        } else {
            dispatch(loginRegisterForm('register'))
        }
    }

    const onStartTypingHandler = () => {
        if (username) {
            socket.emit('startTyping', chatroomId, username)
        }
    }


    useEffect(() => {

        socket.on('startTyping', ({username,activeChatroomId}) => {
            if (activeChatroomId === chatroomId && username ){
                setSomeoneTypes({
                    ...someoneTypes,
                    username,
                    active: true
                })
            }

        });
    }, []);


    useEffect(() => {
        if (someoneTypes.active) {
            setTimeout(() => {
                setSomeoneTypes({
                    ...someoneTypes,
                    username: '',
                    active: false
                })
            }, 3000)
        }
    }, [someoneTypes]);


    return (
        <ChatRoomToolsStyledFrom className={'chatroom-tools'} onSubmit={e => onSubmitHandler(e)}>
            {!!someoneTypes.active &&
                <span className={'chatroom-someone-typing'}>
                    {someoneTypes.username} is typing
                </span>
            }
            <div className={'chatroom-tools-text'}>
                <input className={'chatroom-tools-input'}
                       maxLength={300}
                       type={'text'}
                       name={'messageData'}
                       placeholder={'Type a message'}
                       onChange={e => setMessageText(e.target.value)}
                       onKeyDown={onStartTypingHandler}
                       value={messageText}
                />
            </div>

            <div className={'chatroom-tools-Send'}>
                <button className={'submit-button'} type={'submit'}>
                    <FontAwesomeIcon icon={faPaperPlane} style={{width: 25, height: 25}}/>
                </button>
            </div>

        </ChatRoomToolsStyledFrom>

    );
};
export default ChatRoomTools;

// style={{visibility:'hidden'}}