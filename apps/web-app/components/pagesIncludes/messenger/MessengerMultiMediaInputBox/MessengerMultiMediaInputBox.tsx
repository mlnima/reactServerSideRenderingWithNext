import React, {Dispatch, FC, SetStateAction, useEffect} from "react";
import {
    Styles
} from "@components/pagesIncludes/messenger/MessengerMultiMediaInputBox/MessengerMultiMediaInputBox.styles";
import RecordedAudioPreview from "./RecordedAudioPreview";
import TextInput from "./TextInput";
import UploadImageButton from "./UploadImageButton";
import VoiceRecorderButton from "./VoiceRecorderButton";
import AddedImagePreview from "@components/pagesIncludes/messenger/MessengerMultiMediaInputBox/AddedImagePreview";

interface IProps {
    audioMessage: string,
    imageMessage: string,
    textMessage: string,

    setAudioMessage: Dispatch<SetStateAction<string>>,
    setImageMessage: Dispatch<SetStateAction<string>>,
    setTextMessage: Dispatch<SetStateAction<string>>,

    onStartTypingHandler: () => void,
    imageInputRef: any
    onSubmitHandler: (event: any) => void,

    isActive: boolean
}

const MessengerMultiMediaInputBox: FC<IProps> = (
    {
        textMessage,
        imageMessage,
        audioMessage,
        setTextMessage,
        setImageMessage,
        setAudioMessage,
        onStartTypingHandler,
        imageInputRef,
        onSubmitHandler,
        isActive,
    }) => {

    const handleSubmit = (event)=>{
        event.preventDefault()
        onSubmitHandler(event)
    }

    return (
        <Styles onSubmit={handleSubmit}>
            {isActive &&
                <>
                    <TextInput onChangeHandler={setTextMessage}
                               onStartTypingHandler={onStartTypingHandler}
                               value={textMessage}/>
                    <UploadImageButton imageInputRef={imageInputRef} setImageMessage={setImageMessage}/>
                    <VoiceRecorderButton setAudioMessage={setAudioMessage}/>

                    {!!audioMessage &&
                        <RecordedAudioPreview audioMessage={audioMessage} setAudioMessage={setAudioMessage}/>}
                    {!!imageMessage &&
                        <AddedImagePreview imageMessage={imageMessage}
                                           onRemoveImageHandler={() => setImageMessage('')}/>}

                </>
            }

        </Styles>
    )
};
export default MessengerMultiMediaInputBox
