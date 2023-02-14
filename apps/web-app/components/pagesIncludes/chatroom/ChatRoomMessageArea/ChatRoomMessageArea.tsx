import React, {useEffect, useRef, memo, FC} from 'react';
import ChatRoomMessage from "./ChatRoomMessage";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {useRouter} from "next/router";
import {Store,ChatroomMessage} from "typescript-types";

const ChatRoomMessageAreaStyledMain = styled.main`
  height: ${({headerSize}:StylePropTypes)=> `calc(100vh - ${headerSize}px )` } ;
  margin: 0;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  grid-area: chatroomMessagingArea;
  padding-bottom: 50px;
  box-sizing: border-box;
  //margin-bottom: 50px;
`

interface StylePropTypes{
    headerSize:number,
}

interface PropTypes{
    chatroomId:string,
    headerSize:number
}
const ChatRoomMessageArea:FC<PropTypes> = ({chatroomId,headerSize}) => {

    const {locale} = useRouter()
    const messageAreaRef = useRef(null)

    const {chatroomMessages} = useSelector(({chatroom}: Store) => {

        const currentMessages = chatroom?.messages || [];

        return {
            chatroomMessages: [...currentMessages].sort(
                (message, nextMessage) =>
                    //@ts-ignore
                    message.createdAt > nextMessage.createdAt ? 1 : -1
            )
        }
    })

    useEffect(() => {
        messageAreaRef.current.scroll({
            top: messageAreaRef.current.scrollHeight + 45,
            behavior: "smooth"
        })
    }, [chatroomMessages]);

    return (
        <ChatRoomMessageAreaStyledMain
            ref={messageAreaRef}
            className='chatroom-message-area custom-scroll'
            id='chatroom-message-area'
            headerSize={headerSize}
        >
            {chatroomMessages?.length ?
                //@ts-ignore
                chatroomMessages.filter((message)=>message.chatroom === chatroomId).map((message: ChatroomMessage, index: number) => {
                    return (
                        <ChatRoomMessage
                            message={message}
                            key={index}
                            locale={locale}
                        />
                    )
                })
                : null
            }

        </ChatRoomMessageAreaStyledMain>
    );
};
export default memo(ChatRoomMessageArea);
