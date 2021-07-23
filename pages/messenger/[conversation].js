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
        calling: false,
        answering: false,
        callAccepted: false,
        receivingCall: false,
        camera:'user'
    });

    const [myStream, setMyStream] = useState()
    const [userStream, setUserStream] = useState()
    const [callAccepted, setCallAccepted] = useState(false)


    const [messageState, setMessageState] = useState({messageBody: ''})
    const [connectedUserData, setConnectedUserData] = useState({});
    const [messages, setMessages] = useState([]);

    const [callerData, setCallerData] = useState({
        callerId: '',
        callerName: '',
        callerStreamData: null
    })

    const [mySocketId, setMySocketId] = useState("")


    const myVideoRef = useRef(null)
    const userVideoRef = useRef(null)
    const connectionRef = useRef(null)

    useEffect(() => {
        if (router.query.conversation && contextData.userData._id) {
            getAndSetConversationData()
        }
    }, [contextData.userData]);

    socket.emit('joinConversation', router.query.conversation)
    socket.on('receiveMessageFromConversation', messageData => {
        setMessages([...messages, messageData])
    })

    socket.on("incomingCallFromConversation", data => {
        getUserMedia({video: true, audio: true}).then(myStreamData => {
            setMyStream(myStreamData)
        })

        setCallerData({
            callerId: data.callerId,
            callerName: data.callerName,
            callerStreamData: data.callerStreamData
        })

        setState({
            ...state,
            receivingCall: true
        })
        //setReceivingCall(true)
    })

    socket.on("mySocketId", id => {
        setMySocketId(id)
    })

    const peerOnErrorHandler = error => {
        console.log(error)
    }


    useEffect(() => {
        if (state.calling && myStream) {
            callUser()
        }
    }, [myStream, state.calling]);
    useEffect(() => {
        if (callAccepted && myStream && !state.calling) {
            myVideoRef.current.srcObject = myStream
            answerCall()
        }
    }, [callAccepted]);
    // useEffect(() => {
    //     if (myStream && myVideoRef.current && state.receivingCall) {
    //         myVideoRef.current.srcObject = myStream
    //     }
    //
    // }, [myStream, state.receivingCall]);

    useEffect(() => {
        if (userStream) {
            userVideoRef.current.srcObject = userStream
        }
    }, [userStream]);



    const getUserMedia = options =>{
        return navigator?.mediaDevices?.getUserMedia(options)
    }


    const switchMediaHandler = () =>{
        const options = {
            video: {
                facingMode: 'user', // Or 'environment'
            }, audio: true
        }
        getUserMedia(options).then(myStreamData => {
            setMyStream(myStreamData)
        })
    }

    const attemptForCall = () => {
        getUserMedia({video: true, audio: true}).then(myStreamData => {
            setMyStream(myStreamData)
            setState({
                ...state,
                calling: true
            })
        })
    }

    const attemptForAnswer = () => {
        setCallAccepted(true)
    }


    const callUser = async () => {
        try {
            myVideoRef.current.srcObject = myStream
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: myStream
            })

            peer.on("signal", data => {
                socket.emit("callToConversation", {
                    conversation: router.query.conversation,
                    callerStreamData: data,
                    callerId: mySocketId,
                    callerName: contextData.userData.username
                })
            })

            peer.on("stream", userStream => {
                setUserStream(userStream)
            })

            peer.on("error", error => {
                peerOnErrorHandler(error)
            })

            socket.on('endCall',()=>{

                setState({
                    ...state,
                    calling: false,
                    answering: false,
                    callAccepted: false,
                    receivingCall: false,
                })
                setUserStream(null)
                setCallAccepted(false)
                setCallerData(null)
                setMyStream(null)
                setUserStream(null)
                peer.destroy()
                router.reload()

            })

            socket.on("callAccepted", signal => {
                setCallAccepted(true)
                peer.signal(signal)
            })
            // connectionRef.current = peer
        } catch (error) {
            console.log(error)
        }
    }


    const answerCall = async () => {

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: myStream
        })

        socket.on('endCall',()=>{
            setState({
                ...state,
                calling: false,
                answering: false,
                callAccepted: false,
                receivingCall: false,
            })
            setUserStream(null)
            setCallerData(null)
            setCallAccepted(false)
            peer.destroy()
            router.reload()
        })

        peer.on("signal", data => {
            socket.emit("answerCall", data, router.query.conversation)
        })

        peer.on("stream", userStream => {
            setUserStream(userStream)
        })

        peer.on("error", error => {
            peerOnErrorHandler(error)
        })

        peer.signal(callerData.callerStreamData)
    }

    const endCallHandler = () => {

        socket.emit("endCall",router.query.conversation)
        setState({
            ...state,
            calling: false,
            answering: false,
            callAccepted: false,
            receivingCall: false,
        })
        setUserStream(null)
        setCallerData(null)
        setCallAccepted(false)

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
                attemptForCall={attemptForCall}
                profileImage={connectedUserData.profileImage}
                username={connectedUserData.username}
                // callUser={callUser}
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
                attemptForAnswer={attemptForAnswer}
                userVideoRef={userVideoRef}
                myVideoRef={myVideoRef}
                state={state}

                callAccepted={callAccepted}
                endCallHandler={endCallHandler}
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
