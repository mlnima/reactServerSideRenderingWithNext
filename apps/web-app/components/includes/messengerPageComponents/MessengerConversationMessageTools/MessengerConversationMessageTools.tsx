// @ts-nocheck
import React, {useRef} from 'react'
import {socket} from 'custom-util/src/socket-utils/socketIoClient';
import { useSelector} from "react-redux";
import styled from "styled-components";
import {fetchSendAMessageToPrivateConversation} from "@store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";

const MessengerConversationMessageToolsStyledForm = styled.form`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: transparent;

  .messaging-tools-text {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--secondary-background-color, #181818);
    padding:  8px;
    box-sizing: border-box;

    .messaging-tools-input {
      background-color: var(--secondary-background-color, #181818);
      color: var(--secondary-text-color, #181818);
      border: none;
      outline: none;
      height: 27px;
      width: 100%;
    }
  }

  .messaging-tools-Send {
    z-index: 10;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 8px;

    .submit-button {
      background-color: var(--secondary-background-color, #181818);
      color: var(--secondary-text-color, #181818);
      border: none;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

`

const MessengerConversationMessageTools = props => {
    const dispatch=useAppDispatch()
    const userData = useSelector((store:Store) => store?.user.userData);
    const messageInput = useRef(null)

    const onSendMessageHandler = e => {
        e.preventDefault()
        const messageInputData = messageInput ? messageInput.current.value : ''
        if (messageInputData?.length && messageInputData?.length < 500) {
            const messageData = {
                messageBody: messageInputData,
                createdAt: Date.now(),
                author: userData._id,
                conversationId: props.conversationId
            }
            socket.emit('sendMessageToConversation', messageData, props.conversationId)
            //@ts-ignore
            dispatch(fetchSendAMessageToPrivateConversation({conversationId:props.conversationId, messageBody:messageInputData}))
            messageInput.current.value = '';
            // props.getAndSetConversationData();
            // messageToConversation(props.conversationId, messageInputData).then(() => {
            //     messageInput.current.value = '';
            //     // props.getAndSetConversationData();
            // }).catch(err => {
            //     console.log(err)
            // })
        }
    }


    return (
            <MessengerConversationMessageToolsStyledForm onSubmit={onSendMessageHandler} className='messenger-conversation-message-tools'>

                <div className={'messaging-tools-text'}>
                    <input maxLength={300} ref={messageInput} className='messaging-tools-input' type="text" name='message'/>
                </div>
                <div  className={'messaging-tools-Send'}>
                    <button onClick={e => onSendMessageHandler(e)} className={'submit-button'} type={'submit'}>
                        <FontAwesomeIcon icon={faPaperPlane} style={{width: 25, height: 25}}/>
                    </button>
                </div>

            </MessengerConversationMessageToolsStyledForm>
    );
};
export default MessengerConversationMessageTools;
