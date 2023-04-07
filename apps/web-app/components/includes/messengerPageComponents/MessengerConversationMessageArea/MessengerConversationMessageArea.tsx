import React, {FC, useEffect, useRef} from 'react';
import MessengerConversationMessage from "./MessengerConversationMessage";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Store} from "typescript-types";
import {uniqArrayBy} from 'custom-util'

interface IProps {
    connectedUserData: object,
    userData: object,
    headerSize:number
}

interface IStyles {
    headerSize:number
}

const MessengerConversationMessageAreaStyledDiv = styled.div<IStyles>`
  grid-area: conversationMessageArea;
  height: ${({headerSize})=> `calc(100vh - ${headerSize}px )` } ;
  //height: calc(100% - 100px);
  margin: 0;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  box-sizing: border-box;
  background-color: var(--main-background-color,#000);
`

const MessengerConversationMessageArea:FC<IProps> = ({connectedUserData, userData,headerSize}) => {

    const messages = useSelector(({user}: Store) => user.activeConversation?.messages);
    const messageArea = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        scrollToBottomOfConversationBox()
    }, [messages]);

    const scrollToBottomOfConversationBox = () => {
        if (messageArea.current) {
            messageArea.current.scroll({
                top: messageArea.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }



    return (
        <MessengerConversationMessageAreaStyledDiv className='messenger-conversation-message-area custom-scroll' ref={messageArea} headerSize={headerSize}>

            {messages?
                uniqArrayBy((messages || []),'createdAt').map((message: any) => {
                    return (
                        <MessengerConversationMessage
                            key={message.createdAt}
                            message={message}
                            connectedUserData={connectedUserData}
                            // @ts-ignore
                            currentUserId={userData._id}
                        />
                    )
                })
                :null
            }
        </MessengerConversationMessageAreaStyledDiv>
    );
};
export default MessengerConversationMessageArea;


