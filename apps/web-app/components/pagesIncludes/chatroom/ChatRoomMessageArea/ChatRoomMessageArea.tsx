import React, {useEffect, useRef, memo, FC} from 'react';
import ChatRoomMessage from './ChatRoomMessage';
import {useSelector} from 'react-redux';
import {Store, ChatroomMessage} from 'typescript-types';
import {socket} from 'custom-util/src/socket-utils/socketIoClient';
import sortArrayByPropertyOfObject from 'custom-util/src/array-utils/sortArrayByPropertyOfObject';
import {useAppDispatch} from '@store_toolkit/hooks';
import {loading} from '@store_toolkit/clientReducers/globalStateReducer';
import Styles from './ChatRoomMessageArea.styles';

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
    const isMaximized = useSelector(({chatroom}: Store) => chatroom.isMaximized);
    const chatroomMessages = useSelector(({chatroom}: Store) => chatroom?.messages || []);

    useEffect(() => {
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
                    if (messageAreaRef.current){
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
        if (autoScroll &&messageAreaRef.current) {
            //@ts-ignore
            messageAreaRef.current.scroll({
                //@ts-ignore
                top: messageAreaRef.current.scrollHeight + 50,
                behavior: 'smooth',
            });
        }
    }, [autoScroll, chatroomMessages]);

    return (
        <Styles
            ref={messageAreaRef}
            className="chatroom-message-area custom-scroll"
            id="chatroom-message-area"
            headerSize={headerSize}
            isMaximized={isMaximized}>
            {!!chatroomMessages?.length && sortArrayByPropertyOfObject(chatroomMessages, 'createdAt', 'asc')
                .map((message: ChatroomMessage, index: number) => {
                    return <ChatRoomMessage message={message} key={index}/>;
                })
            }
        </Styles>
    );
};

export default memo(ChatRoomMessageArea);

