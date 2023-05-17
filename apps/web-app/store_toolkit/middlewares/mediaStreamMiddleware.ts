type StreamAction = {
    type: string;
    payload: any;
};

let localMediaStream: MediaStream | null = null;
let remoteMediaStreams: Record<string, MediaStream> = {};

export const mediaStreamMiddleware = () => (next: (action: StreamAction) => void) => (action: StreamAction): void => {
    switch (action.type) {
        case 'mediaConnection/setLocalMediaStream':
            localMediaStream = action.payload;
            break;
        case 'mediaConnection/addRemoteMediaStream':
            remoteMediaStreams[action.payload.userId] = action.payload.stream;
            break;
        case 'mediaConnection/removeRemoteMediaStream':
            delete remoteMediaStreams[action.payload];
            break;
        case 'mediaConnection/clearRemoteMediaStreams':
            remoteMediaStreams = {};
            break;
        default:
            break;
    }

    next(action);
};

export const getLocalMediaStream = (): MediaStream | null => localMediaStream;
export const getRemoteMediaStreams = (): Record<string, MediaStream> => remoteMediaStreams;
export const getRemoteMediaStream = (userId: string): MediaStream | undefined => remoteMediaStreams[userId];
