import { useState, useEffect, useCallback } from 'react';

const useMediaDevices = () => {
    const [mediaStream, setMediaStream] = useState(null);
    const [devices, setDevices] = useState([]);
    const [currentDevice, setCurrentDevice] = useState(null);

    const getDevices = useCallback(async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            setDevices(devices.filter(device => device.kind === 'videoinput'));
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    }, []);

    const getMediaStream = useCallback(async (deviceId) => {
        try {
            const constraints = {
                audio: true,
                video: deviceId
                    ? { deviceId: { exact: deviceId } }
                    : { facingMode: 'user' },
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setMediaStream(stream);
            return stream;
        } catch (error) {
            console.error('Error getting media stream:', error);
            return null;
        }
    }, []);

    const switchCamera = useCallback(async () => {
        const currentDeviceIndex = devices.findIndex(device => device.deviceId === currentDevice);
        const nextDeviceIndex = (currentDeviceIndex + 1) % devices.length;
        const nextDevice = devices[nextDeviceIndex];

        setCurrentDevice(nextDevice.deviceId);
        await getMediaStream(nextDevice.deviceId);
    }, [devices, currentDevice, getMediaStream]);

    useEffect(() => {
        getDevices();
    }, [getDevices]);

    useEffect(() => {
        if (devices.length > 0 && !currentDevice) {
            setCurrentDevice(devices[0].deviceId);
            getMediaStream(devices[0].deviceId);
        }
    }, [devices, currentDevice, getMediaStream]);

    return {
        mediaStream,
        devices,
        currentDevice,
        getMediaStream,
        switchCamera,
    };
};

export default useMediaDevices;
