import React, {useEffect, useState, useContext, useRef} from 'react';
//import ConversationBoxMessage from "../../ConversationBox/ConversationBoxBody/ConversationBoxMessage";
import _ from "lodash";
import MessengerConversationMessage from "./MessengerConversationMessage";
import {AppContext} from "../../../../context/AppContext";
import socket from '../../../../_variables/socket';
import {useRouter} from "next/router";
import {getConversation} from "../../../../_variables/_userSocialAjaxVariables";

const MessengerConversationMessageArea = ({connectedUserData,setConnectedUserData}) => {
    const contextData = useContext(AppContext);
    const router = useRouter();
    const messageArea = useRef(null)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        scrollToBottomOfConversationBox()
    }, [messages]);

    useEffect(() => {
        if (router.query.conversation && contextData.userData._id) {
            getAndSetConversationData()
        }
    }, [contextData.userData]);

    useEffect(() => {
        socket.on('receiveMessageFromConversation', messageData => {
            if (messageData.conversationId === router.query.conversation){
                setMessages(messages=>[...messages, messageData])
            }
        })
    }, []);

    const getAndSetConversationData = () => {
        getConversation(router.query.conversation, -20).then(res => {
            const connectedUser = res.data.conversation.users.find(u => u._id !== contextData.userData._id)
            setMessages([...messages, ...res.data.conversation.messages])
            setConnectedUserData({...connectedUserData, ...connectedUser})
        }).catch(err => {
            console.log(err)
        })
    }


    const scrollToBottomOfConversationBox = () => {
        if (messageArea.current) {
            messageArea.current.scroll({
                top: messageArea.current.scrollHeight
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
                margin: 70px 0;
                overflow-y: scroll;
              }
            `}</style>
            {(messages || []).map(message => {
                return (
                    <MessengerConversationMessage key={_.uniqueId('message_')} message={message} connectedUserData={connectedUserData} currentUserId={contextData.userData._id}/>
                )
            })}
        </div>
    );
};
export default MessengerConversationMessageArea;
