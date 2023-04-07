import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import MessengerConversationHeader
    from "../../components/includes/messengerPageComponents/MessengerConversationHeader/MessengerConversationHeader";
import MessengerConversationMessageArea
    from "@components/includes/messengerPageComponents/MessengerConversationMessageArea/MessengerConversationMessageArea";
import MessengerConversationMessageTools
    from "@components/includes/messengerPageComponents/MessengerConversationMessageTools/MessengerConversationMessageTools";
import {socket} from 'custom-util/src/socket-utils/socketIoClient';
// import MessengerCall from "@components/includes/messengerPageComponents/MessengerCall/MessengerCall";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import {
    endCall,
    incomingCall,
    newMessageInConversation,
} from "@store_toolkit/clientReducers/userReducers/userReducer";

import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import styled from "styled-components";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {getConversationAction} from "@store_toolkit/clientReducers/userReducers/getConversationAction";
import {
    outgoingCallAction
} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/outgoingCallAction";
import {
    answerTheCallAction
} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/answerTheCallAction";
import {he} from "date-fns/locale";

const Style = styled.div`
  //position: relative;
  //height: 80vh;

  width: 100%;
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-template-rows: 45px 1fr;
  grid-template-areas:
    'conversationTopbar conversationTopbar'
    'conversationMessageArea conversationMessageArea';
`

const conversation = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const userData = useSelector((store: Store) => store.user.userData);
    const callData = useSelector((store: Store) => store.user.callData);
    const users = useSelector((store: Store) => store.user.activeConversation?.users);
    const [headerSize, setHeaderSize] = useState(0)
    const [connectedUserData, setConnectedUserData] = useState({
        profileImage: '',
        username:''
    });
    const [messageState, setMessageState] = useState({messageBody: ''})
    const [mySocketId, setMySocketId] = useState("")

    useEffect(() => {
        setTimeout(() => {
            const connectedUser = users ? users.find(user => user._id !== userData?._id) : {}
            if (connectedUser) {
                // @ts-ignore
                setConnectedUserData(connectedUser)
            }
        }, 500)


    }, [users]);

    // useEffect(() => {
    //     console.log(connectedUserData)
    // }, [connectedUserData]);

    useEffect(() => {
            if (typeof window !== 'undefined') {
                setTimeout(() => {
                    if (localStorage.wt) {
                        dispatch(getConversationAction({_id: router.query.conversation as string, loadAmount: -20}))
                    }
                    socket.on('receiveMessageFromConversation', (messageData: { conversationId: string }) => {
                        if (messageData.conversationId === router.query.conversation) {
                            dispatch(newMessageInConversation(messageData))
                        }
                    })
                    socket.emit('joinConversation', router.query.conversation)
                    socket.on("mySocketId", (id: string) => {
                        setMySocketId(id)
                    })
                    socket.on("incomingCallFromConversation", (data: {
                        callerId: any;
                        callerName: any;
                        userStream: any;
                    }) => {
                        dispatch(incomingCall(data))
                    })
                }, 500)
            }
        }


        , []);

    const callUser = async () => {
        try {
            if (router?.query?.conversation && userData?.username && mySocketId) {
                dispatch(
                    outgoingCallAction({
                            conversation: router.query.conversation as string,
                            mySocketId,
                            callerName: userData?.username,
                            router
                        }
                    )
                )
            }

        } catch (err) {

        }
    }

    const answerCall = async () => {
        dispatch(answerTheCallAction({
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

    useEffect(() => {
        setTimeout(() => {

            //calculating available space for chat area
            //@ts-ignore
            const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 0;

            //@ts-ignore
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            //@ts-ignore
            const navigationHeight = document.querySelector('.navigation')?.offsetHeight || 0;
            setHeaderSize(topbarHeight + headerHeight + navigationHeight + 90)
        }, 100)
    }, []);

    return (
        <Style id={'full-width-content'} className='messenger'>
            <HeadSetter title={'Messenger'}/>
            <MessengerConversationHeader callUser={null} profileImage={connectedUserData.profileImage} username={connectedUserData.username}/>
            <MessengerConversationMessageArea
                // @ts-ignore
                userData={userData}
                connectedUserData={connectedUserData}
                headerSize={headerSize}
                // setConnectedUserData={setConnectedUserData}
            />
            <MessengerConversationMessageTools
                setMessageState={setMessageState}
                messageState={messageState}
                connectedUserData={connectedUserData}
                conversationId={router.query.conversation}
            />
            {/* @ts-ignore */}
            {/*<MessengerCall*/}
            {/*    answerCall={answerCall}*/}
            {/*    callAccepted={callData?.callAccepted}*/}
            {/*    endCallHandler={endCallHandler}*/}
            {/*/>*/}

        </Style>
    );
};
//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [],
        {
            setHeadData: true,
            page: 'messengerPage'
        },
        store
    )
    return null
})


export default conversation;
