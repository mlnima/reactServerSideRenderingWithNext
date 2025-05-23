'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import socket from '@lib/web-socket-client';
import { useSearchParams, usePathname } from 'next/navigation';
import { loadOlderMessagesAction } from '@store/reducers/messengerActions/loadOlderMessagesAction';
import './MessengerPageContent.styles.scss';
import Link from 'next/link';
import MessengerConversationsList from './MessengerConversationsList/MessengerConversationsList';
import MessengerHeader from './MessengerHeader/MessengerHeader';
import MessagingArea from './MessagingArea/MessagingArea';
import MessengerMultiMediaInputBox from './MessengerMultiMediaInputBox/MessengerMultiMediaInputBox';
import { IMessengerConversation, IMessengerConversationMessage } from '@repo/typescript-types';
import ConversationsControlsHeader from './ConversationsControlsHeader/ConversationsControlsHeader';

import getConversation from '@lib/actions/database/messenger/getConversation';
import getConversations from '@lib/actions/database/messenger/getConversations';

interface IProps {
    dictionary: {
        [key: string]: string;
    };
}

const MessengerPageContent: FC<IProps> = ({ dictionary }) => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const messageAreaRef = useRef<HTMLDivElement>(null);
    const hasRun = useRef(false);
    const [conversationsList, setConversationsList] = useState<IMessengerConversation[]>([]);
    const [autoScroll, setAutoScroll] = useState<boolean>(true);

    const [activeConversation, setActiveConversation] = useState<IMessengerConversation>({
        _id: '',
        messages: [],
        users: [],
        status: 'active',
        createdAt: null,
        updatedAt: null,
    });

    // const [isConversationsMenuOpen, setIsConversationsMenuOpen] = useState<boolean>(true);

    const { loggedIn } = useAppSelector(({ user }) => user);

    useEffect(() => {
        const conversationId = searchParams.get('_id') as string;
        if (conversationId) {
            onGetConversationHandler(conversationId);
        } else {
            setActiveConversation({
                _id: '',
                messages: [],
                users: [],
                status: 'active',
                createdAt: null,
                updatedAt: null,
            });
        }
    }, [pathname, searchParams]);

    const onGetConversationHandler = async (_id: string) => {
        try {
            const {success,data} =await getConversation({conversationId:_id});
            console.log(`onGetConversationHandler data=> `,data)
            if (!success || !data){
                return
            }
            setActiveConversation(prevState => ({
                ...prevState,
                ...data?.conversation,
            }));
        } catch {
            return;
        }
    };

    useEffect(() => {
        if (loggedIn) {
            onGetConversationListHandler();
        }
    }, [loggedIn]);


    useEffect(() => {
        const handleGetPrivateMessage = (messageData: IMessengerConversationMessage) => {
            setActiveConversation(prevState => ({
                ...prevState,
                messages: [...(prevState?.messages || []), messageData],
            }));
        };

        socket.on('getPrivateMessage', handleGetPrivateMessage);

        return () => {
            socket.off('getPrivateMessage', handleGetPrivateMessage);
        };
    }, []);

    useEffect(() => {
        if (activeConversation?._id && !hasRun.current) {
            socket.emit('joinConversation', activeConversation?._id);
            hasRun.current = true;
        }
    }, [activeConversation]);

    const onGetConversationListHandler = async () => {
        try {
             const {success,data} = await getConversations({
                 skip: conversationsList?.length
             })

            if (!success || !data){
              return
            }

            if (data.conversations.length > 0) {
                setConversationsList([...conversationsList, ...data.conversations]);
            }
        } catch {
            return;
        }
    };

    const onStartTypingHandler = () => {};



    // const conversationsMenuTriggerHandler = (value: boolean) => {
    //     setIsConversationsMenuOpen(!isConversationsMenuOpen);
    //     setActiveConversation({
    //         _id: '',
    //         messages: [],
    //         users: [],
    //         status: 'active',
    //         createdAt: null,
    //         updatedAt: null,
    //     });
    // };

    const onLoadOlderMessages = () => {
        if (activeConversation?._id) {
            dispatch(
                loadOlderMessagesAction({
                    limit: 10,
                    skip: activeConversation?.messages?.length || 0,
                    conversationId: activeConversation?._id,
                    messageAreaRef,
                }),
            );
        }
    };

    if (!loggedIn)
        return (
            <div className={'notLoggedInMessage'}>
                <Link href={'/register'} className="notLoggedInMessageLink">
                    You need to create an account in order to access this page
                </Link>
            </div>
        );

    return (
        <div className={`messengerPageContent ${activeConversation?._id ? 'messengerPageContentActive' : ''}`}>
            <div className={`conversationsControls ${activeConversation?._id ? 'conversationsControlsHidden' : ''}`}>
                <ConversationsControlsHeader />
                <MessengerConversationsList
                    onGetConversationListHandler={onGetConversationListHandler}
                    conversationsList={conversationsList}
                />
            </div>
            <div className={`conversationArea ${activeConversation?._id ? '' : 'conversationAreaHidden'}`}>
                {activeConversation?._id && (
                    <>
                        <MessengerHeader
                            autoScroll={autoScroll}
                            setAutoScroll={setAutoScroll}
                            activeConversation={activeConversation}
                        />

                        <MessagingArea
                            onLoadOlderMessages={onLoadOlderMessages}
                            autoScroll={autoScroll}
                            setAutoScroll={setAutoScroll}
                            activeConversation={activeConversation}
                            messageAreaRef={messageAreaRef}
                        />

                        <MessengerMultiMediaInputBox
                            dictionary={dictionary}
                            onStartTypingHandler={onStartTypingHandler}
                            activeConversation={activeConversation}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
export default MessengerPageContent;
