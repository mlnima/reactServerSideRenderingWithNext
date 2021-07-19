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


    const userVideo = useRef(null);
    const partnerVideo = useRef(null);
    //const socket = useRef();

    const contextData = useContext(AppContext);
    const router = useRouter()
    const [messageState, setMessageState] = useState({messageBody: ''})
    const [connectedUserData, setConnectedUserData] = useState({});
    const [messages, setMessages] = useState([]);



    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState({});
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);

    useEffect(() => {
        if (router.query.conversation && contextData.userData._id) {
            getAndSetConversationData()
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
            if (userVideo.current) {
                userVideo.current.srcObject = stream
            }
        })
    }
    // const acceptCall = () =>{
    //     setCallAccepted(true)
    //     const Peer = new Peer({
    //         initiator:true,
    //         trickle:false,
    //         stream
    //     })
    //     Peer.on('signal',data=>{
    //         socket.current.emit('callAccepted',{signal:data,to:caller})
    //     })
    //     Peer.on('stream',stream=>{
    //         personToCallVideoRef.current.srcObject = stream
    //
    //     })
    //     Peer.signal(callerSignal)
    // }
    // socket.on('receiveCall',data=>{
    //     setReceivingCall(true)
    //     setCaller(data.from)
    //     setCallerSignal(data.signal)
    // })

    socket.emit('joinConversation', router.query.conversation)
    socket.on('receiveMessageFromConversation', messageData => {
        setMessages([...messages, messageData])
    })



    const callPeer = id => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
            stream: stream,
        })
        peer.on("signal", data => {
            socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })
    };

    const acceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", { signal: data, to: caller })
        })

        peer.on("stream", stream => {

            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
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
                callPeer={callPeer}
                stream={stream}
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
                stream={stream}
                callAccepted={callAccepted}
                receivingCall={receivingCall}
                caller={caller}
                acceptCall={acceptCall}
                userVideo={userVideo}
                partnerVideo={partnerVideo}/>

        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], 'messengerPage')
    const widgets = firstLoadData.widgets
    return {props: {widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: context.req.protocol}}
}

export default conversation;
