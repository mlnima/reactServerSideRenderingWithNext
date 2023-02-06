import React, {useEffect, useRef} from 'react';
import MessengerConversationMessage from "./MessengerConversationMessage";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Store} from "typescript-types";
import {uniqArrayBy} from 'custom-util'

interface MessengerConversationMessageAreaTypes {
    connectedUserData: object,
    userData: object
}


const MessengerConversationMessageAreaStyledDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 0;
  height: 70vh;
  //margin:  0;
  //padding: 0 8px;
  //box-sizing: border-box;
  overflow-y: scroll;
`

const MessengerConversationMessageArea = ({connectedUserData, userData}: MessengerConversationMessageAreaTypes) => {

    const messages = useSelector((store: Store) => store.user.activeConversation?.messages);
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
        <MessengerConversationMessageAreaStyledDiv className='messenger-conversation-message-area custom-scroll' ref={messageArea}>

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


// {/*{messages?*/}
// {/*    messages.map((message: any) => {*/}
// {/*        return (*/}
// {/*            <MessengerConversationMessage*/}
// {/*                key={_.uniqueId('message_')}*/}
// {/*                message={message}*/}
// {/*                connectedUserData={connectedUserData}*/}
// {/*                // @ts-ignore*/}
// {/*                currentUserId={userData._id}*/}
// {/*            />*/}
// {/*        )*/}
// {/*    })*/}
// {/*    :null*/}
// {/*}*/}