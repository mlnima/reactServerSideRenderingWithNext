import { useEffect } from 'react';
import Peer from 'simple-peer';
import { socket } from 'custom-util';

const usePeerConnection = ({
                               initiator,
                               callType,
                               remoteSignal,
                               callerData,
                               setLocalStream,
                               setRemoteStream,
                           }) => {
    useEffect(() => {
        const initializePeerConnection = async () => {
            const mediaDevice = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            if (!mediaDevice) {
                // Handle error
                return;
            }
            setLocalStream(mediaDevice);

            const peer = new Peer({
                initiator: initiator,
                trickle: false,
                stream: mediaDevice,
            });

            peer.on('signal', (signal) => {
                if (initiator) {
                    socket.emit('makeMediaCall', {
                        signal,
                        targetSocketIds: [callerData._id], // Adjust this according to your implementation
                        callerData,
                    });
                } else {
                    socket.emit('callAccepted', { signal, _id: callerData._id });
                }
            });

            peer.on('stream', (remoteStream) => {
                setRemoteStream(remoteStream);
            });

            if (!initiator) {
                peer.signal(remoteSignal);
            }
        };

        initializePeerConnection();
    }, [initiator, callType, remoteSignal, callerData, setLocalStream, setRemoteStream]);
};

export default usePeerConnection;
