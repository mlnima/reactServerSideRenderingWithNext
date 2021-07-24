import React, {useEffect, useState, useContext, useRef} from 'react';
import ConversationBoxMessage from "../../ConversationBox/ConversationBoxBody/ConversationBoxMessage";
import _ from "lodash";
import MessengerConversationMessage from "./MessengerConversationMessage";
import {AppContext} from "../../../../context/AppContext";

const MessengerConversationMessageArea = ({messages,connectedUserData}) => {
    const contextData = useContext(AppContext);

    const messageArea = useRef(null)
    const [state, setState] = useState({});

    useEffect(() => {
        scrollToBottomOfConversationBox()
    }, [messages]);

    const scrollToBottomOfConversationBox = ()=>{
        if (messageArea.current){
            messageArea.current.scroll({
                top:messageArea.current.scrollHeight
            })
        }
    }
    const renderConversationData = (messages || []).map(message => {
        return (
            <MessengerConversationMessage  key={_.uniqueId('message_')} message={message} connectedUserData={connectedUserData} currentUserId={contextData.userData._id}/>
        )
    })
    return (
        <div className='messenger-conversation-message-area' ref={messageArea}>
            <style jsx>{`
                .messenger-conversation-message-area{
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top:0;
                    margin: 70px 0;
                    overflow-y: scroll;
                    //height: calc(100% - 100px);
                }
            `}</style>
            {renderConversationData}
        </div>
    );
};
export default MessengerConversationMessageArea;
