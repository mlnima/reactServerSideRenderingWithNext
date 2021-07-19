import React, {useEffect, useState, useContext, useRef} from 'react';
import moment from "moment";


const MessengerConversationMessage = ({message,connectedUserData,currentUserId}) => {



    return (
        <div className='messenger-conversation-message'>
            <style jsx>{`
            .messenger-conversation-message{
            display: flex;
            justify-content: ${message.author === currentUserId ? 'flex-end': 'flex-start'} ;
            margin: 0 10px;
            max-width: 100%;
            padding: 2px;
            }
            .messenger-conversation-message-data{
             display: flex;
             flex-direction: column;
             align-items: flex-start;
             justify-content: ${message.author === currentUserId ? 'flex-end' :'flex-start'} ;
             background-color:  ${message.author === currentUserId ? '#1877F2' : '#444950'};
             border-radius: 5px;
             margin: 5px ;
             padding: 5px;
             max-width: 90%;
            }
            .messenger-conversation-message-text{
                color: var(--navigation-text-color) ;
                padding: 4px 8px;
                width: calc(90% );
                word-break: break-word;
                margin: 0;
            }
            .messenger-conversation-message-date{
             display: flex;
             justify-content: flex-end;
             color: var(--navigation-text-color) ;
             font-size: x-small;
             //padding: 4px;
             width: 100%;
            }
            `}</style>
            <div className='messenger-conversation-message-data'>
                <p className='messenger-conversation-message-text'>
                    {message.messageBody}
                </p>
                <span className='messenger-conversation-message-date'>
                    <p>
                             {moment(new Date(message.createdAt), "YYYYMMDD").fromNow(false) }
                    </p>
                </span>
            </div>
        </div>
    );
};
export default MessengerConversationMessage;

