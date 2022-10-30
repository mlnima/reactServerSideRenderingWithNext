import React, {useEffect, useRef} from 'react';
import MessengerConversationMessage from "./MessengerConversationMessage";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import {_uniqBy} from "@_variables/util/arrayUtils/uniqArrayBy";

interface MessengerConversationMessageAreaTypes {
    connectedUserData: object,
    userData: object
}


const MessengerConversationMessageAreaStyledDiv = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 58px 0;
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
        <MessengerConversationMessageAreaStyledDiv className='messenger-conversation-message-area' ref={messageArea}>
            {/*{messages?*/}
            {/*    _.uniqBy((messages || []),(message: any)=> {*/}
            {/*        return message.createdAt*/}
            {/*    }).map((message: any) => {*/}
            {/*        return (*/}
            {/*            <MessengerConversationMessage*/}
            {/*                key={_.uniqueId('message_')}*/}
            {/*                message={message}*/}
            {/*                connectedUserData={connectedUserData}*/}
            {/*                // @ts-ignore*/}
            {/*                currentUserId={userData._id}*/}
            {/*            />*/}
            {/*        )*/}
            {/*    })*/}
            {/*    :null*/}
            {/*}*/}
            {messages?
                _uniqBy((messages || []),'createdAt').map((message: any) => {
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