import React, {useEffect, useState, useContext, useRef} from 'react';
import ChatRoomMessage from "./ChatRoomMessage";
import _ from "lodash";
import {AppContext} from "../../../../context/AppContext";
const ChatRoomMessageArea = ({messages,messageAreaRef}) => {
    const contextData = useContext(AppContext);
    return (
        <main ref={messageAreaRef} className='chatroom-message-area'>
            <style jsx>{`
                .chatroom-message-area{
                    position: fixed;
                    margin: 70px 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top:0;
                    overflow-y: scroll;
                    display: flex;
                    flex-direction: column;
                    //justify-content: flex-end;
                }
            `}</style>
            {messages.map(message=>{
                return(
                    <ChatRoomMessage message={message} key={_.uniqueId('message_')} userId={contextData.userData._id}/>
                )
            })}
        </main>
    );
};
export default ChatRoomMessageArea;
