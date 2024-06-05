// @ts-nocheck
'use client';
import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import Draggable from "react-draggable";
import socket from '@lib/web-socket-client';
import './MediaCall.styles.scss'
import {useAppDispatch, useAppSelector} from "@store/hooks";
import CallerInfo from "./CallerInfo";
import InCallActionButtons from "./InCallActionButtons";
import InitialMediaCall from "./InitialMediaCall";
import {
    initialAcceptIncomingCall, initialAcceptOutGoingCall,
    initialOutGoingCallConfirmAction, resetMediaConnectionAction
} from "@store/reducers/mediaConnectionReducer";
import Peer from "simple-peer";
import {setAlert} from "@store/reducers/globalStateReducer";

const MediaCall: FC = () => {

    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true);
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
    const {activeConversation} = useAppSelector(({messenger}) => messenger);
    const {userData,loggedIn} = useAppSelector(({user}) => user)
    const {mediaCall} = useAppSelector(({mediaConnection}) => mediaConnection)
    const largeVideoStreamRef = useRef<HTMLVideoElement>(null)
    const smallVideoStreamRef = useRef<HTMLVideoElement>(null)
    const InCallButtonsRef = useRef(null)
    const [inCallButtonsVisible, setInCallButtonsVisible] = React.useState(true)
    const dispatch = useAppDispatch()
    // const router = useRouter()

    const targetSocketIds = useMemo(() => {
        return activeConversation?.users?.reduce((finalData: string[], currentUser:{_id:string}) => {
            if (currentUser._id !== userData?._id) {
                finalData = [...finalData, currentUser._id]
            }
            return finalData
        }, [])
    }, [activeConversation?.users])


    const {
        onGoingCall,
        incomingCall,
        outGoingCall,
        callAccepted,
        callerData,
        callRejected,
        remoteSignal,
        callType,
    } = useAppSelector(({mediaConnection}) => mediaConnection);


    useEffect(() => {


        socket.on('cancelIncomingCall', ({conversationId, callerData}) => {
            if ((activeConversation?._id === conversationId) && incomingCall) {
                // onTerminatedCallHandler()
                dispatch(resetMediaConnectionAction(null))
            }
        })

        socket.on('disconnect', () => {
            onTerminatedCallHandler()
        });


        socket.on('callRejected', () => {
            cleanup1LocalAndRemoteStream()
            dispatch(resetMediaConnectionAction(null))
            dispatch(setAlert({message: 'Call Rejected',type:'info'}))
        });

        return () => {
            socket.off('callRejected');
            socket.off('disconnect');
            socket.off('callTerminate');
        };
    }, [activeConversation]);

    useEffect(() => {
        if (!!localStream && !remoteStream && largeVideoStreamRef?.current) {
            largeVideoStreamRef.current.srcObject = localStream
        }
        if (!!localStream && !!remoteStream && largeVideoStreamRef?.current && smallVideoStreamRef?.current) {
            largeVideoStreamRef.current.srcObject = remoteStream
            smallVideoStreamRef.current.srcObject = localStream
        }

    }, [remoteStream, localStream]);

    const cleanup1LocalAndRemoteStream = () => {
        if (!!localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
        }

        if (!!remoteStream) {
            remoteStream.getTracks().forEach((track) => track.stop());
            setRemoteStream(null);
        }
    }
    const onCallHandler = async () => {
        try {
            if (activeConversation?._id && userData?._id) {
                const mediaDevice = await navigator?.mediaDevices?.getUserMedia({video: true, audio: true});

                if (!mediaDevice) {
                    dispatch(setAlert({message: 'Can Not Access The Camera or Microphone', type: 'error'}));
                    return
                }

                setLocalStream(mediaDevice)
                dispatch(initialOutGoingCallConfirmAction(null))

                const peer = new Peer({
                    initiator: true,
                    trickle: false,
                    stream: mediaDevice
                });

                peer._debug = console.log

                peer.on('signal', (signal) => {
                    socket.emit("makeMediaCall", {
                        signal,
                        targetSocketIds,
                        conversationId: activeConversation._id,
                        callerData: {
                            _id: userData._id,
                            profileImage: userData?.profileImage?.filePath,
                            username: userData?.username
                        },
                        callType
                    });
                });

                socket.on('callTerminated', () => {

                    cleanup1LocalAndRemoteStream()
                    dispatch(resetMediaConnectionAction(null))
                    peer.destroy()
                    //should fix , for now threw error about can not signal after peer is destroyed
                    // router.reload()
                })

                socket.on('callAccepted', ({signal}) => {
                    dispatch(initialAcceptOutGoingCall(null))
                    peer.signal(signal);
                });

                // Listen for the remote stream
                peer.on('stream', (remoteStream) => {
                    setRemoteStream(remoteStream)
                });


            }
        } catch (error) {

        }

    }
    const onCancelOutGoingCallHandler = () => {
        if (outGoingCall && activeConversation?._id && userData?._id) {
            cleanup1LocalAndRemoteStream()
            dispatch(resetMediaConnectionAction(null))
            setTimeout(() => {
                socket.emit("cancelOutGoingCall", {
                    targetSocketIds,
                    conversationId: activeConversation._id,
                    callerData: {
                        _id: userData._id,
                        profileImage: userData?.profileImage?.filePath,
                        username: userData?.username
                    },
                    callType
                });
            }, 1000)
        }
    }
    const onAcceptCallHandler = async () => {
        try {
            const mediaDevice = await navigator?.mediaDevices?.getUserMedia({video: true, audio: true});

            if (!mediaDevice) {
                dispatch(setAlert({message: 'Can Not Access The Camera or Microphone', type: 'error'}));
                return
            }

            setLocalStream(mediaDevice)

            dispatch(initialAcceptIncomingCall(null));


            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: mediaDevice
            });

            peer._debug = console.log

            peer.on('signal', (signal) => {
                socket.emit('callAccepted', {signal, _id: callerData._id});
            });

            peer.on('stream', (remoteStream) => {
                setRemoteStream(remoteStream)
            });

            peer.signal(remoteSignal);


        } catch (error) {

        }

    }


    const onScreenTapHandler = () => {
        if (!inCallButtonsVisible) {
            setInCallButtonsVisible(true);

            const hideButtons = setTimeout(() => {
                setInCallButtonsVisible(false);
            }, 3000);
        }
    };
    const onHangupTheCallHandler = () => {
        cleanup1LocalAndRemoteStream()
        dispatch(resetMediaConnectionAction(null))
    }

    const onTerminatedCallHandler = () => {
        cleanup1LocalAndRemoteStream()

        dispatch(resetMediaConnectionAction(null))

        if (targetSocketIds?.length) {
            socket.emit('callTerminated', {targetSocketIds});
        } else if (callerData?._id) {
            socket.emit('callTerminated', {targetSocketIds: [callerData?._id]});
        }
        //should fix , for now threw error about can not signal after peer is destroyed
        // router.reload()
    }
    const onSwitchCameraHandler = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
            );

            if (videoDevices.length > 1) {
                setCurrentCameraIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % videoDevices.length;

                    const newConstraints = {
                        video: {
                            deviceId: {exact: videoDevices[nextIndex].deviceId},
                        },
                        audio: true,
                    };

                    if (localStream) {
                        localStream.getVideoTracks()[0].stop();
                    }

                    navigator.mediaDevices
                        .getUserMedia(newConstraints)
                        .then((newStream) => {
                            const newVideoTrack = newStream.getVideoTracks()[0];

                            if (localStream) {
                                localStream.addTrack(newVideoTrack);
                                localStream.removeTrack(localStream.getVideoTracks()[0]);
                            }
                            //@ts-ignore
                            setLocalStream((prevStream) => {
                                if (prevStream) {
                                    return new MediaStream([
                                        ...prevStream.getAudioTracks(),
                                        newVideoTrack,
                                    ]);
                                }

                            });
                        })
                        .catch((error) => {

                        });

                    return nextIndex;
                });
            }
        } catch (error) {

        }
    };
    const onDisableCameraHandler = () => {
        if (localStream) {
            const videoTracks = localStream.getVideoTracks();
            if (videoTracks.length > 0) {
                const videoTrack = videoTracks[0];

                // If the camera is enabled, disable it
                if (isCameraEnabled) {
                    videoTrack.stop();
                    setIsCameraEnabled(false);
                }
                // If the camera is disabled, enable it
                else {
                    navigator.mediaDevices
                        .getUserMedia({video: true})
                        .then((newStream) => {
                            const newVideoTrack = newStream.getVideoTracks()[0];
                            localStream.addTrack(newVideoTrack);
                            setIsCameraEnabled(true);
                        })
                        .catch(() => {

                        });
                }
            }
        }
    };
    const onMuteCallHandler = () => {
        if (localStream) {
            const audioTracks = localStream.getAudioTracks();
            if (audioTracks.length > 0) {
                const audioTrack = audioTracks[0];

                // If the microphone is enabled, disable it
                if (isMicrophoneEnabled) {
                    audioTrack.enabled = false;
                    setIsMicrophoneEnabled(false);
                }
                // If the microphone is disabled, enable it
                else {
                    audioTrack.enabled = true;
                    setIsMicrophoneEnabled(true);
                }
            }
        }
    }
    const onRejectCallHandler = () => {
        socket.emit('callRejected', {
            _id: callerData._id,
        });

        dispatch(resetMediaConnectionAction(null))
    };


    if (loggedIn && mediaCall) {
        return (
            <div className={'mediaCallContainer'}>
                <div className={'blur-background'}/>
                <div className={'inner-content'} onClick={onScreenTapHandler} onTouchStartCapture={onScreenTapHandler}>

                    {(!onGoingCall && !incomingCall && !outGoingCall) &&
                        <InitialMediaCall callAccepted={callAccepted} outGoingCall={outGoingCall} callType={callType}/>}

                    {(!onGoingCall && incomingCall && !callAccepted) &&
                        <CallerInfo profileImage={callerData.profileImage}
                                    username={callerData.username}
                                    callType={callType}/>
                    }

                    {(onGoingCall || outGoingCall) &&
                        <video className={`large-stream`}
                               playsInline
                               muted
                               ref={largeVideoStreamRef}
                               autoPlay
                        />
                    }

                    {(onGoingCall) &&
                        <Draggable handle=".small-stream">
                            <video className={'small-stream'}
                                   ref={smallVideoStreamRef}
                                   muted
                                   playsInline
                                   autoPlay
                            />
                        </Draggable>
                    }

                    <InCallActionButtons InCallButtonsRef={InCallButtonsRef}
                                         onCallHandler={onCallHandler}
                                         onCancelOutGoingCallHandler={onCancelOutGoingCallHandler}
                                         onMuteCallHandler={onMuteCallHandler}
                                         onAcceptCallHandler={onAcceptCallHandler}
                                         inCallButtonsVisible={inCallButtonsVisible}
                                         setInCallButtonsVisible={setInCallButtonsVisible}
                                         onTerminatedCallHandler={onTerminatedCallHandler}
                                         onSwitchCameraHandler={onSwitchCameraHandler}
                                         onRejectCallHandler={onRejectCallHandler}
                                         isCameraEnabled={isCameraEnabled}
                                         onDisableCameraHandler={onDisableCameraHandler}/>
                </div>

            </div>
        )
    } else return null

};
export default MediaCall;

