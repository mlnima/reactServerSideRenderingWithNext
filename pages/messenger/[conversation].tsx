import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import MessengerConversationHeader from "../../components/includes/messengerPageComponents/MessengerConversationHeader/MessengerConversationHeader";
import MessengerConversationMessageArea from "../../components/includes/messengerPageComponents/MessengerConversationMessageArea/MessengerConversationMessageArea";
import MessengerConversationMessageTools from "../../components/includes/messengerPageComponents/MessengerConversationMessageTools/MessengerConversationMessageTools";
import {socket} from '@_variables/socket';
import MessengerCall from "../../components/includes/messengerPageComponents/MessengerCall/MessengerCall";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "@_variables/TypeScriptTypes/ClientPagesTypes";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "@store/store";
// @ts-ignore
import {
        answerTheCall,
        endCall,
        getConversation,
        incomingCall,
        newMessageInConversation,
        outgoingCall,
        setPartnerVideo,
       } from "@store/clientActions/userActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";

const conversation = (props: ClientPagesTypes) => {
    const dispatch = useDispatch()
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
            dispatch(getConversation(router.query.conversation, -20))
        }
    }, [props]);

    useEffect(() => {
        const connectedUser = users ?  users.find(user => user._id !== userData?._id) : {}
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
            dispatch(outgoingCall(router.query.conversation,mySocketId,userData?.username,router))
        } catch (err) {

        }
    }

    const answerCall = async () => {
        dispatch(answerTheCall(callData.myVideo,router.query.conversation,callData?.callerSignal,router))
    }

    const endCallHandler = () => {
        socket.emit("endCall", router.query.conversation)
        dispatch(endCall())
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
    await store.dispatch(getDefaultPageData(context, [],
        {
            setHeadData:true,
            page:'messenger'
        }
    ))
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

export default conversation;
