import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getConversation} from "../../_variables/_userSocialAjaxVariables";
import {useRouter} from "next/router";
import MessengerConversationHeader from "../../components/includes/messengerPageComponents/MessengerConversationHeader/MessengerConversationHeader";
import {AppContext} from "../../context/AppContext";
import MessengerConversationMessageArea from "../../components/includes/messengerPageComponents/MessengerConversationMessageArea/MessengerConversationMessageArea";
import MessengerConversationMessageTools from "../../components/includes/messengerPageComponents/MessengerConversationMessageTools/MessengerConversationMessageTools";
import socket from '../../_variables/socket'
import MessengerCall from "../../components/includes/messengerPageComponents/MessengerCall/MessengerCall";
import Peer from 'simple-peer'

const conversation = props => {
    const contextData = useContext(AppContext);
    const router = useRouter();
    const [state, setState] = useState({
        displayMyVideo: false
    });

    const [messageState, setMessageState] = useState({messageBody: ''})
    const [connectedUserData, setConnectedUserData] = useState({});
    const [messages, setMessages] = useState([]);

    const [callerData, setCallerData] = useState({
        callerId: '',
        callerName: '',
        callerStreamData: null
    })


    const [mySocketId, setMySocketId] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)

    const myVideoRef = useRef(null)
    const userVideoRef = useRef(null)
    const connectionRef = useRef(null)

    useEffect(() => {
        if (router.query.conversation && contextData.userData._id) {
            getAndSetConversationData()
            //socket.io.engine.id = contextData.userData._id
            //socket.emit('setIdAndJoinConversation',contextData.userData._id ,router.query.conversation)
        }
    }, [contextData.userData]);

    useEffect(() => {
        if (typeof navigator !== 'undefined') {
            askPermissionToAccessUserMedia()
        }
    }, []);


    const askPermissionToAccessUserMedia = () => {
        navigator?.mediaDevices?.getUserMedia({video: true, audio: true}).then(stream => {
            setStream(stream)
            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream
            }
        })
    }


    useEffect(() => {
        if (stream && state.displayMyVideo){
            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream
            }
        }
    }, [stream,state.displayMyVideo]);


    socket.emit('joinConversation', router.query.conversation)

    socket.on('receiveMessageFromConversation', messageData => {
        setMessages([...messages, messageData])
    })

    socket.on("incomingCallFromConversation", (data) => {
        setCallerData({
            callerId: data.callerId,
            callerName: data.callerName,
            callerStreamData: data.callerStreamData
        })
        setReceivingCall(true)
    })

    socket.on("mySocketId", id => {
        console.log(id)
        setMySocketId(id)
    })


    const callUser = () => {

        setState({
            ...state,
            displayMyVideo: true
        })
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("callToConversation", {
                conversation: router.query.conversation,
                callerStreamData: data,
                callerId: mySocketId,
                callerName: contextData.userData.username
            })
        })

        peer.on("stream", (stream) => {
            userVideoRef.current.srcObject = stream
        })

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        setState({
            ...state,
            displayMyVideo: true
        })
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on("signal", data => {
            socket.emit("answerCall", {signal: data, to: callerData.callerId})
            //socket.emit("answerCall", { signal: data, to: router.query.conversation })
        })

        peer.on("stream", (stream) => {
            userVideoRef.current.srcObject = stream
        })

        peer.signal(callerData.callerStreamData)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }


    const getAndSetConversationData = () => {
        getConversation(router.query.conversation, -20).then(res => {
            const connectedUser = res.data.conversation.users.find(u => u._id !== contextData.userData._id)
            setMessages([...messages, ...res.data.conversation.messages])
            setConnectedUserData({...connectedUserData, ...connectedUser})
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='messenger main'>
            <style jsx>{`

            `}</style>
            <MessengerConversationHeader
                profileImage={connectedUserData.profileImage}
                username={connectedUserData.username}
                callUser={callUser}
                connectedUserId={connectedUserData._id}/>
            <MessengerConversationMessageArea
                messages={messages}
                connectedUserData={connectedUserData}/>
            <MessengerConversationMessageTools
                setMessageState={setMessageState}
                messageState={messageState}
                connectedUserData={connectedUserData}
                setMessages={setMessages}
                messages={messages}
                conversationId={router.query.conversation}
                getAndSetConversationData={getAndSetConversationData}/>
            <MessengerCall
                callerData={callerData}
                answerCall={answerCall}
                receivingCall={receivingCall}
                userVideoRef={userVideoRef}
                state={state}
                // caller={caller}
                callEnded={callEnded}
                callAccepted={callAccepted}
                myVideoRef={myVideoRef}
            />

        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], 'messengerPage')
    const widgets = firstLoadData.widgets
    return {props: {widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: context.req.protocol}}
}

export default conversation;
