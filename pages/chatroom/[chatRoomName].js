import React, {useEffect, useState, useContext, useRef} from 'react';
import socket from '../../_variables/socket';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {useRouter} from "next/router";
import {AppContext} from "../../context/AppContext";
import ChatRoomHeader from "../../components/includes/chatroomComponents/ChatRoomHeader/ChatRoomHeader";
import ChatRoomMessageArea from "../../components/includes/chatroomComponents/ChatRoomMessageArea/ChatRoomMessageArea";
import ChatRoomTools from "../../components/includes/chatroomComponents/ChatRoomTools/ChatRoomTools";
import ChatRoomOnlineUsersList from "../../components/includes/chatroomComponents/ChatRoomOnlineUsersList/ChatRoomOnlineUsersList";
import ChatRoomMessageUserInfoPopup from "../../components/includes/chatroomComponents/ChatRoomMessageArea/ChatRoomMessageUserInfoPopup";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import _ from 'lodash'


const chatRoom = props => {
    const messageAreaRef = useRef(null)
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        onlineUserListVisibility: false,
        userInfo: {}
    });
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isJoined, setIsJoined] = useState(false)
    const router = useRouter()

    const onUserInfoShowHandler = (username, userId, profileImage) => {
        state.userInfo.username ? setState({...state, userInfo: {}}) : setState({...state, userInfo: {username, userId, profileImage}})
    }

    const onOnlineUserListVisibilityChangeHandler = () => {
        state.onlineUserListVisibility ?
            setState({...state, onlineUserListVisibility: false}) :
            setState({...state, onlineUserListVisibility: true})
    }
    const onEmojiPickerHandler = () => {
        state.emojiPicker ?
            setState({...state, emojiPicker: false}) :
            setState({...state, emojiPicker: true})
    }


    useEffect(() => {
        if (contextData.userData._id) {
            setOnlineUsers(onlineUsers => [
                ...onlineUsers,
                {username: contextData.userData.username, userId: contextData.userData._id, profileImage: contextData.userData.profileImage}
            ])
        }

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

    const scrollToBottomOfConversationBox = () => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scroll({
                top: messageAreaRef.current.scrollHeight,
                // behavior: "smooth"
            })
        }
    }

    useEffect(() => {
        socket.on('getChatroomMemberData', async (roomName, username, userId, profileImage) => {
            username && userId && profileImage ? setOnlineUsers(onlineUsers => [...onlineUsers.filter(ou => ou.userId !== userId), {username, userId, profileImage}]) : null
        })

        socket.on('message', newMessageData => {
            setMessages(messages => messages.length>100 ? [...messages.shift(), newMessageData] : [...messages, newMessageData])
        })

        socket.on('recentMessageOnTheRoom',chatroomMessages=>{
            setMessages(messages => [...chatroomMessages])
        })

        socket.on('getMyDataAndShareYourData', (receiverSocketId, username, userId, profileImage) => {


            if (username){
                const userJoined = {
                    messageData: username +' joined to the room ',
                    username,
                    userId,
                    createdAt: Date.now(),
                    profileImage,
                    type:'log'
                }
                setMessages(messages => [...messages, userJoined])
            }

            // if (messages.length>100){
            //     setMessages(messages => [...messages.shift(), userJoined])
            // }else{
            //     setMessages(messages => [...messages, userJoined])
            // }

            username && userId && profileImage ? setOnlineUsers(onlineUsers => [...onlineUsers.filter(ou => ou.userId !== userId), {username, userId, profileImage}]) : null
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
            <ChatRoomHeader onOnlineUserListVisibilityChangeHandler={onOnlineUserListVisibilityChangeHandler}/>
            <ChatRoomMessageArea
                onlineUsers={onlineUsers}
                messages={messages}
                messageAreaRef={messageAreaRef}
                emojiPicker={state.emojiPicker}
                onUserInfoShowHandler={onUserInfoShowHandler}/>
            <ChatRoomTools onEmojiPickerHandler={onEmojiPickerHandler}/>
            <ChatRoomOnlineUsersList
                onlineUsers={onlineUsers}
                onlineUserListVisibility={state.onlineUserListVisibility}
                onUserInfoShowHandler={onUserInfoShowHandler}/>
            <ChatRoomMessageUserInfoPopup userInfo={state.userInfo} onUserInfoShowHandler={onUserInfoShowHandler}/>

        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], 'chatRoomPage')

    return {props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            widgets:firstLoadData?.widgets || [],
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            requestProtocol: context.req.protocol
    }}
}

export default chatRoom;
