import React, {Dispatch, FC, SetStateAction, useEffect} from "react";
import {
    Styles
} from "@components/pagesIncludes/messenger/MessengerMultiMediaInputBox/MessengerMultiMediaInputBox.styles";
import RecordedAudioPreview from "./RecordedAudioPreview";
import TextInput from "./TextInput";
import UploadImageButton from "./UploadImageButton";
import VoiceRecorderButton from "./VoiceRecorderButton";
import AddedImagePreview from "@components/pagesIncludes/messenger/MessengerMultiMediaInputBox/AddedImagePreview";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import SubmitButton from "@components/pagesIncludes/messenger/MessengerMultiMediaInputBox/SubmitButton";

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

    const {draftMessage } = useSelector(({messenger}: Store) => messenger);

    const handleSubmit = (event)=>{
        event.preventDefault()
        onSubmitHandler(event)
    }

    return (
        <Styles onSubmit={handleSubmit}>
            {isActive &&
                <>
                    <TextInput onStartTypingHandler={onStartTypingHandler}/>
                    <UploadImageButton imageInputRef={imageInputRef}/>
                    <VoiceRecorderButton/>

                    {(!!draftMessage.audioContent ||!!draftMessage.imageContent) &&
                        <div className={'media-content'}>
                            {!!draftMessage.imageContent &&
                                <AddedImagePreview handleSubmit={handleSubmit}/>}
                            {!!draftMessage?.audioContent &&
                                <RecordedAudioPreview />}
                        </div>
                    }
                </>
            }

        </Styles>
    )
};
export default MessengerMultiMediaInputBox
