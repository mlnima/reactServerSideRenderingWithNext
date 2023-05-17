"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = require("react");
var simple_peer_1 = tslib_1.__importDefault(require("simple-peer"));
var custom_util_1 = require("custom-util");
var usePeerConnection = function (_a) {
    var initiator = _a.initiator, callType = _a.callType, remoteSignal = _a.remoteSignal, callerData = _a.callerData, setLocalStream = _a.setLocalStream, setRemoteStream = _a.setRemoteStream;
    (0, react_1.useEffect)(function () {
        var initializePeerConnection = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var mediaDevice, peer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: true
                        })];
                    case 1:
                        mediaDevice = _a.sent();
                        if (!mediaDevice) {
                            // Handle error
                            return [2 /*return*/];
                        }
                        setLocalStream(mediaDevice);
                        peer = new simple_peer_1["default"]({
                            initiator: initiator,
                            trickle: false,
                            stream: mediaDevice
                        });
                        peer.on('signal', function (signal) {
                            if (initiator) {
                                custom_util_1.socket.emit('makeMediaCall', {
                                    signal: signal,
                                    targetSocketIds: [callerData._id],
                                    callerData: callerData
                                });
                            }
                            else {
                                custom_util_1.socket.emit('callAccepted', { signal: signal, _id: callerData._id });
                            }
                        });
                        peer.on('stream', function (remoteStream) {
                            setRemoteStream(remoteStream);
                        });
                        if (!initiator) {
                            peer.signal(remoteSignal);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        initializePeerConnection();
    }, [initiator, callType, remoteSignal, callerData, setLocalStream, setRemoteStream]);
};
exports["default"] = usePeerConnection;
