import React, {useRef, useState} from "react";
import {FC} from "react";
import {useAppDispatch} from "web-app/dist/store_toolkit/hooks";
import {User} from "typescript-types";
import {Styles} from "./MultimediaInputBox.styles";
import RecordedAudioPreview from "@components/common/messengerAndChatroom/MultimediaInputBox/RecordedAudioPreview";
import UploadImageButton from "@components/common/messengerAndChatroom/MultimediaInputBox/UploadImageButton";
import VoiceRecorderButton from "@components/common/messengerAndChatroom/MultimediaInputBox/VoiceRecorderButton";
import TextInput from "@components/common/messengerAndChatroom/MultimediaInputBox/TextInput";

interface IProps {
    userData:User,
    onSubmitHandler:()=>void,
    onStartTypingHandler:()=>void,

}

const MultimediaInputBox: FC<IProps> = (
    {
        onStartTypingHandler,
        userData,
        onSubmitHandler
    }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [audioMessage, setAudioMessage] = useState<string>('')
    const [messageText, setMessageText] = useState('')
    const dispatch = useAppDispatch()


    return (
        <Styles>
            {!!audioMessage && <RecordedAudioPreview audioMessage={audioMessage} setAudioMessage={setAudioMessage}/>}
            {!audioMessage &&
                <>
                <TextInput onChangeHandler={setMessageText} onStartTypingHandler={onStartTypingHandler} value={messageText}/>
                    {/*<UploadImageButton inputRef={inputRef} chatroomId={} authorId={} setMessageText={}/>*/}
                    {/*<VoiceRecorderButton setAudioMessage={}/>*/}
                </>
            }

        </Styles>
    )
};
export default MultimediaInputBox
