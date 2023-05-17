// helpers.ts
export const createPeerConnection = (
    onIceCandidate: (candidate: RTCIceCandidate) => void
): RTCPeerConnection => {
    const configuration = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302',
            },
        ],
    };

    const peerConnection = new RTCPeerConnection(configuration);

    // Listen for local ICE candidates and send them to the remote peer
    peerConnection.addEventListener('icecandidate', (event) => {
        if (event.candidate) {
            onIceCandidate(event.candidate);
        }
    });

    return peerConnection;
};


export const getTargetSocketIds = (
    activeConversation: any,
    currentUserData: any
): string[] => {
    return activeConversation.users
        .filter((user: any) => user._id !== currentUserData._id)
        .map((user: any) => user.socketId);
};
