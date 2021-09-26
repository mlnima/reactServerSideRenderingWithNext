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
                author:contextData.userData._id,
                conversationId:props.conversationId
            }
            socket.emit('sendMessageToConversation',messageData,props.conversationId)
            messageToConversation(props.conversationId, messageInputData).then(() => {
                messageInput.current.value = '';
               // props.getAndSetConversationData();
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
                    background-color: var(--navigation-background-color,#18181b);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: calc(100% - 4px);
                    
                }
                
                .messenger-conversation-message-tools-text{
                    display: flex;
                    justify-content: center;
                    width: calc(100% - 4px);
                }
                .messenger-conversation-message-tools-text-input{
                    border-radius: 50px;
                    height: 27px;
                    width: 100%;
                    padding: 5px 5px;
                }
                .messenger-conversation-message-tools-Send{
                    z-index: 10;
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    right: 8px;
                }
                .messenger-conversation-message-tools-btn{
                    background-color: var(--navigation-background-color,#18181b);
                    border: none;
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                }
            `}</style>
            <div className='messenger-conversation-message-tools-text'>
                <input maxLength='300' ref={messageInput} className='messenger-conversation-message-tools-text-input' type="text" name='message'/>
            </div>
            <div className='messenger-conversation-message-tools-Send'>
                <button onClick={e => onSendMessageHandler(e)} className='messenger-conversation-message-tools-btn'>
                    <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color, #ccc)'}} icon={faArrowRight}/>
                </button>

            </div>
        </form>
    );
};
export default MessengerConversationMessageTools;
