import React, {useEffect, useState, useContext, useRef} from 'react';
import ConversationBoxMessage from "./ConversationBoxMessage";
import _ from "lodash";

const ConversationBoxBody = props => {
    const messageArea = useRef(null)

    useEffect(() => {
        scrollToBottomOfConversationBox()
    }, [props]);

    const scrollToBottomOfConversationBox = ()=>{
        if (messageArea){
            messageArea.current.scroll({
                top:messageArea.current.scrollHeight
            })
        }
    }

    const renderConversationData = (props?.conversationData?.messages || []).map(message => {
        return (
            <ConversationBoxMessage  key={_.uniqueId('message_')} message={message} userToConversationData={props.userToConversationData}/>
        )
    })

    return (
        <div className='conversation-box-body' ref={messageArea}>
            <style jsx>{`
                .conversation-box-body{
                    overflow-y: scroll;
                    max-height:  300px;
                }
            `}</style>
            {renderConversationData}
        </div>
    );
};
export default ConversationBoxBody;
