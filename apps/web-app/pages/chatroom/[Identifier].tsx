import React, {FC, useEffect, useState} from 'react';
import {socket} from 'custom-util/src/socket-utils/socketIoClient';
import ChatRoomMessageArea from "@components/pagesIncludes/chatroom/ChatRoomMessageArea/ChatRoomMessageArea";
import ChatRoomTools from "@components/pagesIncludes/chatroom/ChatRoomTools/ChatRoomTools";
import ChatRoomOnlineUsersList
    from "@components/pagesIncludes/chatroom/ChatRoomOnlineUsersList/ChatRoomOnlineUsersList";
import {useSelector} from "react-redux";
import {dispatchSocketId} from "@store_toolkit/clientReducers/userReducer";
import {setOnlineUsers, setMessages, newMessage} from '@store_toolkit/clientReducers/chatroomReducer';
import {wrapper} from "@store_toolkit/store";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Chatroom, Store} from "typescript-types";
import {uniqArrayBy} from 'custom-util'
import styled from "styled-components";
import getChatroom from "api-requests/src/client/chatrooms/getChatroom";
import dynamic from "next/dynamic";
import ChatroomTopbar from "@components/pagesIncludes/chatroom/ChatroomTopbar";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
const Soft404 = dynamic(() => import('@components/includes/Soft404/Soft404'))

const Style = styled.div`

  ${({isMaximized}) => isMaximized ? `
      position: fixed;
      top: 0;
      left: 0;
      right:0;
      bottom: 0;
      z-index: 11;
  ` : ''}
  
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 150px;

  grid-template-rows: 45px 1fr;
  grid-template-areas:  'chatroomTopbar chatroomTopbar'
                        'chatroomMessagingArea ${({userList}: StylePropTypes) => userList ? 'chatroomOnlineUsersList' : 'chatroomMessagingArea'}';

`

interface StylePropTypes {
    userList: boolean,
    isMaximized: boolean,
}

interface PropTypes {
    pageData: {
        chatroom: Chatroom,
        chatrooms: { name: string, _id: string }[]
    }
}

const chatRoom: FC<PropTypes> = ({pageData}) => {
    const dispatch = useAppDispatch()
    const user = useSelector((store: Store) => store.user)
    const [onlineUserListVisibility, setOnlineUserListVisibility] = useState(false)
    const [isJoined, setIsJoined] = useState(false)
    const [headerSize, setHeaderSize] = useState(0)
    const isMaximized = useSelector(({chatroom}: Store) => chatroom.isMaximized)

    useEffect(() => {
        if (!!pageData?.chatroom?._id && user.loggedIn && !isJoined && !!user.socketId) {
                setIsJoined(true)
                const userDataForJoiningRoom = {
                    chatroomId: pageData?.chatroom?._id,
                    author: {
                        _id: user.userData?._id,
                        username: user.userData?.username,
                        profileImage: user.userData?.profileImage,
                    },
                    socketId: user.socketId
                }
                socket.emit('joinUserToTheRoom', userDataForJoiningRoom)
        }
    }, [user.loggedIn, pageData?.chatroom?._id,user.socketId]);

    useEffect(() => {
        if (pageData?.chatroom?._id) {
            setTimeout(() => {
                socket.emit('JoinSocketAndGetInitialData', {chatroomId: pageData?.chatroom?._id})
            }, 50)
        }
    }, [pageData?.chatroom?._id, pageData?.chatroom, user.loggedIn]);

    useEffect(() => {
        socket.on('userListUpdated', (chatroomOnlineUsers: { username: string }[]) => {
            dispatch(setOnlineUsers(uniqArrayBy(chatroomOnlineUsers, 'username')))
        })

        socket.on('messageFromChatroom', (newMessageData: object) => {
            dispatch(newMessage(newMessageData))
        })

        socket.on('JoinSocketAndGetInitialData', (data: { socketId: string, recentChatRoomMessages: {}[], onlineUsersList: {}[] }) => {
            dispatch(dispatchSocketId(data.socketId))
            dispatch(setOnlineUsers(uniqArrayBy(data.onlineUsersList, 'username')))
            dispatch(setMessages(data?.recentChatRoomMessages))
        })
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (window.innerWidth > 768) {
                setOnlineUserListVisibility(true)
            }
            //calculating available space for chat area
            //@ts-ignore
            const topbarHeight = document.querySelector('.topbar')?.offsetHeight;
            //@ts-ignore
            const headerHeight = document.querySelector('.header')?.offsetHeight;
            //@ts-ignore
            const navigationHeight = document.querySelector('.navigation')?.offsetHeight;
            setHeaderSize(topbarHeight + headerHeight + navigationHeight + 90)
        }, 100)
    }, []);

    if (pageData?.chatroom?._id) {
        return (
            <Style id={'full-width-content'} userList={onlineUserListVisibility} isMaximized={isMaximized}>
                <HeadSetter title={pageData?.chatroom.name} description={pageData?.chatroom.description} keywords={pageData?.chatroom.tags}/>
                <ChatroomTopbar chatrooms={pageData?.chatrooms}
                                chatroomId={pageData?.chatroom?._id}
                                onlineUserListVisibility={onlineUserListVisibility}
                                onOnlineUserListVisibilityChangeHandler={() => setOnlineUserListVisibility(!onlineUserListVisibility)}/>
                <ChatRoomMessageArea chatroomId={pageData?.chatroom?._id} headerSize={headerSize}/>
                <ChatRoomTools chatroomId={pageData?.chatroom?._id}/>
                {onlineUserListVisibility && <ChatRoomOnlineUsersList/>}
            </Style>
        );
    } else {
        return <Soft404/>
    }


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

    const chatroomData = await getChatroom(context.query.Identifier as string)

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
