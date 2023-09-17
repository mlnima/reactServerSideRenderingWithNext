'use client';
import React, {FC, useRef, useState} from "react";
import RecordedAudioPreview from "./RecordedAudioPreview";
import TextInput from "./TextInput";
import UploadImageButton from "./UploadImageButton";
import VoiceRecorderButton from "./VoiceRecorderButton";
import AddedImagePreview from "./AddedImagePreview";
import {useAppSelector} from "@store/hooks";
import './MessengerMultiMediaInputBox.styles.scss'
import socket from "web-socket-client";
import {IMessengerConversation} from "typescript-types/dist/src/messengerTypes/IMessengerConversation";
import {IDraftMessage} from "../../interfaces";


interface IProps {
    onStartTypingHandler: () => void,
    activeConversation: IMessengerConversation
    dictionary: {
        [key: string]: string
    }
}

const MessengerMultiMediaInputBox: FC<IProps> = (
    {
        onStartTypingHandler,
        activeConversation,
        dictionary
    }) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const {userData} = useAppSelector(({user}) => user);

    const [draftMessage, setDraftMessage] = useState<IDraftMessage>({
        imageContent: '',
        videoContent: '',
        audioContent: '',
        textContent: '',
    })

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        if (userData?._id && activeConversation?._id) {
            const messageData = {
                content: draftMessage.textContent,
                imageContent: draftMessage.imageContent,
                audioContent: draftMessage.audioContent,
                createdAt: Date.now(),
                sender: userData._id,
                conversation: activeConversation._id
            }
            socket.emit('sendPrivateMessage', messageData)
            setTimeout(() => {
                setDraftMessage({
                    imageContent: '',
                    videoContent: '',
                    audioContent: '',
                    textContent: '',
                })
            }, 500)
        }
    }


    return (

                <form id={'MessengerMultiMediaInputBox'} onSubmit={onSubmitHandler}>
                    {(!!draftMessage.audioContent || !!draftMessage.imageContent) &&
                        <div className={'media-content'}>
                            {!!draftMessage.imageContent &&
                                <AddedImagePreview handleSubmit={onSubmitHandler}
                                                   setDraftMessage={setDraftMessage}
                                                   draftMessage={draftMessage}/>}
                            {!!draftMessage?.audioContent &&
                                <RecordedAudioPreview setDraftMessage={setDraftMessage}
                                                      draftMessage={draftMessage}/>}
                        </div>
                    }
                    <TextInput onStartTypingHandler={onStartTypingHandler}
                               dictionary={dictionary}
                               draftMessage={draftMessage}
                               setDraftMessage={setDraftMessage}/>

                    <UploadImageButton imageInputRef={imageInputRef}
                                       draftMessage={draftMessage}
                                       setDraftMessage={setDraftMessage}/>

                    {/*<VoiceRecorderButton setDraftMessage={setDraftMessage}/>*/}
                </form>
    )
};
export default MessengerMultiMediaInputBox;
