'use client';
import React, {FC, useEffect, useRef} from 'react';
import Message from "../Message/Message";
import {uniqArrayBy} from 'shared-util'
import {useAppSelector} from "@store/hooks";
import {sortArrayByPropertyOfObject} from 'shared-util';
import './MessagingArea.styles.scss'
import {IMessengerConversation} from "typescript-types";

interface IProps {
    onLoadOlderMessages: () => void
    messageAreaRef: React.RefObject<HTMLDivElement>,
    autoScroll: boolean,
    setAutoScroll: Function,
    activeConversation: IMessengerConversation,
}

const MessagingArea: FC<IProps> =
    ({
         onLoadOlderMessages,
         messageAreaRef,
         autoScroll,
         setAutoScroll,
         activeConversation
     }) => {
        const prevScrollPosition = useRef(0);


        const {userData} = useAppSelector(({user}) => user)

        useEffect(() => {

            setTimeout(() => {
                if (autoScroll && messageAreaRef?.current) {
                    messageAreaRef.current.scroll({
                        //@ts-ignore
                        top: messageAreaRef.current.scrollHeight + 50,
                        behavior: 'smooth',
                    });
                }
            }, 500)

        }, [autoScroll, activeConversation?.messages]);


        useEffect(() => {
            const handleScroll = (event: any) => {
                const {scrollTop, clientHeight, scrollHeight} = event.target;

                if (prevScrollPosition.current > scrollTop) {
                    setAutoScroll(false)
                } else if (scrollTop + clientHeight >= scrollHeight - 5) {
                    setAutoScroll(true)
                }
                prevScrollPosition.current = scrollTop;

                if (scrollTop === 0 && activeConversation?._id) {
                    onLoadOlderMessages()
                }
            };

            const messageArea = messageAreaRef.current;
            messageArea?.addEventListener('scroll', handleScroll);
            return () => messageArea?.removeEventListener('scroll', handleScroll);
        }, [activeConversation?.messages]);

        return (
            <div ref={messageAreaRef}
                 className={'messengerConversationMessagingArea custom-scroll'}>

                {!!activeConversation?._id &&
                    <div className={'messages'}>
                        {activeConversation?.messages?.length ?
                            sortArrayByPropertyOfObject(
                                uniqArrayBy((activeConversation?.messages || []), '_id'),
                                'createdAt',
                                'asc'
                            )
                                .map((message: any) => {
                                    return (
                                        <Message
                                            key={message._id}
                                            messageData={message}
                                            isMine={message?.sender === userData?._id}
                                        />
                                    )
                                })
                            : null
                        }
                    </div>
                }


            </div>
        );
    };
export default MessagingArea;


