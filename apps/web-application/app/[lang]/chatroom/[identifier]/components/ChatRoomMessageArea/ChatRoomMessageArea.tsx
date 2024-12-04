'use client';
import React, { useEffect, useRef, FC } from 'react';
import ChatRoomMessage from './ChatRoomMessage';
import { ChatroomMessage } from '@repo/typescript-types';
import socket from '@lib/web-socket-client';
import { sortArrayByPropertyOfObject } from '@repo/shared-util';
import './ChatRoomMessageArea.scss';
import { Spinner } from '@repo/ui';

interface IProp {
    chatroomId: string;
    messageAreaRef: React.RefObject<HTMLDivElement>;
    autoScroll: boolean;
    setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
    chatroomMessages: ChatroomMessage[];
    gettingOlderMessages: React.MutableRefObject<boolean>;
    onDeleteMessageHandler: (messageId: string) => void;
    isLoading: React.MutableRefObject<boolean>;
}

const ChatRoomMessageArea: FC<IProp> = ({
    chatroomId,
    messageAreaRef,
    autoScroll,
    setAutoScroll,
    chatroomMessages,
    gettingOlderMessages,
    onDeleteMessageHandler,
    isLoading,
}) => {
    const prevScrollPosition = useRef(0);

    // const debounce = (func:Function, wait:number) => {
    //     let timeout: any;
    //     return (...args: any) => {
    //         clearTimeout(timeout);
    //         timeout = setTimeout(() => func(...args), wait);
    //     };
    // };

    const debounce = (func: (...args: unknown[]) => void, wait: number) => {
        let timeout: ReturnType<typeof setTimeout> | null = null;

        return (...args: unknown[]) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };



    useEffect(() => {
        const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
            const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

            if (prevScrollPosition.current > scrollTop) {
                setAutoScroll(false);
            } else if (scrollTop + clientHeight >= scrollHeight - 5) {
                setAutoScroll(true);
            }
            prevScrollPosition.current = scrollTop;

            if (scrollTop < 50 && gettingOlderMessages.current) {
                isLoading.current = true;
                socket.emit('loadOlderMessages', {
                    chatroomId,
                    currentlyLoadedMessagesCount: chatroomMessages.length,
                });
            }
        };

        // @ts-expect-error: it's just a stupid ts error
        const debouncedHandleScroll = debounce(handleScroll, 500);

        const messageArea = messageAreaRef.current;
        messageArea?.addEventListener('scroll', debouncedHandleScroll);
        return () => messageArea?.removeEventListener('scroll', debouncedHandleScroll);
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
        <div ref={messageAreaRef} className={`custom-scroll`} id={'chatroomMessageArea'}>
            {isLoading.current && (
                <div className={'messageLoaderLoading'}>
                    <Spinner />
                </div>
            )}
            {!!chatroomMessages?.length &&
                sortArrayByPropertyOfObject(chatroomMessages, 'createdAt', 'asc').map(
                    (message: ChatroomMessage, index: number) => {
                        return (
                            <ChatRoomMessage
                                onDeleteMessageHandler={onDeleteMessageHandler}
                                message={message}
                                key={message?._id + index}
                            />
                        );
                    },
                )}
        </div>
    );
};

export default ChatRoomMessageArea;
