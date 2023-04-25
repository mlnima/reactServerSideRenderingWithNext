import React, {FC, useEffect, useRef, useState} from 'react';
import {socket} from 'custom-util/src/socket-utils/socketIoClient';
import {useSelector} from "react-redux";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import Styles from './ChatRoomTools.styles';
import SomeoneIsTyping from "@components/pagesIncludes/chatroom/ChatRoomTools/SomeoneIsTyping";
import UploadImageButton from "@components/pagesIncludes/chatroom/ChatRoomTools/UploadImageButton";
import VoiceRecorderButton from "@components/pagesIncludes/chatroom/ChatRoomTools/VoiceRecorderButton";
import RecordedAudioPreview from "@components/pagesIncludes/chatroom/ChatRoomTools/RecordedAudioPreview";

interface IProps {
    chatroomId: string
}

const ChatRoomTools: FC<IProps> = ({chatroomId}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const {loggedIn, _id, username} = useSelector(({user}: Store) => {
        return {
            loggedIn: user?.loggedIn,
            _id: user.userData?._id,
            username: user.userData?.username,
        }
    })
    const [audioMessage, setAudioMessage] = useState<string>('')
    const [messageText, setMessageText] = useState('')
    const [someoneTypes, setSomeoneTypes] = useState({
        username: '',
        active: false
    });

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
        <Styles className={'chatroom-tools'} onSubmit={e => onSubmitHandler(e)}>
            {someoneTypes.active && <SomeoneIsTyping username={someoneTypes.username}/>}

            <div className={'chatroom-tools-items'}>

                {!!audioMessage ?
                    <RecordedAudioPreview audioMessage={audioMessage} setAudioMessage={setAudioMessage}/> :
                    <>
                        <input className={'chatroom-tools-input'}
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
        </Styles>

    );
};
export default ChatRoomTools;

