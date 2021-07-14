import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";

const ConversationBoxMessage = props => {
    const contextData = useContext(AppContext);

    return (
        <div className='conversation-box-body-message'>
        <style jsx>{`
            .conversation-box-body-message{
                  display: flex;
                  justify-content: ${props.message.author === contextData.userData._id ? 'flex-end': 'flex-start'} ;
                  margin: 0 10px;
                    max-width: 100%;
            }
            .conversation-box-body-message-text{
                color: var(--navigation-text-color) ;
                padding:2px 5px;
                max-width: 90%;
                word-break: break-word;
              
            }
            .conversation-box-body-message-data{
             display: flex;
             align-items: center;
             justify-content: ${props.message.author === contextData.userData._id ? 'flex-end' :'flex-start'} ;
             background-color:  ${props.message.author === contextData.userData._id ? '#1877F2' : '#444950'};
             border-radius: 15px;
             margin: 10px 0;
             padding: 2px;
            }
            
            .conversation-box-body-message-image{
            width: 20px;
            border-radius: 50%;
            }
        `}</style>
            <div className='conversation-box-body-message-data' >
                {
                    props.message.author !== contextData.userData._id ?
                        <img src={props.userToConversationData.profileImage} alt="" className='conversation-box-body-message-image'/>:null
                }

                <p className='conversation-box-body-message-text'>
                    {props.message.messageBody}
                </p>
            </div>

        </div>
    );
};
export default ConversationBoxMessage;
