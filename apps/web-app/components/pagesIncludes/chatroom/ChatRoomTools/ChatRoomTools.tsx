import React, {FC, useEffect, useRef, useState} from 'react';
import {socket} from 'custom-util/src/socket-utils/socketIoClient';
import {useRouter} from "next/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";

const ChatRoomToolsStyledFrom = styled.form`
  height: 45px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: transparent;
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


    .paperclip-button, .submit-button {
      background-color: var(--secondary-background-color, #181818);
      color: var(--secondary-text-color, #181818);
      border: none;
      width: 34px;
      height: 34px;
      margin: 0 10px;
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
    const inputRef = useRef<HTMLInputElement>(null);
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


    const onSelectImageHandler = async (event) => {
        const file = event.target.files[0];

        // Create a new Promise that resolves to the resized image
        const readerPromise = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 400;
                    const MAX_HEIGHT = 400;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    //@ts-ignore
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                };
                //@ts-ignore
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        try {
            const messageData = await readerPromise;
            const messageBody = {
                chatroom: chatroomId,
                author: _id,
                type: 'image',
                messageData: messageData,
            };
            socket.emit('messageToChatroom', messageBody);
            setMessageText('');
            event.target.value = null;
        } catch (error) {
            console.error(error);
        }
    };

    const onClickPaperclipHandler = (event) => {
        event.preventDefault()
        if (inputRef?.current){
            inputRef.current.click()
        }
    }


    return (
        <ChatRoomToolsStyledFrom className={'chatroom-tools'} onSubmit={e => onSubmitHandler(e)}>
            {someoneTypes.active &&
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
            <i className="fa-solid fa-paperclip"></i>
            <div className={'chatroom-tools-Send'}>
                <input ref={inputRef}
                       type="file"
                       accept="image/*"
                       style={{display: 'none'}}
                       onChange={onSelectImageHandler}/>
                <button type={'button'} className={'paperclip-button'} onClick={onClickPaperclipHandler}>
                    <FontAwesomeIcon icon={faPaperclip} style={{width: 25, height: 25}}/>
                </button>
                <button className={'submit-button'} type={'submit'}>
                    <FontAwesomeIcon icon={faPaperPlane} style={{width: 25, height: 25}}/>
                </button>
            </div>

        </ChatRoomToolsStyledFrom>

    );
};
export default ChatRoomTools;

