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
        scrollToBottomOfConversationBox()
    }, [messages]);





    useEffect(() => {
        // if (contextData.userData._id) {
        //     setOnlineUsers(onlineUsers => [
        //         ...onlineUsers,
        //         {username: contextData.userData.username, userId: contextData.userData._id, profileImage: contextData.userData.profileImage, socketId}
        //     ])
        // }

        if (router.query.chatRoomName && contextData.userData.username && contextData.userData._id && !isJoined && contextData.userData.socketId) {
            setIsJoined(true)
            const userData = {
                chatRoomName: router.query.chatRoomName,
                username: contextData.userData.username,
                id: contextData.userData._id,
                profileImage: contextData.userData.profileImage,
                socketId : contextData.userData.socketId
            }

            socket.emit('joinUserToTheRoom', userData)
        }

    }, [contextData.userData._id, contextData.userData.socketId]);


    useEffect(() => {
        console.log(socket)
        socket.emit('socketId')
        socket.emit('onlineUsersList')
        socket.emit('recentChatRoomMessages',router.query.chatRoomName)
        socket.emit('joinSocketToTheChatroom',router.query.chatRoomName)


        socket.on('socketId', socketId => {
            contextData.dispatchUserData(prevUserData=>({
                ...prevUserData,
                socketId
            }))
        })

        socket.on('onlineUsersList', chatroomOnlineUsers => {
            setOnlineUsers(() => _.uniqBy(chatroomOnlineUsers, e => e.username))
        })

        socket.on('recentChatRoomMessages', chatroomMessages => {
            setMessages(() => chatroomMessages)
        })


        socket.on('userListUpdated', chatroomOnlineUsers => {
            setOnlineUsers(() => _.uniqBy(chatroomOnlineUsers, e => e.username))
        })

        socket.on('messageFromChatroom', newMessageData => {
            setMessages(messages => messages.length > 100 ? [...messages.shift(), newMessageData] : [...messages, newMessageData])
        })

    }, []);

    const scrollToBottomOfConversationBox = () => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scroll({
                top: messageAreaRef.current.scrollHeight,
                // behavior: "smooth"
            })
        }
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

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets: firstLoadData?.widgets || [],
            identity:firstLoadData.identity,
            design:firstLoadData.design,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            requestProtocol: context.req.protocol
        }
    }
}

export default chatRoom;
