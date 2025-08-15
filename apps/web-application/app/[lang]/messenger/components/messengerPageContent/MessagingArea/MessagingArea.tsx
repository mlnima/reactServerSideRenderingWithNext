'use client';
import React, { FC, useEffect, useRef } from 'react';
import Message from '../Message/Message';
import { uniqArrayBy } from '@repo/utils/dist/src';
import { useAppSelector } from '@store/hooks';
import { sortArrayByPropertyOfObject } from '@repo/utils/dist/src';
import './MessagingArea.scss';
import { IMessengerConversation, IMessengerConversationMessage } from '@repo/typescript-types';

interface IProps {
  onLoadOlderMessages: () => void;
  messageAreaRef: React.RefObject<HTMLDivElement | null>;
  autoScroll: boolean;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  activeConversation: IMessengerConversation;
}

const MessagingArea: FC<IProps> = ({ onLoadOlderMessages, messageAreaRef, autoScroll, setAutoScroll, activeConversation }) => {
  const prevScrollPosition = useRef<number>(0);

  const { userData } = useAppSelector(({ user }) => user);

  useEffect(() => {
    setTimeout(() => {
      if (autoScroll && messageAreaRef?.current) {
        messageAreaRef.current.scroll({
          top: messageAreaRef.current.scrollHeight + 50,
          behavior: 'smooth',
        });
      }
    }, 500);
  }, [autoScroll, activeConversation?.messages]);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.currentTarget as HTMLDivElement;
      const { scrollTop, clientHeight, scrollHeight } = target;

      if (prevScrollPosition.current > scrollTop) {
        setAutoScroll(false);
      } else if (scrollTop + clientHeight >= scrollHeight - 5) {
        setAutoScroll(true);
      }
      prevScrollPosition.current = scrollTop;

      if (scrollTop === 0 && activeConversation?._id) {
        onLoadOlderMessages();
      }
    };

    const messageArea = messageAreaRef.current;
    messageArea?.addEventListener('scroll', handleScroll as unknown as EventListener);
    return () => messageArea?.removeEventListener('scroll', handleScroll as unknown as EventListener);
  }, [activeConversation?.messages]);
  // useEffect(() => {
  //     const handleScroll = (event : React.UIEvent<HTMLDivElement>) => {
  //         const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
  //
  //         if (prevScrollPosition.current > scrollTop) {
  //             setAutoScroll(false)
  //         } else if (scrollTop + clientHeight >= scrollHeight - 5) {
  //             setAutoScroll(true)
  //         }
  //         prevScrollPosition.current = scrollTop;
  //
  //         if (scrollTop === 0 && activeConversation?._id) {
  //             onLoadOlderMessages()
  //         }
  //     };
  //
  //     const messageArea = messageAreaRef.current;
  //     messageArea?.addEventListener('scroll', handleScroll);
  //     return () => messageArea?.removeEventListener('scroll', handleScroll);
  // }, [activeConversation?.messages]);

  return (
    <div ref={messageAreaRef} className={'messengerConversationMessagingArea custom-scroll'}>
      {!!activeConversation?._id && (
        <div className={'messages'}>
          {activeConversation?.messages?.length
            ? sortArrayByPropertyOfObject(uniqArrayBy(activeConversation?.messages || [], '_id'), 'createdAt', 'asc').map(
                (message: IMessengerConversationMessage) => {
                  return (
                    <Message key={message._id} messageData={message} isMine={(message?.sender || message?.sender?._id) === userData?._id} />
                  );
                },
              )
            : null}
        </div>
      )}
    </div>
  );
};
export default MessagingArea;
