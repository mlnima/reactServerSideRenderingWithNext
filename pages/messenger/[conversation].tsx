import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import MessengerConversationHeader
    from "@components/includes/messengerPageComponents/MessengerConversationHeader/MessengerConversationHeader";
import MessengerConversationMessageArea
    from "@components/includes/messengerPageComponents/MessengerConversationMessageArea/MessengerConversationMessageArea";
import MessengerConversationMessageTools
    from "@components/includes/messengerPageComponents/MessengerConversationMessageTools/MessengerConversationMessageTools";
import {socket} from '@_variables/socket';
import MessengerCall from "@components/includes/messengerPageComponents/MessengerCall/MessengerCall";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";


import {
    // answerTheCall,
    endCall, fetchAnswerTheCall,
    fetchConversation, fetchOutgoingCall,
    incomingCall,
    newMessageInConversation,
    // outgoingCall,
    setPartnerVideo,
} from "@store_toolkit/clientReducers/userReducer";
import MessengerLayout from "@components/layouts/MessengerLayout";
import type {ReactElement} from 'react';
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";


const conversation = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const userData = useSelector((store: StoreTypes) => store.user.userData);
    const callData = useSelector((store: StoreTypes) => store.user.callData);
    const users = useSelector((store: StoreTypes) => store.user.activeConversation?.users);
    const [connectedUserData, setConnectedUserData] = useState({
        profileImage: undefined
    });
    const [messageState, setMessageState] = useState({messageBody: ''})
    const [mySocketId, setMySocketId] = useState("")

    useEffect(() => {
        if (localStorage.wt) {
            dispatch(fetchConversation({_id: router.query.conversation as string, loadAmount: -20}))
        }
    }, []);

    useEffect(() => {
        const connectedUser = users ? users.find(user => user._id !== userData?._id) : {}
        if (connectedUser) {
            // @ts-ignore
            setConnectedUserData(connectedUser)
        }
    }, [users]);

    useEffect(() => {
        socket.on('receiveMessageFromConversation', (messageData: { conversationId: string }) => {
            if (messageData.conversationId === router.query.conversation) {
                dispatch(newMessageInConversation(messageData))
            }
        })
        socket.emit('joinConversation', router.query.conversation)
        socket.on("mySocketId", (id: string) => {
            setMySocketId(id)
        })
        socket.on("incomingCallFromConversation", (data: { callerId: any; callerName: any; userStream: any; }) => {
            dispatch(incomingCall(data))
        })
    }, []);

    const callUser = async () => {
        try {
            // @ts-ignore
            dispatch(fetchOutgoingCall(router.query.conversation, mySocketId, userData?.username, router))
        } catch (err) {

        }
    }

    const answerCall = async () => {
        dispatch(fetchAnswerTheCall({
            myVideo: callData.myVideo,
            conversation: router.query.conversation as string,
            callerSignal: callData?.callerSignal,
            router
        }))
    }

    const endCallHandler = () => {
        socket.emit("endCall", router.query.conversation)
        dispatch(endCall(null))
    }

    return (
        <div className='messenger main'>
            <MessengerConversationHeader
                // @ts-ignore
                callUser={callUser}
                profileImage={connectedUserData.profileImage}
                // @ts-ignore
                username={connectedUserData.username}
                // @ts-ignore
                connectedUserId={connectedUserData._id}/>
            <MessengerConversationMessageArea
                // @ts-ignore
                userData={userData}
                connectedUserData={connectedUserData}
                // setConnectedUserData={setConnectedUserData}
            />
            <MessengerConversationMessageTools
                setMessageState={setMessageState}
                messageState={messageState}
                connectedUserData={connectedUserData}
                conversationId={router.query.conversation}
            />
            {/* @ts-ignore */}
            <MessengerCall
                answerCall={answerCall}
                callAccepted={callData?.callAccepted}
                endCallHandler={endCallHandler}
            />

        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [],
        {
            setHeadData: true,
            page: 'messenger'
        },
        store
    )
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

conversation.getLayout = function getLayout(page: ReactElement) {

    return (
        <MessengerLayout>
            {page}
        </MessengerLayout>
    )
}
export default conversation;
