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
        onlineUserListVisibility: true,
        userInfo: {}
    });
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isJoined, setIsJoined] = useState(false)
    const [socketId, setSocketId] = useState(null)
    const router = useRouter()

    const onUserInfoShowHandler = (username, userId, profileImage) => {
            state.userInfo.username ?
            setState({...state, userInfo: {}}) :
            setState({...state, userInfo: {username, userId, profileImage}})
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
                {username: contextData.userData.username, userId: contextData.userData._id, profileImage: contextData.userData.profileImage,socketId}
            ])
        }

        if (router.query.chatRoomName && contextData.userData.username && contextData.userData._id && !isJoined && socketId) {
            setIsJoined(true)
            const userData = {
                chatRoomName:router.query.chatRoomName,
                username:contextData.userData.username,
                id:contextData.userData._id,
                profileImage:contextData.userData.profileImage,
                socketId
            }
            socket.emit('joinSocketToTheRoom',userData)
        }

    }, [contextData.userData._id,socketId]);

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

        socket.emit('onlineUsersList')
        socket.emit('mySocketId')

        socket.on('onlineUsersList', chatroomOnlineUsers => {

            setOnlineUsers(() =>  _.uniqBy(chatroomOnlineUsers,  e => e.username) )
        })

        socket.on('mySocketId', socketId => {
            setSocketId(()=>socketId)
        })

        socket.on('userListUpdated', chatroomOnlineUsers => {
            setOnlineUsers(() => _.uniqBy(chatroomOnlineUsers,  e => e.username))
        })

        socket.on('message', newMessageData => {
            setMessages(messages => messages.length>100 ? [...messages.shift(), newMessageData] : [...messages, newMessageData])
        })

        socket.on('recentMessageOnTheRoom',chatroomMessages=>{

            setMessages(() => chatroomMessages)
        })
    }, []);




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
