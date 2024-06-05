'use client';
import React, {useEffect, useRef, FC} from 'react';
import ChatRoomMessage from './ChatRoomMessage';
import {ChatroomMessage} from 'typescript-types';
import socket from '@lib/web-socket-client';
import {sortArrayByPropertyOfObject} from 'shared-util';
import {useAppDispatch} from '@store/hooks';
import {loading} from '@store/reducers/globalStateReducer';
import './ChatRoomMessageArea.styles.scss';

interface IProp {
    chatroomId: string,
    headerSize: number,
    messageAreaRef: React.RefObject<HTMLDivElement>,
    autoScroll: boolean,
    setAutoScroll: Function,
    isMaximized: boolean,
    chatroomMessages: ChatroomMessage[],
    gettingOlderMessages: React.MutableRefObject<boolean>,
    onDeleteMessageHandler: (messageId: string) => void,
}

const ChatRoomMessageArea: FC<IProp> = (
    {
        chatroomId,
        headerSize,
        messageAreaRef,
        autoScroll,
        setAutoScroll,
        isMaximized,
        chatroomMessages,
        gettingOlderMessages,
        onDeleteMessageHandler
    }) => {

    const prevScrollPosition = useRef(0);
    const dispatch = useAppDispatch();



    useEffect(() => {

        const handleScroll = (event: Event) => {
            const target = event.target as HTMLDivElement;
            const {scrollTop, clientHeight, scrollHeight} = target;

            if (prevScrollPosition.current > scrollTop) {
                setAutoScroll(false);
            } else if (scrollTop + clientHeight >= scrollHeight - 5) {
                setAutoScroll(true);
            }
            prevScrollPosition.current = scrollTop;

            if (scrollTop === 0 && gettingOlderMessages?.current) {
                dispatch(loading(true));
                socket.emit('loadOlderMessages', {
                    chatroomId,
                    currentlyLoadedMessagesCount: chatroomMessages.length,
                });
            }
        };

        const messageArea = messageAreaRef.current;
        messageArea?.addEventListener('scroll', handleScroll);
        return () => messageArea?.removeEventListener('scroll', handleScroll);
    }, [chatroomMessages]);


    useEffect(() => {
        if (autoScroll && messageAreaRef.current) {
            messageAreaRef.current.scroll({
                top: messageAreaRef.current.scrollHeight + 50,
                behavior: 'smooth',
            });
        }
    }, [autoScroll, chatroomMessages]);

    return (
        <div ref={messageAreaRef}
             className={`custom-scroll`}
             style={{
                 // height: isMaximized ? `calc(100vh - 100px)` : `calc(100vh - ${headerSize + 1}px)`
             }}
             id={'chatroomMessageArea'}>
            {!!chatroomMessages?.length && sortArrayByPropertyOfObject(chatroomMessages, 'createdAt', 'asc')
                .map((message: ChatroomMessage, index: number) => {
                    return <ChatRoomMessage onDeleteMessageHandler={onDeleteMessageHandler} message={message} key={message?._id || index}/>;
                })
            }
        </div>
    );
};

export default ChatRoomMessageArea;
