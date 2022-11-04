import React, {useEffect, useState} from 'react';
import {socket} from '@_variables/socket';
import {useRouter} from "next/router";
import ChatRoomHeader from "../../components/includes/chatroomComponents/ChatRoomHeader/ChatRoomHeader";
import ChatRoomMessageArea from "../../components/includes/chatroomComponents/ChatRoomMessageArea/ChatRoomMessageArea";
import ChatRoomTools from "../../components/includes/chatroomComponents/ChatRoomTools/ChatRoomTools";
import ChatRoomOnlineUsersList
    from "../../components/includes/chatroomComponents/ChatRoomOnlineUsersList/ChatRoomOnlineUsersList";
import ChatRoomMessageUserInfoPopup
    from "../../components/includes/chatroomComponents/ChatRoomMessageArea/ChatRoomMessageUserInfoPopup";
import {useSelector} from "react-redux";
import {dispatchSocketId} from "../../store_toolkit/clientReducers/userReducer";
import {setOnlineUsers,setMessages,  newMessage} from '../../store_toolkit/clientReducers/chatroomReducer';
import {wrapper} from "../../store_toolkit/store";
import {useAppDispatch} from "../../store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import {uniqArrayBy} from 'custom-util'

const chatRoom = () => {
    const dispatch = useAppDispatch()
    const user = useSelector((store: Store) => store.user)
    const [onlineUserListVisibility, setOnlineUserListVisibility] = useState(false)
    const [isJoined, setIsJoined] = useState(false)
    const {query} = useRouter()

    const onOnlineUserListVisibilityChangeHandler = () => {
        onlineUserListVisibility ?
            setOnlineUserListVisibility(false) :
            setOnlineUserListVisibility(true)
    }

    useEffect(() => {

        if (
            query.chatRoomName &&
            user.userData?.username &&
            user.userData._id &&
            !isJoined &&
            user.socketId
        ) {
            setIsJoined(true)
            const userDataForJoiningRoom = {
                chatRoomName: query.chatRoomName,
                username: user.userData.username,
                id: user.userData._id,
                profileImage: user.userData.profileImage,
                socketId: user.socketId
            }
            socket.emit('joinUserToTheRoom', userDataForJoiningRoom)
        }

    }, [user.userData?._id, user.socketId]);

    useEffect(() => {

        socket.emit('socketId')
        socket.emit('onlineUsersList')
        socket.emit('recentChatRoomMessages', query.chatRoomName)
        socket.emit('joinSocketToTheChatroom', query.chatRoomName)

        socket.on('socketId', (socketId: string) => {
            dispatch(dispatchSocketId(socketId))
        })

        socket.on('onlineUsersList', (chatroomOnlineUsers: { username: string }[]) => {
            dispatch(setOnlineUsers(uniqArrayBy(chatroomOnlineUsers, 'username')))
        })

        socket.on('recentChatRoomMessages', (chatroomMessages: object[]) => {
            dispatch(setMessages(chatroomMessages))
        })

        socket.on('userListUpdated', (chatroomOnlineUsers: { username: string }[]) => {
            dispatch(setOnlineUsers(uniqArrayBy(chatroomOnlineUsers, 'username')))
        })

        socket.on('messageFromChatroom', (newMessageData: object) => {
            dispatch(newMessage(newMessageData))
        })

    }, []);

    return (
        <div>
            <ChatRoomHeader onOnlineUserListVisibilityChangeHandler={onOnlineUserListVisibilityChangeHandler}/>
            <ChatRoomMessageArea/>
            <ChatRoomTools/>
            {
                onlineUserListVisibility ?
                    <ChatRoomOnlineUsersList/> :
                    null
            }
            <ChatRoomMessageUserInfoPopup/>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await  _getServerSideStaticPageData(
        context,
        [],
        {
            setHeadData: true,
            page: 'chatroom'
        },
        store
    )

    return null
})


export default chatRoom;
