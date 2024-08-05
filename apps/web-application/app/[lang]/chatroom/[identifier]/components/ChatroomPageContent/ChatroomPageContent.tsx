'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import socket from '@lib/web-socket-client';
import { headerSizeCalculator } from '@repo/shared-util';
import { setAlert } from '@store/reducers/globalStateReducer';
import ChatroomTopbar from '../ChatroomTopbar/ChatroomTopbar';
import ChatRoomMessageArea from '../ChatRoomMessageArea/ChatRoomMessageArea';
import ChatRoomTools from '../ChatRoomTools/ChatRoomTools';
import ChatRoomOnlineUsersList from '../ChatRoomOnlineUsersList/ChatRoomOnlineUsersList';
import { IChatroomUsers, INewUserJoinData, IPreference } from '../interfaces';
import './ChatroomPageContent.styles.scss';
import Soft404 from '@components/Soft404/Soft404';
import { ChatroomMessage } from "@repo/typescript-types";

interface IProps {
    locale: string;
    pageData: any;
    dictionary: {
        [key: string]: string;
    };
}

const ChatroomPageContent: FC<IProps> = ({ dictionary, pageData, locale }) => {
    const [preference, setPreference] = useState<IPreference>({
        autoScroll: true,
        onlineUserListVisibility: false,
        isJoined: false,
        isMaximized: false,
    });

    const [chatroomUsers, setChatroomUsers] = useState<IChatroomUsers>([]);
    const [chatroomMessages, setChatroomMessages] = useState<ChatroomMessage[]>([]);
    const [autoScroll, setAutoScroll] = useState(true);
    const messageAreaRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector(store => store.user);
    const isJoined = useRef<boolean>(false);
    const [headerSize, setHeaderSize] = useState(0);
    const gettingOlderMessages = useRef<boolean>(true);
    const isLoading = useRef<boolean>(false);

    useEffect(() => {
        // console.log(`iWantToJoinToAChatroom=> `,!isJoined.current , user?.loggedIn , !!pageData?.chatroom?._id)
        isJoined.current = false;
        if (!isJoined.current && user?.loggedIn && !!pageData?.chatroom?._id) {

            const userDataForJoiningRoom = {
                chatroomId: pageData?.chatroom?._id,
                joiner: {
                    _id: user.userData?._id,
                    username: user.userData?.username,
                    profileImage: user.userData?.profileImage,
                },
            };
            socket.emit('iWantToJoinToAChatroom', userDataForJoiningRoom);
        }

        if (!user?.loggedIn){
            socket.emit('iWantToPreviewAChatroom',{ chatroomId: pageData?.chatroom?._id});
        }


    }, [user?.loggedIn, pageData?.chatroom?._id, user?.socketId]);

    useEffect(() => {
        const chatroomLocalStoragePreference = localStorage.getItem('chatroomPreference');
        const preferenceData = chatroomLocalStoragePreference
            ? JSON.parse(chatroomLocalStoragePreference)
            : null;
        if (preferenceData) {
            setPreference({
                ...preference,
                ...preferenceData,
            });
        }
    }, []);

    const handleOlderMessagesLoaded = (data: { messages: ChatroomMessage[] }) => {
        if (data?.messages?.length > 0) {
            setChatroomMessages(prevState => [...data?.messages, ...prevState]);
        } else {
            if (gettingOlderMessages.current) {
                gettingOlderMessages.current = false;
                dispatch(
                    setAlert({
                        message: 'No More Messages',
                        type: 'info',
                    }),
                );
            }
        }

        if (messageAreaRef.current) {
            messageAreaRef.current.scroll({
                top: 100,
                behavior: 'smooth',
            });
        }
        setTimeout(() => {
            isLoading.current = false;
        }, 1000);
    };

    const handleMessageFromChatroom = (newMessageData: ChatroomMessage) => {
        setChatroomMessages(prevState => [...prevState, newMessageData]);
    };

    const initializeChatroomDataHandler = (data: any) => {
        isJoined.current = true;
        if (data?.recentChatRoomMessages?.length > 0) {
            setChatroomMessages(data?.recentChatRoomMessages);
        }
        if (data?.onlineUsersList?.length > 0) {
            setChatroomUsers(data?.onlineUsersList);
        }
    };

    const onDeleteMessageHandler = (messageId: string) => {
        setChatroomMessages(prevMessages =>
            prevMessages.filter(message => message._id !== messageId),
        );
        socket.emit('deleteThisMessageFromChatroom', {
            messageId,
            chatroomId: pageData?.chatroom?._id,
        });
    };

    const onNewUserJoinedHandler = ({ joiner, chatroomId }: INewUserJoinData) => {
        const isUserExist = chatroomUsers.some(user => user._id === joiner._id);
        if (!isUserExist && chatroomId === pageData?.chatroom?._id) {
            setChatroomUsers(prevUsers => [...prevUsers, joiner]);

            if (joiner.username !== 'Admin') {
                //@ts-ignore
                setChatroomMessages(prevState => {
                    return [
                        ...prevState,
                        {
                            type: 'log',
                            messageData: `${joiner.username} joined`,
                        },
                    ];
                });
            }
        }
    };

    const onAUserLeftTheChatroomHandler = (userId: string) => {
        setChatroomUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    };

    const onAUserDisconnectedHandler = (userId: string) => {
        setChatroomUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    };

    const onAMessageWasDeleted = (messageId: string) => {
        setChatroomMessages(prevMessages =>
            prevMessages.filter(message => message._id !== messageId),
        );
    };

    useEffect(() => {
        socket.on('initializeChatroomData', initializeChatroomDataHandler);
        socket.on('aMessageDeletedFromChatroom', onAMessageWasDeleted);
        socket.on('aUserDisconnected', onAUserDisconnectedHandler);
        socket.on('aUserLeftTheChatroom', onAUserLeftTheChatroomHandler);
        socket.on('newUserJoined', onNewUserJoinedHandler);
        socket.on('messageFromChatroom', handleMessageFromChatroom);
        socket.on('olderMessagesLoaded', handleOlderMessagesLoaded);

        if (typeof window !== 'undefined') {
            // document.body.style.overflow = 'hidden'
            if (window.innerWidth > 768 && !preference.onlineUserListVisibility) {
                updatePreference('onlineUserListVisibility', true);
            }
            if (!headerSize) {
                setHeaderSize(headerSizeCalculator());
            }
        }

        return () => {
            socket.emit('iLeftTheChatroom', {
                chatroomId: pageData?.chatroom?._id,
            });

            socket.off('aMessageDeletedFromChatroom', onAMessageWasDeleted);
            socket.off('aUserDisconnected', onAUserDisconnectedHandler);
            socket.off('aUserLeftTheChatroom', onAUserLeftTheChatroomHandler);
            socket.off('newUserJoined', onNewUserJoinedHandler);
            socket.off('initializeChatroomData', initializeChatroomDataHandler);
            socket.off('messageFromChatroom', handleMessageFromChatroom);
            socket.off('olderMessagesLoaded', handleOlderMessagesLoaded);
        };
    }, []);

    const updatePreference = (key: string, value: any) => {
        setPreference((prevState: IPreference) => {
            const newPreference = {
                ...prevState,
                [key]: value,
            };
            localStorage.setItem('chatroomPreference', JSON.stringify(newPreference));
            return newPreference;
        });
    };

    if (!pageData?.chatroom?._id) {
        return <Soft404 dictionary={dictionary} />;
    }

    // if (!user?.loggedIn) return <LoggedInRequirePageMessage dictionary={dictionary} />;

    return (
        <div
            className={`chatroomPageContent chatroomPage${preference.isMaximized ? 'Maximized' : ''}`}
        >
            <ChatroomTopbar
                chatrooms={pageData?.chatrooms}
                locale={locale}
                chatroomId={pageData?.chatroom?._id}
                preference={preference}
                updatePreference={updatePreference}
                setAutoScroll={setAutoScroll}
                autoScroll={autoScroll}
            />

            <ChatRoomMessageArea
                chatroomId={pageData?.chatroom?._id}
                onDeleteMessageHandler={onDeleteMessageHandler}
                messageAreaRef={messageAreaRef}
                autoScroll={autoScroll}
                isLoading={isLoading}
                setAutoScroll={setAutoScroll}
                chatroomMessages={chatroomMessages}
                gettingOlderMessages={gettingOlderMessages}
            />

            <ChatRoomTools dictionary={dictionary} chatroomId={pageData?.chatroom?._id} setAutoScroll={setAutoScroll} />
            {preference.onlineUserListVisibility && (
                <ChatRoomOnlineUsersList chatroomUsers={chatroomUsers} />
            )}
        </div>
    );
};

export default ChatroomPageContent;
