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
  bottom: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 38px;
  .form-control-input{
    height: 28px;
  }
  .btn-primary{
    right: 8px;
    height: 42px;
    display: flex;
    svg{
      width: 24px;
      height: 24px;
      
    }
  }
`

const MessengerConversationMessageTools = props => {
    const userData = useSelector((store) => store?.user.userData);
    const messageInput = useRef(null)

    const onSendMessageHandler = e => {
        e.preventDefault()
        const messageInputData = messageInput ? messageInput.current.value : ''
        if (messageInputData.length && messageInputData.length < 500) {
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
            <MessengerConversationMessageToolsStyledForm onSubmit={onSendMessageHandler} className='messenger-conversation-message-tools'>
                <input maxLength='300' ref={messageInput} className='form-control-input' type="text" name='message'/>
                <button onClick={e => onSendMessageHandler(e)} className='btn btn-primary'>
                    <FontAwesomeIcon  icon={faArrowRight}/>
                </button>
            </MessengerConversationMessageToolsStyledForm>
    );
};
export default MessengerConversationMessageTools;
