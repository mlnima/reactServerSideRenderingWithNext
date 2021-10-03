import React, {useEffect, useState} from 'react';
import socket from '../../_variables/socket';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {useRouter} from "next/router";
import ChatRoomHeader from "../../components/includes/chatroomComponents/ChatRoomHeader/ChatRoomHeader";
import ChatRoomMessageArea from "../../components/includes/chatroomComponents/ChatRoomMessageArea/ChatRoomMessageArea";
import ChatRoomTools from "../../components/includes/chatroomComponents/ChatRoomTools/ChatRoomTools";
import ChatRoomOnlineUsersList from "../../components/includes/chatroomComponents/ChatRoomOnlineUsersList/ChatRoomOnlineUsersList";
import ChatRoomMessageUserInfoPopup from "../../components/includes/chatroomComponents/ChatRoomMessageArea/ChatRoomMessageUserInfoPopup";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
// @ts-ignore
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import {dispatchSocketId} from "../../store/actions/userActions";
import {setChatroomUsers, setChatroomMessages, newMessage} from '../../store/actions/chatroomActions';
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";

const chatRoom = (props: ClientPagesTypes) => {
    const dispatch = useDispatch()
    // @ts-ignore
    const user = useSelector(state => state.user)
    const [onlineUserListVisibility, setOnlineUserListVisibility] = useState(true)
    const [isJoined, setIsJoined] = useState(false)
    const router = useRouter()

    const onOnlineUserListVisibilityChangeHandler = () => {
        onlineUserListVisibility ?
            setOnlineUserListVisibility(false) :
            setOnlineUserListVisibility(true)
    }

    useEffect(() => {

        if (
            router.query.chatRoomName &&
            user.userData.username &&
            user.userData._id &&
            !isJoined &&
            user.socketId
        ) {
            setIsJoined(true)
            const userDataForJoiningRoom = {
                chatRoomName: router.query.chatRoomName,
                username: user.userData.username,
                id: user.userData._id,
                profileImage: user.userData.profileImage,
                socketId: user.socketId
            }
            socket.emit('joinUserToTheRoom', userDataForJoiningRoom)
        }

    }, [user.userData._id, user.socketId]);


    useEffect(() => {

        socket.emit('socketId')
        socket.emit('onlineUsersList')
        socket.emit('recentChatRoomMessages', router.query.chatRoomName)
        socket.emit('joinSocketToTheChatroom', router.query.chatRoomName)

        socket.on('socketId', (socketId: string) => {
            dispatch(dispatchSocketId(socketId))
        })

        socket.on('onlineUsersList', (chatroomOnlineUsers: object[]) => {
            dispatch(setChatroomUsers(_.uniqBy(chatroomOnlineUsers, (e: { username: string }) => e.username)))
        })

        socket.on('recentChatRoomMessages', (chatroomMessages: object[]) => {
            dispatch(setChatroomMessages(chatroomMessages))
        })

        socket.on('userListUpdated', (chatroomOnlineUsers: object[]) => {
            dispatch(setChatroomUsers(_.uniqBy(chatroomOnlineUsers, (e: { username: string }) => e.username)))
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
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], store)

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData
        }
    }
})

export default chatRoom;
