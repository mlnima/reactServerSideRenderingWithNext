import React, {FC, useEffect, useRef, useState} from 'react';
import socket from 'web-socket-client';
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import SomeoneIsTyping from "./SomeoneIsTyping";
import UploadImageButton from "./UploadImageButton";
import VoiceRecorderButton from "./VoiceRecorderButton";
import RecordedAudioPreview from "./RecordedAudioPreview";
import './ChatRoomTools.styles.scss'

interface IProps {
    chatroomId: string
}

const ChatRoomTools: FC<IProps> = ({chatroomId}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()

    const {loggedIn} = useAppSelector(({user}) => user)
    const {_id} = useAppSelector(({user}) => user)
    const {username} = useAppSelector(({user}) => user)

    const [audioMessage, setAudioMessage] = useState<string>('')
    const [messageText, setMessageText] = useState('')
    const [someoneTypes, setSomeoneTypes] = useState({
        username: '',
        active: false
    });

    //@ts-ignore
    const onSubmitHandler = e => {
        e.preventDefault()
        if (!loggedIn) {
            dispatch(loginRegisterForm('register'))
            return
        }


        if (messageText) {
            const messageBody = {
                chatroom: chatroomId,
                author: _id,
                type: 'message',
                messageData: messageText
            }
            socket.emit('messageToChatroom', messageBody)
            setMessageText('')
        } else if (audioMessage) {
            const messageBody = {
                chatroom: chatroomId,
                author: _id,
                type: 'audio',
                messageData: audioMessage
            }
            setAudioMessage('')
            socket.emit('messageToChatroom', messageBody)
        }
    }

    const onStartTypingHandler = () => {
        if (username) {
            socket.emit('startTyping', chatroomId, username)
        }
    }


    useEffect(() => {

        socket.on('startTyping', ({username, activeChatroomId}) => {
            if (activeChatroomId === chatroomId && username) {
                setSomeoneTypes({
                    ...someoneTypes,
                    username,
                    active: true
                })
            }

        });
    }, []);


    useEffect(() => {
        if (someoneTypes.active) {
            setTimeout(() => {
                setSomeoneTypes({
                    ...someoneTypes,
                    username: '',
                    active: false
                })
            }, 3000)
        }
    }, [someoneTypes]);


    return (
        <form id={'chatroomToolBox'} onSubmit={e => onSubmitHandler(e)}>
            {someoneTypes.active && <SomeoneIsTyping username={someoneTypes.username}/>}

            <div id={'chatroomToolBoxItems'}>

                {!!audioMessage ?
                    <RecordedAudioPreview audioMessage={audioMessage} setAudioMessage={setAudioMessage}/> :
                    <>
                        <input id={'chatroomToolBoxInput'}
                               maxLength={300}
                               type={'text'}
                               name={'messageData'}
                               placeholder={'Type a message'}
                               onChange={e => setMessageText(e.target.value)}
                               onKeyDown={onStartTypingHandler}
                               value={messageText}
                        />
                        <UploadImageButton inputRef={inputRef} chatroomId={chatroomId} authorId={_id}
                                           setMessageText={setMessageText}/>
                        <VoiceRecorderButton setAudioMessage={setAudioMessage}/>
                    </>
                }
            </div>
        </form>

    );
};
export default ChatRoomTools;

