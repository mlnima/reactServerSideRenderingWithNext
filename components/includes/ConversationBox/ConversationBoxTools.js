import React, {useEffect, useState, useContext, useRef} from 'react';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {messageToConversation} from "../../../_variables/_userSocialAjaxVariables";
import {AppContext} from "../../../context/AppContext";

const ConversationBoxTools = props => {
    const contextData = useContext(AppContext);

    const onChangeHandler = e =>{
        props.setMessageState({
            ...props.messageState,
            messageBody : e.target.value
        })
    }

    const onSendMessageHandler = ()=>{
        if (props?.messageState?.messageBody.length > 0 && props?.messageState?.messageBody.length < 100 ){
            messageToConversation(props.conversationData._id,props.messageState.messageBody).then(res=>{
                const newDataToSet = [...contextData.conversations.filter(c=>c._id !== res.data.updatedConversation._id),res.data.updatedConversation]
                contextData.dispatchConversations(newDataToSet)
                props.setMessageState({
                    ...props.messageState,
                    messageBody:''
                })

            }).catch(err=>{
                console.log(err)
            })
        }

    }

    return (
        <div className='conversation-box-tools'>
            <style jsx>{`
            .conversation-box-tools{
            position: absolute;
            bottom: 0;
            height: 50px;
            padding: 2px;
            background-color: var(--navigation-background-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            }
            .conversation-box-tools-text{
            width: 85%;
            }
            .conversation-box-tools-text-input{
            border-radius: 50px;
            height: 27px;
            width: 95%;
            padding: 5px 10px;
            }
            .conversation-box-tools-send-btn{
            background-color: transparent;
            border: none;
            }
          `}</style>
              <div className='conversation-box-tools-text'>
                  <input onChange={e=>onChangeHandler(e)} className='conversation-box-tools-text-input' type="text" name='message'/>
              </div>
              <div className='conversation-box-tools-Send'>
                  <button onClick={onSendMessageHandler} className='conversation-box-tools-send-btn'><FontAwesomeIcon style={{width: '20px',height: '20px',color:'var(--navigation-text-color)'}} icon={faArrowRight}  /></button>
              </div>
        </div>
    );
};
export default ConversationBoxTools;
