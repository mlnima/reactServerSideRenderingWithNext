import React, {FC, KeyboardEventHandler} from "react";
import Styles from "./TextInput.styles";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {setDraftMessageData} from "@store_toolkit/clientReducers/messengerReducer";

interface IProps {
    onStartTypingHandler: KeyboardEventHandler<HTMLInputElement>,
}

const textInput: FC<IProps> = ({onStartTypingHandler}) => {
    const dispatch = useAppDispatch()
    const {draftMessage} = useAppSelector(({messenger}) => messenger);
    return (
        <Styles>
            <input className={'chatroom-tools-input form-control-input'}
                   maxLength={300}
                   type={'text'}
                   name={'messageData'}
                   placeholder={'Type a message'}
                   onChange={e => dispatch(setDraftMessageData({textContent: e.target.value}))}
                   onKeyDown={onStartTypingHandler}
                   value={draftMessage.textContent}
            />
        </Styles>
    )
};
export default textInput
