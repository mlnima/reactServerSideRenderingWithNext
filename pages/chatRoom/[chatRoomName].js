import React, {useEffect, useLayoutEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {useRouter} from "next/router";
import {AppContext} from "../../context/AppContext";
import ChatRoomHeader from "../../components/includes/chatroomComponents/ChatRoomHeader/ChatRoomHeader";
import ChatRoomMessageArea from "../../components/includes/chatroomComponents/ChatRoomMessageArea/ChatRoomMessageArea";
import ChatRoomTools from "../../components/includes/chatroomComponents/ChatRoomTools/ChatRoomTools";
import ChatRoomOnlineUsersList from "../../components/includes/chatroomComponents/ChatRoomOnlineUsersList/ChatRoomOnlineUsersList";
import socket from '../../_variables/socket';

const chatRoom = props => {
    const messageAreaRef = useRef(null)
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        messages: []
    });
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isJoined, setIsJoined] = useState(false)
    const router = useRouter()

    useEffect(() => {
        joinSocketToTheRoom().then(() => {
            socket.emit('joinSocketToTheRoom',
                router.query.chatRoomName,
                contextData.userData.username,
                contextData.userData._id,
                contextData.userData.profileImage
            )
        })
    }, [contextData.userData._id]);

    useEffect(() => {
        scrollToBottomOfConversationBox()
    }, [messages]);

    const scrollToBottomOfConversationBox = ()=>{
        if (messageAreaRef.current){
            messageAreaRef.current.scroll({
                top:messageAreaRef.current.scrollHeight
            })
        }
    }

    useEffect(() => {
        socket.on('getChatroomMemberData', async (roomName, username, userId, profileImage) => {
            username && userId && profileImage ?  setOnlineUsers(onlineUsers => [...onlineUsers.filter(ou=>ou.userId !== userId), {username, userId, profileImage}]) :null
        })

        socket.on('message', (messageData, username, id, profileImage) => {
            const newMessageContent = {
                messageData,
                username,
                id,
                createdAt: Date.now(),
                profileImage
            }

            setMessages(messages => [...messages, newMessageContent])
        })


        socket.on('getMyDataAndShareYourData', (receiverSocketId, username, userId, profileImage) => {
            username && userId && profileImage ?  setOnlineUsers(onlineUsers => [...onlineUsers.filter(ou=>ou.userId !== userId), {username, userId, profileImage}]) :null
            socket.emit('myDataIs', receiverSocketId, router.query.chatRoomName, contextData.userData.username, contextData.userData._id, contextData.userData.profileImage)

        })
    }, []);


    const joinSocketToTheRoom = async () => {
        setTimeout(() => {
            if (router.query.chatRoomName && contextData.userData.username && contextData.userData._id && !isJoined) {
                setIsJoined(true)
                return Promise.resolve(isJoined === true)
            }
        }, 1000)

    }

    return (
        <div>
            <ChatRoomHeader/>
            <ChatRoomMessageArea onlineUsers={onlineUsers} messages={messages} messageAreaRef={messageAreaRef}/>
            <ChatRoomTools/>
            <ChatRoomOnlineUsersList onlineUsers={onlineUsers}/>

        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], 'chatRoomPage')
    const widgets = firstLoadData.widgets
    return {props: {widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: context.req.protocol}}
}

export default chatRoom;
