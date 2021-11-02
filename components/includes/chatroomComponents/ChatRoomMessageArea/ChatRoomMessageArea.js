import React, {useEffect, useRef} from 'react';
import ChatRoomMessage from "./ChatRoomMessage";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {setActiveVisibleProfile} from "../../../../store/actions/chatroomActions";

const ChatRoomMessageAreaStyledMain = styled.main`
  position: fixed;
  margin: 0 0 55px 0;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`

const ChatRoomMessageArea = () => {
    const dispatch = useDispatch()
    const messageAreaRef = useRef(null)
    const chatroomMessages = useSelector(store => store?.chatroom?.messages)

    useEffect(() => {
        messageAreaRef.current.scroll({
            top: messageAreaRef.current.scrollHeight,
            behavior: "smooth"
        })
    }, [chatroomMessages]);


    const onShowProfileHandler = (username, _id, profileImage) => {
        dispatch(setActiveVisibleProfile({
            username,
            _id,
            profileImage,
        }))
    }

    return (
        <ChatRoomMessageAreaStyledMain
            ref={messageAreaRef}
            className='chatroom-message-area'
            id='chatroom-message-area'
        >
            {
                chatroomMessages.map((message, index) => {
                    return (
                        <ChatRoomMessage
                            message={message}
                            key={index}
                            onShowProfileHandler={onShowProfileHandler}
                        />
                    )
                })
            }

        </ChatRoomMessageAreaStyledMain>
    );
};
export default ChatRoomMessageArea;
