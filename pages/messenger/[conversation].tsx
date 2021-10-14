import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {useRouter} from "next/router";
import MessengerConversationHeader from "../../components/includes/messengerPageComponents/MessengerConversationHeader/MessengerConversationHeader";
import {AppContext} from "../../context/AppContext";
import MessengerConversationMessageArea from "../../components/includes/messengerPageComponents/MessengerConversationMessageArea/MessengerConversationMessageArea";
import MessengerConversationMessageTools from "../../components/includes/messengerPageComponents/MessengerConversationMessageTools/MessengerConversationMessageTools";
import socket from '../../_variables/socket'
import MessengerCall from "../../components/includes/messengerPageComponents/MessengerCall/MessengerCall";
// @ts-ignore
import Peer from 'simple-peer'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "../../store/store";
// @ts-ignore
import {getConversation, newMessageInConversation} from "../../store/actions/userActions";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";

const conversation = (props: ClientPagesTypes) => {
    const dispatch = useDispatch()
    const router = useRouter();

    const userData = useSelector((state:StoreTypes) => state.user.userData);
    const messages = useSelector((state :StoreTypes) => state.user.activeConversation?.messages);
    const settings = useSelector((state: StoreTypes) => state.settings);
    const activeConversation = useSelector((state: StoreTypes) => state.user.activeConversation);
    // @ts-ignore
    const users = useSelector((state:StoreTypes) => state.user.activeConversation.users);

    const [connectedUserData, setConnectedUserData] = useState({
        profileImage: undefined
    });

    useEffect(() => {
        // @ts-ignore
        const connectedUser = users.find(user => user._id !== userData._id)
        if (connectedUser){
            // @ts-ignore
            setConnectedUserData(connectedUser)
        }
    }, [users]);

    const contextData = useContext(AppContext);

    const [state, setState] = useState({
        calling: false,
        answering: false,
        callAccepted: false,
        receivingCall: false,
        callOptions: {
            video: true,
            audio: true
        },
        camera: true,
        microphone: true
    });
    const [myStream, setMyStream] = useState()
    const [userStream, setUserStream] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [messageState, setMessageState] = useState({messageBody: ''})


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

        socket.on('receiveMessageFromConversation', (messageData:{conversationId:string}) => {
            if (messageData.conversationId === router.query.conversation){
                dispatch(newMessageInConversation(messageData))
            }
        })

        socket.emit('joinConversation', router.query.conversation)


        socket.on("incomingCallFromConversation", (data: { callerId: any; callerName: any; callerStreamData: any; }) => {
            getUserMedia().then(myStreamData => {
                // @ts-ignore
                return setMyStream(myStreamData);
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
        })

        socket.on("mySocketId", (id: string) => {
            setMySocketId(id)
        })
    }, []);


    const peerOnErrorHandler = (err: any) => {
        console.log(err)
    }


    useEffect(() => {
        if (state.calling && myStream) {
            callUser()
        }
    }, [myStream, state.calling]);

    useEffect(() => {
        if (callAccepted && myStream && !state.calling) {
            // @ts-ignore
            myVideoRef.current.srcObject = myStream
            // @ts-ignore
            answerCall()
        }
    }, [callAccepted]);


    useEffect(() => {
        if (userStream) {
            // @ts-ignore
            userVideoRef.current.srcObject = userStream
        }
    }, [userStream]);


    const getUserMedia = () => {
        return navigator?.mediaDevices?.getUserMedia(state.callOptions)
    }

//-----
    const disableMicrophone = () => {
        state.microphone ?
            (setState({...state, microphone: false}),
                // @ts-ignore
                myStream.getAudioTracks ?
                    // @ts-ignore
                    setMyStream(myStream.getAudioTracks()[0].enabled = false) : null) :
            (setState({...state, microphone: true}),
                // @ts-ignore
                setMyStream(getUserMedia()))

    }

    const disableCamera = () => {
        // @ts-ignore
        state.camera ? (
                setState({...state, camera: false}),
                    // @ts-ignore
                    myStream.getVideoTracks ?
                        // @ts-ignore
                        setMyStream(myStream.getVideoTracks()[0].enabled = false) : null
            )
            : (
                setState({...state, camera: true}),
                    // @ts-ignore
                    setMyStream(getUserMedia())

            )

    }
//------
    const attemptForCall = () => {
        getUserMedia().then(async myStreamData => {
            // @ts-ignore
            setMyStream(myStreamData)
            setState({...state, calling: true})


        }).catch(err => {
            console.log(err)
        })
    }

    const attemptForAnswer = () => {
        setCallAccepted(true)
    }


    const callUser = async () => {
        try {
            // @ts-ignore
            myVideoRef.current.srcObject = myStream
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: myStream
            })

            peer.on("signal", (data: any) => {
                socket.emit("callToConversation", {
                    conversation: router.query.conversation,
                    callerStreamData: data,
                    callerId: mySocketId,
                    callerName: contextData.userData.username
                })
            })

            peer.on("stream", (userStream: React.SetStateAction<undefined>) => {
                setUserStream(userStream)
            })

            peer.on("error", (error: any) => {
                peerOnErrorHandler(error)
            })

            socket.on('endCall', () => {

                setState({
                    ...state,
                    calling: false,
                    answering: false,
                    callAccepted: false,
                    receivingCall: false,
                })
                // @ts-ignore
                setUserStream(null)
                setCallAccepted(false)
                // @ts-ignore
                setCallerData(null)
                // @ts-ignore
                setMyStream(null)
                // @ts-ignore
                setUserStream(null)
                peer.destroy()
                router.reload()

            })

            socket.on("callAccepted", (signal: any) => {
                setCallAccepted(true)
                peer.signal(signal)
            })
            // connectionRef.current = peer
        } catch (err) {
            console.log(err)
        }
    }

    const answerCall = async () => {

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: myStream
        })

        socket.on('endCall', () => {
            setState({
                ...state,
                calling: false,
                answering: false,
                callAccepted: false,
                receivingCall: false,
            })
            // @ts-ignore
            setUserStream(null)
            // @ts-ignore
            setCallerData(null)
            setCallAccepted(false)
            peer.destroy()
            router.reload()
        })

        peer.on("signal", (data: any) => {
            socket.emit("answerCall", data, router.query.conversation)
        })

        peer.on("stream", (userStream: React.SetStateAction<undefined>) => {
            setUserStream(userStream)
        })

        peer.on("error", (error: any) => {
            peerOnErrorHandler(error)
        })

        peer.signal(callerData.callerStreamData)
    }

    const endCallHandler = () => {

        socket.emit("endCall", router.query.conversation)
        setState({
            ...state,
            calling: false,
            answering: false,
            callAccepted: false,
            receivingCall: false,
        })
        // @ts-ignore
        setUserStream(null)
        // @ts-ignore
        setCallerData(null)
        setCallAccepted(false)

    }


    useEffect(() => {
        if (localStorage.wt) {
            dispatch(getConversation(router.query.conversation, -20))
        }
    }, [props]);

    return (
        <div className='messenger main'>
            <MessengerConversationHeader
                attemptForCall={attemptForCall}
                profileImage={connectedUserData.profileImage}
                // @ts-ignore
                username={connectedUserData.username}
                // @ts-ignore
                connectedUserId={connectedUserData._id}/>
            <MessengerConversationMessageArea
                // @ts-ignore
                userData={userData}
                connectedUserData={connectedUserData}
                setConnectedUserData={setConnectedUserData}
            />
            <MessengerConversationMessageTools
                setMessageState={setMessageState}
                messageState={messageState}
                connectedUserData={connectedUserData}
                conversationId={router.query.conversation}
            />
            <MessengerCall
                callerData={callerData}
                attemptForAnswer={attemptForAnswer}
                userVideoRef={userVideoRef}
                myVideoRef={myVideoRef}
                state={state}
                disableCamera={disableCamera}
                disableMicrophone={disableMicrophone}
                callAccepted={callAccepted}
                endCallHandler={endCallHandler}
            />

        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], store)
    return {
        props: {

            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
        }
    }
})

export default conversation;
