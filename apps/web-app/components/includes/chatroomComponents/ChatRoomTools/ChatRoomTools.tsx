import React, {useEffect, useState} from 'react';
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
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: transparent;

  .chatroom-someone-typing {
    position: absolute;
    top: -14px;
    left: 10px;
    background-color: var(--secondary-background-color, #181818);
    color: var(--main-text-color, #fff);
  }

  .chatroom-tools-text {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--secondary-background-color, #181818);
    padding: 8px;
    box-sizing: border-box;

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

const ChatRoomTools = () => {
    const dispatch = useAppDispatch()
    const userData = useSelector(({user}: Store) => user?.userData)
    const router = useRouter()

    const [messageText, setMessageText] = useState('')

    const [someoneTypes, setSomeoneTypes] = useState({
        username: '',
        active: false
    });

    const onSubmitHandler = e => {

        e.preventDefault()

        if (userData._id && messageText) {
            const newMessageData = {
                messageData: messageText,
                roomName: router.query.chatRoomName,
                username: userData.username,
                id: userData._id,
                profileImage: userData.profileImage,
                createdAt: Date.now(),
                type: 'message',
            }
            socket.emit('messageToChatroom', newMessageData)

            setMessageText('')
        } else {
            dispatch(loginRegisterForm('register'))
        }

    }

    const onStartTypingHandler = () => {
        if (userData?.username) {
            socket.emit('startTyping', router.query.chatRoomName, userData.username)
        }

    }


    useEffect(() => {
        setTimeout(() => {
            socket.on('startTyping', username => {
                setSomeoneTypes({
                    ...someoneTypes,
                    username,
                    active: true
                })
            });
        }, 500)
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