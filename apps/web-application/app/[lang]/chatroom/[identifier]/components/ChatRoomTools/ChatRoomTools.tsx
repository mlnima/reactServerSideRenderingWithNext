'use client';
import React, {FC, useEffect, useRef, useState} from 'react';
import socket from '@lib/web-socket-client';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import SomeoneIsTyping from "./SomeoneIsTyping";
import UploadImageButton from "./UploadImageButton";
// import VoiceRecorderButton from "./VoiceRecorderButton";
import RecordedAudioPreview from "./RecordedAudioPreview";
import './ChatRoomTools.styles.scss'
import {loginRegisterForm, setAlert} from "@store/reducers/globalStateReducer";

interface IProps {
    chatroomId: string,
    dictionary: {
        [key: string]: string;
    };

    setAutoScroll(value: boolean): void
}

const ChatRoomTools: FC<IProps> = ({chatroomId, setAutoScroll,dictionary}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const {loggedIn} = useAppSelector(({user}) => user)
    const {_id} = useAppSelector(({user}) => user?.userData)

    const {username} = useAppSelector(({user}) => user?.userData)
    const {userData} = useAppSelector(({user}) => user)

    const dispatch = useAppDispatch()

    const [audioMessage, setAudioMessage] = useState<string>('')
    const [messageText, setMessageText] = useState('')
    const [lastMessageTime, setLastMessageTime] = useState<number | null>(null);
    const [someoneTypes, setSomeoneTypes] = useState({
        username: '',
        active: false
    });

    const [iAmTyping, setIAmTyping] = useState(false)


    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        if (!loggedIn) return

        if (typeof lastMessageTime === 'number' && performance.now() - lastMessageTime < 2 * 1000) {
            dispatch(setAlert({
                message: "You must wait 15 seconds between messages.",
                type: 'info'
            }));
            return;
        }

        // if (lastMessageTime && Date.now() - lastMessageTime < 2 * 1000) {
        //     dispatch(setAlert({
        //         message: "You must wait 15 seconds between messages.",
        //         type: 'info'
        //     }))
        //     return;
        // }

        if (messageText) {
            const messageBody = {
                chatroom: chatroomId,
                author: _id,
                type: 'message',
                messageData: messageText
            }
            socket.emit('messageToChatroom', {
                messageBody,
                authorData: {
                    profileImage: {
                        filePath:userData.profileImage?.filePath
                    },
                    username: userData.username,
                    _id: userData._id
                }
            })
            setMessageText('')
            setLastMessageTime(performance.now())
            setAutoScroll(true)
        } else if (audioMessage) {
            const messageBody = {
                chatroom: chatroomId,
                author: _id,
                type: 'audio',
                messageData: audioMessage
            }
            setAudioMessage('')
            socket.emit('messageToChatroom', {
                messageBody,
                authorData: {
                    profileImage: {
                        filePath:userData.profileImage?.filePath
                    },
                    username: userData.username,
                    _id: userData._id
                }
            })
        }
    }

    const onStartTypingHandler = () => {
        if (username && !iAmTyping) {
            socket.emit('iAmTyping', chatroomId, username)
        }
        setIAmTyping(true)
        setTimeout(() => {
            setIAmTyping(false)
        }, 60000)
    }


    useEffect(() => {
        socket.on('someoneIsTyping', ({ username} : {username:string}) => {
            setSomeoneTypes({
                ...someoneTypes,
                username,
                active: true,
            });

            setTimeout(() => {
                setSomeoneTypes({
                    ...someoneTypes,
                    username: '',
                    active: false,
                });
            }, 3000);
        });
    }, []);

    if (!loggedIn)
        return (
            <div className={'chatroomToolBoxNotLoggedIn'}>
                <button className={'btn btn-primary'} onClick={() => dispatch(loginRegisterForm('login'))}>
                    {dictionary?.['Login'] || 'Login'}
                </button>
                <button className={'btn btn-primary'} onClick={() => dispatch(loginRegisterForm('register'))}>
                    {dictionary?.['Register'] || 'Register'}
                </button>
            </div>
        );

    return (
        <form id={'chatroomToolBox'} onSubmit={e => onSubmitHandler(e)}>
            {someoneTypes.active && <SomeoneIsTyping username={someoneTypes.username} />}

            <div id={'chatroomToolBoxItems'}>
                {audioMessage ? (
                    <RecordedAudioPreview audioMessage={audioMessage} setAudioMessage={setAudioMessage} />
                ) : (
                    <>
                        <input
                            id={'chatroomToolBoxInput'}
                            type={'text'}
                            maxLength={300}
                            name={'messageData'}
                            placeholder={'Type a message'}
                            onChange={e => setMessageText(e.target.value)}
                            onKeyDown={onStartTypingHandler}
                            value={messageText}
                        />
                        <UploadImageButton
                            inputRef={inputRef}
                            chatroomId={chatroomId}
                            authorId={_id}
                            setMessageText={setMessageText}
                        />
                        {/*<VoiceRecorderButton setAudioMessage={setAudioMessage}/>*/}
                    </>
                )}
            </div>
        </form>
    );
};
export default ChatRoomTools;

