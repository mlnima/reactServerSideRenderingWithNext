import React, {useState} from 'react';
import SendMessagePopUpHeader from "./SendMessagePopUpHeader";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {fetchSendMessage} from "../../../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const SendMessagePopUpStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;

  .send-message-pop-up-content {
    position: absolute;
    background-color: var(--navigation-background-color, #18181b);
    color: var(-navigation-text-color);
    width: 320px;
  }

  .send-message-pop-up-content-message-area {
    min-height: 250px;
    width: 100%;

    @media only screen and (min-width: 768px) {
      .send-message-pop-up-content {
        display: flex;
        justify-content: center;
        //align-items: center;
        flex-direction: column;
        width: 400px;
      }

      .send-message-pop-up-content-message-area {
        background-color: var(--navigation-background-color, #18181b);
        color: var(--navigation-text-color, #ccc);
        width: 380px;

      }
    }
`
const SendMessagePopUp = props => {
    const dispatch = useAppDispatch()
    const userData = useSelector((store: Store) => store?.user.userData)
    const [state, setState] = useState({
        sender: userData._id,
        receiver: props.receiverId,
        message: ''
    });

    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSendMessageHandler = () => {
        dispatch(fetchSendMessage({_id: state.receiver, message: state.message}))
        // sendMessage(state.receiver, state.message).then(res => {
        //
        // })
    }

    return (
        <SendMessagePopUpStyledDiv className='send-message-pop-up'>
            <div className='send-message-pop-up-content'>
                <SendMessagePopUpHeader
                    receiverId={props?.receiverId}
                    receiverProfileImage={props?.receiverProfileImage}
                    username={props.username}
                    onCloseMessagePop={props.onCloseMessagePop}
                />
                <textarea className='send-message-pop-up-content-message-area' name="message"
                          onChange={e => onChangeHandler(e)}/>
                <button onClick={onSendMessageHandler}>Send</button>
            </div>
        </SendMessagePopUpStyledDiv>
    );

};
export default SendMessagePopUp;
