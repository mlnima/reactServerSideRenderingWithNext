import React, {useEffect, useState, useRef} from 'react';
import {socket} from '@_variables/socket';
import {useRouter} from "next/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {loginRegisterForm} from "../../../../store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";

const ChatRoomToolsStyledFrom = styled.form`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  padding: 2px;
  background-color: var(--navigation-background-color, #18181b);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .chatroom-someone-typing {
    position: absolute;
    top: -14px;
    left: 10px;
    background-color: var(--navigation-background-color, #18181b);
    color: var(--navigation-text-color, #ccc);
  }

  .chatroom-tools-text {
    display: flex;
    justify-content: center;
    width: 100%;

    .chatroom-tools-content-input {
      border-radius: 50px;
      height: 27px;
      width: 100%;
      padding: 5px 5px;
    }
  }

  .chatroom-tools-Send {
    z-index: 10;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 8px;

    .chatroom-tools-content-submit-button {
      background-color: var(--navigation-background-color, #18181b);
      border: none;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .chatroom-tools-Send-color-picker-input {
    position: absolute;
    width: 34px;
    height: 34px;
    right: 48px;
    background-color: ${props => props.color};
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }
`

const ChatRoomTools = () => {
    const dispatch = useAppDispatch()
    const userData = useSelector(({user}:Store) => user?.userData)
    const router = useRouter()

    const [state, setState] = useState({
        messageData: '',
        color: '#ccc'
    });

    const [someoneTypes, setSomeoneTypes] = useState({
        username: '',
        active: false
    });

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {

        e.preventDefault()

        if (userData._id && state.messageData?.length) {
            const newMessageData = {
                messageData: state.messageData,
                roomName: router.query.chatRoomName,
                username: userData.username,
                id: userData._id,
                profileImage: userData.profileImage,
                color: state.color,
                createdAt: Date.now(),
                type: 'message',
            }
            socket.emit('messageToChatroom', newMessageData)

            setState({
                ...state,
                messageData: ''
            })
        } else {
            dispatch(loginRegisterForm('register'))
        }

    }

    const onStartTypingHandler = () => {
        if (userData?.username){
            socket.emit('startTyping', router.query.chatRoomName, userData.username)
        }

    }


    useEffect(() => {
        socket.on('startTyping', username => {
            setSomeoneTypes({
                ...someoneTypes,
                username,
                active: true
            })
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
        <ChatRoomToolsStyledFrom className={'chatroom-tools'} onSubmit={e => onSubmitHandler(e)} color={state.color}>
            {someoneTypes.active ?
                <span className={'chatroom-someone-typing'}> {someoneTypes.username} is typing </span>
                : null
            }
            <div className={'chatroom-tools-text'}>
                <input className={'chatroom-tools-content-input'}
                       maxLength={300}
                       type={'text'}
                       name={'messageData'}
                       onChange={e => onChangeHandler(e)}
                       onKeyDown={onStartTypingHandler}
                       value={state.messageData}
                />
            </div>

            {/*<input className={'chatroom-tools-Send-color-picker-input'}*/}
            {/*       name={'color'}*/}
            {/*       type={'color'}*/}
            {/*       value={ state?.color || '#ccc'}*/}
            {/*       onChange={e => onChangeHandler(e)}*/}
            {/*/>*/}
            <div className={'chatroom-tools-Send'}>
                <button className={'chatroom-tools-content-submit-button'} type={'submit'}>
                    <SvgRenderer svgUrl={'/public/asset/images/icons/share-solid.svg'}
                                 size={25}
                                 color={'var(--navigation-text-color, #ccc)'}/>
                </button>
            </div>
        </ChatRoomToolsStyledFrom>

    );
};
export default ChatRoomTools;

// style={{visibility:'hidden'}}