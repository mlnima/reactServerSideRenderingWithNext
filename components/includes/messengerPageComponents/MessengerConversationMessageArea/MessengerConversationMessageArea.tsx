import React, {useEffect, useRef} from 'react';
import _ from "lodash";
import MessengerConversationMessage from "./MessengerConversationMessage";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

interface MessengerConversationMessageAreaTypes {
    connectedUserData: object,
    userData: object
}

const MessengerConversationMessageArea = ({connectedUserData, userData}: MessengerConversationMessageAreaTypes) => {

    const messages = useSelector((state: StoreTypes) => state.user.activeConversation?.messages);
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
        <div className='messenger-conversation-message-area' ref={messageArea}>
            <style jsx>{`
              .messenger-conversation-message-area {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                margin: 48px 0;
                overflow-y: scroll;
              }
            `}</style>

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
        </div>
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