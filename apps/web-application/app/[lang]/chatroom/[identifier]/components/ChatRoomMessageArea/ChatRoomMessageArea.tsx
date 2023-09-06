import React, {useEffect, useRef, memo, FC} from 'react';
import ChatRoomMessage from './ChatRoomMessage';
import {ChatroomMessage} from 'typescript-types';
import socket from 'web-socket-client';
import {sortArrayByPropertyOfObject} from 'custom-util';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {loading} from '@store/reducers/globalStateReducer';
import './ChatRoomMessageArea.styles.scss';

interface IProp {
    chatroomId: string;
    headerSize: number;
    messageAreaRef: any;
    autoScroll: boolean;
    setAutoScroll: Function;
}

const ChatRoomMessageArea: FC<IProp> = (
    {
        chatroomId,
        headerSize,
        messageAreaRef,
        autoScroll,
        setAutoScroll
    }) => {

    const prevScrollPosition = useRef(0);
    const dispatch = useAppDispatch();
    const isMaximized = useAppSelector(({chatroom}) => chatroom.isMaximized);
    const chatroomMessages = useAppSelector(({chatroom}) => chatroom?.messages || []);

    useEffect(() => {
        //@ts-ignore
        const handleScroll = (event) => {
            const {scrollTop, clientHeight, scrollHeight} = event.target;

            // Handle auto scroll toggle
            if (prevScrollPosition.current > scrollTop) {
                setAutoScroll(false);
            } else if (scrollTop + clientHeight >= scrollHeight - 5) {
                setAutoScroll(true);
            }
            prevScrollPosition.current = scrollTop;

            // Handle load older messages
            if (scrollTop === 0) {
                dispatch(loading(true));
                socket.emit('loadOlderMessages', {
                    chatroomId,
                    currentlyLoadedMessagesCount: chatroomMessages.length,
                });
                setTimeout(() => {
                    dispatch(loading(false));
                    if (messageAreaRef?.current) {
                        messageAreaRef.current.scroll({
                            top: 1,
                            behavior: 'smooth',
                        });
                    }

                }, 500);
            }
        };

        const messageArea = messageAreaRef.current;
        messageArea?.addEventListener('scroll', handleScroll);
        return () => messageArea?.removeEventListener('scroll', handleScroll);
    }, [chatroomMessages]);


    useEffect(() => {
        if (autoScroll && messageAreaRef.current) {
            //@ts-ignore
            messageAreaRef.current.scroll({
                //@ts-ignore
                top: messageAreaRef.current.scrollHeight + 50,
                behavior: 'smooth',
            });
        }
    }, [autoScroll, chatroomMessages]);

    return (
        <div ref={messageAreaRef}
             className={`custom-scroll`}
             style={{
                 height: !isMaximized ? `calc(100vh - 100px)` : `calc(100vh - ${headerSize + 1}px)`
             }}
             id="chatroomMessageArea">
            {!!chatroomMessages?.length && sortArrayByPropertyOfObject(chatroomMessages, 'createdAt', 'asc')
                //@ts-ignore
                .map((message: ChatroomMessage, index: number) => {
                    return <ChatRoomMessage message={message} key={index}/>;
                })
            }
        </div>
    );
};

export default ChatRoomMessageArea;

//headerSize={headerSize}
//             isMaximized={isMaximized}