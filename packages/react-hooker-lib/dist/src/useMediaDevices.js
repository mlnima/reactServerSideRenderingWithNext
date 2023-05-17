"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMediaDevices = function () {
    var _a = tslib_1.__read((0, react_1.useState)(null), 2), mediaStream = _a[0], setMediaStream = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)([]), 2), devices = _b[0], setDevices = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(null), 2), currentDevice = _c[0], setCurrentDevice = _c[1];
    var getDevices = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var devices_1, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()];
                case 1:
                    devices_1 = _a.sent();
                    setDevices(devices_1.filter(function (device) { return device.kind === 'videoinput'; }));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching devices:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, []);
    var getMediaStream = (0, react_1.useCallback)(function (deviceId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var constraints, stream, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    constraints = {
                        audio: true,
                        video: deviceId
                            ? { deviceId: { exact: deviceId } }
                            : { facingMode: 'user' }
                    };
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia(constraints)];
                case 1:
                    stream = _a.sent();
                    setMediaStream(stream);
                    return [2 /*return*/, stream];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error getting media stream:', error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    }); }, []);
    var switchCamera = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var currentDeviceIndex, nextDeviceIndex, nextDevice;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentDeviceIndex = devices.findIndex(function (device) { return device.deviceId === currentDevice; });
                    nextDeviceIndex = (currentDeviceIndex + 1) % devices.length;
                    nextDevice = devices[nextDeviceIndex];
                    setCurrentDevice(nextDevice.deviceId);
                    return [4 /*yield*/, getMediaStream(nextDevice.deviceId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [devices, currentDevice, getMediaStream]);
    (0, react_1.useEffect)(function () {
        getDevices();
    }, [getDevices]);
    (0, react_1.useEffect)(function () {
        if (devices.length > 0 && !currentDevice) {
            setCurrentDevice(devices[0].deviceId);
            getMediaStream(devices[0].deviceId);
        }
    }, [devices, currentDevice, getMediaStream]);
    return {
        mediaStream: mediaStream,
        devices: devices,
        currentDevice: currentDevice,
        getMediaStream: getMediaStream,
        switchCamera: switchCamera
    };
};
exports["default"] = useMediaDevices;
