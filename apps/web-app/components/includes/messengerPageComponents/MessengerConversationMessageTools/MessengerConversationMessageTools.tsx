import {useRef} from 'react'
import {socket} from '@_variables/socket';
import { useSelector} from "react-redux";
import styled from "styled-components";
import {fetchSendAMessageToPrivateConversation} from "../../../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";
import {Store} from "typescript-types";
// import {messageToConversation} from "../../../../legacyCodesAndComponents/store/clientActions/userActions";

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
    justify-content: center;
    align-items: center;
    svg{
      width: 24px;
      height: 24px;
      
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
                <input maxLength={300} ref={messageInput} className='form-control-input' type="text" name='message'/>
                <button onClick={e => onSendMessageHandler(e)} className='btn btn-primary'>
                    <SvgRenderer svgUrl={'/asset/images/icons/share-solid.svg'}
                                 size={20}
                                 color={'var(--navigation-text-color, #ccc)'}/>
                </button>
            </MessengerConversationMessageToolsStyledForm>
    );
};
export default MessengerConversationMessageTools;
