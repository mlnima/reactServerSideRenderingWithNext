import React, {FC, useEffect, useRef, useState} from 'react';
import { socket } from 'custom-util';
import ChatRoomMessageArea from "@components/pagesIncludes/chatroom/ChatRoomMessageArea/ChatRoomMessageArea";
import ChatRoomTools from "@components/pagesIncludes/chatroom/ChatRoomTools/ChatRoomTools";
import ChatRoomOnlineUsersList
    from "@components/pagesIncludes/chatroom/ChatRoomOnlineUsersList/ChatRoomOnlineUsersList";
import {useSelector} from "react-redux";
import {dispatchSocketId} from "@store_toolkit/clientReducers/userReducers/userReducer";
import {setOnlineUsers, setMessages, newMessage} from '@store_toolkit/clientReducers/chatroomReducer';
import {wrapper} from "@store_toolkit/store";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Chatroom, Store} from "typescript-types";
import {uniqArrayBy} from 'custom-util'
import styled from "styled-components";
import {clientAPIRequestGetChatroom} from "api-requests";
import dynamic from "next/dynamic";
import ChatroomTopbar from "@components/pagesIncludes/chatroom/ChatroomTopbar";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import Csr from "@components/global/commonComponents/Csr";
import headerSizeCalculator from "custom-util/src/vanilla-ui-utils/headerSizeCalculator";
import {loading} from "@store_toolkit/clientReducers/globalStateReducer";

const Soft404 = dynamic(() => import('@components/includes/Soft404/Soft404'))

interface StylePropTypes {
    userList: boolean;
    isMaximized: boolean;
}

const Style = styled.div<StylePropTypes>`
  ${({isMaximized}) =>
          isMaximized ? `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 11;
  ` : ''}

  width: 100%;
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-template-rows: 45px 1fr;
  grid-template-areas:
    'chatroomTopbar chatroomTopbar'
    'chatroomMessagingArea ${({userList}: StylePropTypes) => userList ? 'chatroomOnlineUsersList' : 'chatroomMessagingArea'}';
`;

interface PropTypes {
    pageData: {
        chatroom: Chatroom,
        chatrooms: { name: string, _id: string }[]
    }
}

const chatRoom: FC<PropTypes> = ({pageData}) => {
    const [autoScroll, setAutoScroll] = useState(true);
    const messageAreaRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const user = useSelector((store: Store) => store.user);
    const [onlineUserListVisibility, setOnlineUserListVisibility] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [headerSize, setHeaderSize] = useState(0);
    const {isMaximized} = useSelector(({chatroom}: Store) => chatroom);

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
    }, [pageData?.chatroom?._id, pageData?.chatroom, user.loggedIn]);

    useEffect(() => {
        const handleUserListUpdated = (chatroomOnlineUsers: { username: string }[]) => {
            dispatch(setOnlineUsers(uniqArrayBy(chatroomOnlineUsers, 'username')));
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
            dispatch(setOnlineUsers(uniqArrayBy(data.onlineUsersList, 'username')));
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
                if (messageAreaRef.current){
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

        if (typeof window !== 'undefined'){
            if (window.innerWidth > 768){
                setOnlineUserListVisibility(true);
            }
            setHeaderSize(headerSizeCalculator()+ 90)
        }

        return () => {
            socket.off('userListUpdated', handleUserListUpdated);
            socket.off('messageFromChatroom', handleMessageFromChatroom);
            socket.off('JoinSocketAndGetInitialData', handleJoinSocketAndGetInitialData);
            socket.off('olderMessagesLoaded', handleOlderMessagesLoaded);
        };

    }, []);

    if (!pageData?.chatroom?._id) {
        return <Soft404/>;
    }

    return (
        <Csr>
            <Style
                id={"full-width-content"}
                userList={onlineUserListVisibility}
                isMaximized={isMaximized}
            >
                <HeadSetter
                    title={pageData?.chatroom.name}
                    description={pageData?.chatroom.description}
                    keywords={pageData?.chatroom.tags}
                />
                <ChatroomTopbar
                    chatrooms={pageData?.chatrooms}
                    chatroomId={pageData?.chatroom?._id}
                    setAutoScroll={setAutoScroll}
                    autoScroll={autoScroll}
                    onlineUserListVisibility={onlineUserListVisibility}
                    onOnlineUserListVisibilityChangeHandler={() =>
                        setOnlineUserListVisibility(!onlineUserListVisibility)
                    }
                />

                <ChatRoomMessageArea
                    chatroomId={pageData?.chatroom?._id}
                    messageAreaRef={messageAreaRef}
                    autoScroll={autoScroll}
                    setAutoScroll={setAutoScroll}
                    headerSize={headerSize}
                />

                <ChatRoomTools chatroomId={pageData?.chatroom?._id}/>
                {onlineUserListVisibility && <ChatRoomOnlineUsersList/>}
            </Style>
        </Csr>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [],
        {
            setHeadData: true,
            page: 'chatroom'
        },
        store
    )

    const chatroomData = await clientAPIRequestGetChatroom(context.query.Identifier as string)

    return {
        props: {
            pageData: {
                chatroom: chatroomData?.data?.chatroom || null,
                chatrooms: chatroomData?.data?.chatrooms || null,
            }
        }
    }
})


export default chatRoom;









