declare const useMediaDevices: () => {
    mediaStream: any;
    devices: any[];
    currentDevice: any;
    getMediaStream: (deviceId: any) => Promise<MediaStream>;
    switchCamera: () => Promise<void>;
};
export default useMediaDevices;
//# sourceMappingURL=useMediaDevices.d.ts.map