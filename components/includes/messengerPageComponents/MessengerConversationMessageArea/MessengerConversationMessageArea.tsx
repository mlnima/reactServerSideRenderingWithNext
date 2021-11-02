import React, {useEffect, useRef} from 'react';
import _ from "lodash";
import MessengerConversationMessage from "./MessengerConversationMessage";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";

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

    const messages = useSelector((store: StoreTypes) => store.user.activeConversation?.messages);
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
            {messages?
                _.uniqBy((messages || []),(message: any)=> {
                    return message.createdAt
                }).map((message: any) => {
                    return (
                        <MessengerConversationMessage
                            key={_.uniqueId('message_')}
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