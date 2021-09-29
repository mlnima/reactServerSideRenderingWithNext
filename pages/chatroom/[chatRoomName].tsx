import React, {useEffect, useState, useRef} from 'react';
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
import _ from 'lodash'
import {useDispatch, useSelector} from "react-redux";
import {dispatchSocketId} from "../../store/actions/userActions";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";

const chatRoom = (props:ClientPagesTypes) => {
    const messageAreaRef = useRef(null)
    const dispatch = useDispatch()

    // @ts-ignore
    const user = useSelector(state => state.user)

    const [state, setState] = useState({
        onlineUserListVisibility: false,
        userInfo: {}
    });

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isJoined, setIsJoined] = useState(false)
    const router = useRouter()
// @ts-ignore
    const onUserInfoShowHandler = (username, userId, profileImage) => {
        // @ts-ignore
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
        // @ts-ignore
        state.emojiPicker ?
            // @ts-ignore
            setState({...state, emojiPicker: false}) :
            // @ts-ignore
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

        if (router.query.chatRoomName && user.userData.username && user.userData._id && !isJoined && user.socketId) {
            setIsJoined(true)
            const userDataForJoiningRoom = {
                chatRoomName: router.query.chatRoomName,
                username: user.userData.username,
                id: user.userData._id,
                profileImage:user.userData.profileImage,
                socketId : user.socketId
            }

            socket.emit('joinUserToTheRoom', userDataForJoiningRoom)
        }

    }, [user.userData._id, user.socketId]);


    useEffect(() => {

        socket.emit('socketId')
        socket.emit('onlineUsersList')
        socket.emit('recentChatRoomMessages',router.query.chatRoomName)
        socket.emit('joinSocketToTheChatroom',router.query.chatRoomName)


        socket.on('socketId', (socketId:string) => {
            dispatch(dispatchSocketId(socketId))
        })

        socket.on('onlineUsersList', (chatroomOnlineUsers:object[]) => {
            setOnlineUsers(() => _.uniqBy(chatroomOnlineUsers, (e:{username:string}) => e.username))
        })

        socket.on('recentChatRoomMessages', (chatroomMessages:object[]) => {
            // @ts-ignore
            setMessages(() => chatroomMessages)
        })


        socket.on('userListUpdated', (chatroomOnlineUsers:object[]) => {
            setOnlineUsers(() => _.uniqBy(chatroomOnlineUsers,  (e:{username:string}) => e.username))
        })


        socket.on('messageFromChatroom', (newMessageData:object) => {
            console.log(newMessageData)
            // @ts-ignore
            setMessages(messages => messages.length > 100 ? [...messages, newMessageData] : [...messages, newMessageData])
        })

    }, []);

    const scrollToBottomOfConversationBox = () => {
        if (messageAreaRef.current) {
            // @ts-ignore
            messageAreaRef.current.scroll({
                // @ts-ignore
                top: messageAreaRef.current.scrollHeight,
                // behavior: "smooth"
            })
        }
    }



    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <ChatRoomHeader onOnlineUserListVisibilityChangeHandler={onOnlineUserListVisibilityChangeHandler}/>
            <ChatRoomMessageArea
                // @ts-ignore
                onlineUsers={onlineUsers}
                messages={messages}
                messageAreaRef={messageAreaRef}
                // @ts-ignore
                emojiPicker={state.emojiPicker}
                onUserInfoShowHandler={onUserInfoShowHandler}/>

            <ChatRoomTools />
            <ChatRoomOnlineUsersList
                onlineUsers={onlineUsers}
                onlineUserListVisibility={state.onlineUserListVisibility}
                onUserInfoShowHandler={onUserInfoShowHandler}/>
            <ChatRoomMessageUserInfoPopup userInfo={state.userInfo} onUserInfoShowHandler={onUserInfoShowHandler}/>

        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], store)

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
            ...firstLoadData
        }
    }
})

export default chatRoom;
