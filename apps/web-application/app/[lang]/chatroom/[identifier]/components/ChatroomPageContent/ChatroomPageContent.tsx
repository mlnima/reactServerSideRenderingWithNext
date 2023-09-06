'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import socket from "web-socket-client";
import {headerSizeCalculator, uniqArrayBy} from "custom-util";
import {loading} from "@store/reducers/globalStateReducer";
import {newMessage, setMessages} from "@store/reducers/chatroomReducer";
import {dispatchSocketId} from "@store/reducers/userReducers/userReducer";
import ChatroomTopbar from "../ChatroomTopbar/ChatroomTopbar";
import ChatRoomMessageArea from "../ChatRoomMessageArea/ChatRoomMessageArea";
import ChatRoomTools from "../ChatRoomTools/ChatRoomTools";
import ChatRoomOnlineUsersList from "../ChatRoomOnlineUsersList/ChatRoomOnlineUsersList";
import {IChatroomUsers, IPreference} from "../interfaces";
import './ChatroomPageContent.styles.scss'
import Soft404 from "@components/Soft404/Soft404";

interface IProps {
    identifier?: string,
    pageData: any,
    dictionary: {
        [key: string]: string
    },
}


const ChatroomPageContent: FC<IProps> = ({ identifier, dictionary, pageData}) => {

    const [preference, setPreference] = useState<IPreference>({
        autoScroll: true,
        onlineUserListVisibility: false,
        isJoined: false,
        isMaximized: false
    })
    const [chatroomUsers, setChatroomUsers] = useState<IChatroomUsers>([])

    const [autoScroll, setAutoScroll] = useState(true);
    const messageAreaRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.user);
    const [isJoined, setIsJoined] = useState(false);
    const [headerSize, setHeaderSize] = useState(0);

    const updatePreference = (key: string, value: any) => {
        setPreference((prevState: IPreference) => {
            const newPreference = {
                ...prevState,
                [key]: value
            }
            localStorage.setItem('chatroomPreference', JSON.stringify(newPreference))
            return newPreference
        })
    }
    useEffect(() => {
        const chatroomLocalStoragePreference = localStorage.getItem('chatroomPreference')
        const preferenceData = chatroomLocalStoragePreference ? JSON.parse(chatroomLocalStoragePreference) : null
        if (preferenceData) {
            setPreference({
                ...preference,
                ...preferenceData
            })
        }
    }, []);

    useEffect(() => {
        if (!pageData?.chatroom?._id || !user.loggedIn || isJoined || !user.socketId) return;
        setIsJoined(true);
        const userDataForJoiningRoom = {
            chatroomId: pageData?.chatroom?._id,
            author: {
                _id: user.userData?._id,
                username: user.userData?.username,
                profileImage: user.userData?.profileImage,
            },
            socketId: user.socketId,
        };
        socket.emit('joinUserToTheRoom', userDataForJoiningRoom);
    }, [user.loggedIn, pageData?.chatroom?._id, user.socketId]);

    useEffect(() => {
        if (!pageData?.chatroom?._id) return;
        setTimeout(() => {
            socket.emit('JoinSocketAndGetInitialData', {chatroomId: pageData?.chatroom?._id});
        }, 50);
    }, [identifier, pageData?.chatroom, user.loggedIn]);


    useEffect(() => {
        const handleUserListUpdated = (chatroomOnlineUsers: { username: string }[]) => {
            //@ts-ignore
            setChatroomUsers(prevState => (uniqArrayBy([...prevState, ...chatroomOnlineUsers], 'username')))
        };

        const handleMessageFromChatroom = (newMessageData: object) => {
            dispatch(newMessage(newMessageData));
        };

        const handleJoinSocketAndGetInitialData = (data: {
            socketId: string,
            recentChatRoomMessages: {}[],
            onlineUsersList: {}[],
        }) => {
            dispatch(dispatchSocketId(data.socketId));
            //@ts-ignore
            setChatroomUsers(prevState => (uniqArrayBy([...prevState, ...data.onlineUsersList], 'username')))

            dispatch(setMessages(data?.recentChatRoomMessages));
            if (!messageAreaRef?.current) return;
            setTimeout(() => {
                if (messageAreaRef?.current) {
                    (messageAreaRef.current as HTMLDivElement).scroll({
                        top: (messageAreaRef.current as HTMLDivElement).scrollHeight + 50,
                        behavior: 'smooth',
                    });
                }

            }, 500);
        };

        const handleOlderMessagesLoaded = (data: { messages: {}[] }) => {
            dispatch(setMessages(data?.messages));

            setTimeout(() => {
                dispatch(loading(false));
                if (messageAreaRef.current) {
                    messageAreaRef.current.scroll({
                        top: 1,
                        behavior: 'smooth',
                    });
                }

            }, 500);
        };

        socket.on('userListUpdated', handleUserListUpdated);
        socket.on('messageFromChatroom', handleMessageFromChatroom);
        socket.on('JoinSocketAndGetInitialData', handleJoinSocketAndGetInitialData);
        socket.on('olderMessagesLoaded', handleOlderMessagesLoaded);

        if (typeof window !== 'undefined') {
            if (window.innerWidth > 768 && !preference.onlineUserListVisibility) {
                updatePreference('onlineUserListVisibility', true)
            }
            setTimeout(() => {
                setHeaderSize(headerSizeCalculator() + 100)
            }, 0)
        }

        return () => {
            socket.off('userListUpdated', handleUserListUpdated);
            socket.off('messageFromChatroom', handleMessageFromChatroom);
            socket.off('JoinSocketAndGetInitialData', handleJoinSocketAndGetInitialData);
            socket.off('olderMessagesLoaded', handleOlderMessagesLoaded);
        };

    }, []);

    if (!pageData?.chatroom?._id) {
        return <Soft404 dictionary={dictionary}/>;
    }

    return (
        <div className={`chatroomPageContent chatroomPage${preference.isMaximized ? 'Maximized' : ''}
             ${preference.onlineUserListVisibility ? 'visibleUserList' : ''}`}>

            <ChatroomTopbar
                chatrooms={pageData?.chatrooms}
                chatroomId={pageData?.chatroom?._id}
                preference={preference}
                updatePreference={updatePreference}
                setAutoScroll={setAutoScroll}
                autoScroll={autoScroll}
            />

            <ChatRoomMessageArea
                chatroomId={pageData?.chatroom?._id}
                messageAreaRef={messageAreaRef}
                autoScroll={autoScroll}
                setAutoScroll={setAutoScroll}
                headerSize={headerSize}
            />

            <ChatRoomTools chatroomId={pageData?.chatroom?._id}/>
            {preference.onlineUserListVisibility && <ChatRoomOnlineUsersList chatroomUsers={chatroomUsers}/>}

        </div>
    )
}

export default ChatroomPageContent;