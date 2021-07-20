import {useContext, useRef, useEffect} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {messageToConversation} from "../../../../_variables/_userSocialAjaxVariables";
import {AppContext} from "../../../../context/AppContext";
import socket from "../../../../_variables/socket";

const MessengerConversationMessageTools = props => {
    const contextData = useContext(AppContext);
    const messageInput = useRef(null)

    const onSendMessageHandler = e => {
        e.preventDefault()
        const messageInputData = messageInput ? messageInput.current.value : ''
        if (messageInputData.length > 0 && messageInputData.length < 100) {
            const messageData = {
                messageBody:messageInputData,
                createdAt:Date.now(),
                author:contextData.userData._id
            }
            socket.emit('sendMessageToConversation',messageData,props.conversationId)
            messageToConversation(props.conversationId, messageInputData).then(() => {
                messageInput.current.value = '';
                props.getAndSetConversationData();
            }).catch(err => {
                console.log(err)
            })
        }
    }



    return (
        <form onSubmit={onSendMessageHandler} className='messenger-conversation-message-tools'>
            <style jsx>{`
                .messenger-conversation-message-tools{
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 50px;
                    padding: 2px;
                    background-color: var(--navigation-background-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                
                .messenger-conversation-message-tools-text{
                    width: 90%;
                }
                .messenger-conversation-message-tools-text-input{
                    border-radius: 50px;
                    height: 27px;
                    width: 90%;
                    padding: 5px 5%;
                }
                .messenger-conversation-message-tools-Send{
                display: flex;
                justify-content: center;
               
                    width: 15%;
                }
                .messenger-conversation-message-tools-btn{
                    background-color: transparent;
                    border: none;
                    //width: 100%;
                }
            `}</style>
            <div className='messenger-conversation-message-tools-text'>
                <input maxLength='100' ref={messageInput} className='messenger-conversation-message-tools-text-input' type="text" name='message'/>
            </div>
            <div className='messenger-conversation-message-tools-Send'>
                <button onClick={e => onSendMessageHandler(e)} className='messenger-conversation-message-tools-btn'>
                    <FontAwesomeIcon style={{width: '20px', height: '20px', color: 'var(--navigation-text-color)'}} icon={faArrowRight}/>
                </button>

            </div>
        </form>
    );
};
export default MessengerConversationMessageTools;
