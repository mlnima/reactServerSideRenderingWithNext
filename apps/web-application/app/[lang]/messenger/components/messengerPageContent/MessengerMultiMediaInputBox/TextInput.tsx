'use client';
import React, {FC, KeyboardEventHandler} from "react";
import {IDraftMessage} from "../../interfaces";

interface IProps {
    onStartTypingHandler: KeyboardEventHandler<HTMLInputElement>,
    draftMessage: IDraftMessage,
    setDraftMessage: Function,
    dictionary: {
        [key: string]: string
    }
}

const TextInput: FC<IProps> = ({onStartTypingHandler, draftMessage, setDraftMessage, dictionary}) => {

    return (
        <div className={'textInput'}>
            <input className={'chatroom-tools-input form-control-input'}
                   maxLength={300}
                   type={'text'}
                   name={'messageData'}
                   placeholder={dictionary?.['Type a message'] || 'Type a message'}
                   onChange={e => {
                       setDraftMessage((prevState: IDraftMessage) => ({...prevState, textContent: e.target.value}))
                   }}
                   onKeyDown={onStartTypingHandler}
                   value={draftMessage.textContent}
            />
        </div>
    )
};
export default TextInput
