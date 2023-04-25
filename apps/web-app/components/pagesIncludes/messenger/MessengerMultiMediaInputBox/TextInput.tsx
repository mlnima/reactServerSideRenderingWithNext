import React, {FC, KeyboardEventHandler} from "react";
import Styles from "./TextInput.styles";

interface IProps {
    onChangeHandler :(value:string)=>void,
    onStartTypingHandler :KeyboardEventHandler<HTMLInputElement>,
    value
}

const textInput: FC<IProps> = ({onChangeHandler,onStartTypingHandler,value}) => {
    return (
        <Styles>
            <input className={'chatroom-tools-input form-control-input'}
                   maxLength={300}
                   type={'text'}
                   name={'messageData'}
                   placeholder={'Type a message'}
                   onChange={e => onChangeHandler(e.target.value)}
                   onKeyDown={onStartTypingHandler}
                   value={value}
            />
        </Styles>
    )
};
export default textInput
