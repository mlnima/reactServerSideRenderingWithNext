import {useRef, useEffect} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {messageToConversation} from "../../../../_variables/_userSocialAjaxVariables";
import socket from "../../../../_variables/socket";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";

const MessengerConversationMessageToolsStyledForm = styled.form`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  

  
  .messenger-conversation-message-tools-text {
    
    display: flex;
    justify-content: center;
    width:100%;
    
    height: 48px;

    .messenger-conversation-message-tools-text-input {
      border-radius: 25px;
      border: 0;
      height: 38px;
      width: 100%;
      padding: 4px 10px;
      outline: none;
      background-color: var(--navigation-background-color, #18181b);
      color: var(--navigation-text-color, #18181b);
    }
  }

  .messenger-conversation-message-tools-Send {
   // background-color: var(--navigation-text-color, #18181b);
    border-radius: 50px;
    z-index: 10;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 8px;

    .messenger-conversation-message-tools-btn {
      color: var(--navigation-background-color, #18181b);
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      svg{
        color: var(--navigation-text-color, #18181b);
      }

    }
  }

`

const MessengerConversationMessageTools = props => {
    const userData = useSelector((state) => state.user.userData);
    const messageInput = useRef(null)

    const onSendMessageHandler = e => {
        e.preventDefault()
        const messageInputData = messageInput ? messageInput.current.value : ''
        if (messageInputData.length > 0 && messageInputData.length < 500) {
            const messageData = {
                messageBody: messageInputData,
                createdAt: Date.now(),
                author: userData._id,
                conversationId: props.conversationId
            }
            socket.emit('sendMessageToConversation', messageData, props.conversationId)
            messageToConversation(props.conversationId, messageInputData).then(() => {
                messageInput.current.value = '';
                // props.getAndSetConversationData();
            }).catch(err => {
                console.log(err)
            })
        }
    }


    return (
        <div>
            <MessengerConversationMessageToolsStyledForm onSubmit={onSendMessageHandler} className='messenger-conversation-message-tools'>
                <div className='messenger-conversation-message-tools-text'>
                    <input maxLength='300' ref={messageInput} className='messenger-conversation-message-tools-text-input' type="text" name='message'/>
                </div>
                <div className='messenger-conversation-message-tools-Send'>
                    <button onClick={e => onSendMessageHandler(e)} className='messenger-conversation-message-tools-btn'>
                        <FontAwesomeIcon style={{width: '24px', height: '24px'}} icon={faArrowRight}/>
                    </button>
                </div>
            </MessengerConversationMessageToolsStyledForm>
        </div>

    );
};
export default MessengerConversationMessageTools;
