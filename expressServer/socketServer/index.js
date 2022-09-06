"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("module-alias/register");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
var connectToDatabase_1 = tslib_1.__importDefault(require("../_variables/connectToDatabase"));
(0, connectToDatabase_1.default)('Socket Server').finally();
var http_1 = tslib_1.__importDefault(require("http"));
var express_1 = tslib_1.__importDefault(require("express"));
var cors_1 = tslib_1.__importDefault(require("cors"));
var chatroomSchema_1 = tslib_1.__importDefault(require("../models/chatroomSchema"));
var _uniqBy_1 = tslib_1.__importDefault(require("@_variables/util/arrayUtils/_uniqBy"));
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
console.log('running');
var _a = require('./users'), userJoin = _a.userJoin, userLeave = _a.userLeave, getUsersListOfRoom = _a.getUsersListOfRoom;
var chatroomMessages = [];
var chatroomOnlineUsers = [];
var io = require('socket.io')(server, {
    origin: [process.env.NEXT_PUBLIC_PRODUCTION_URL, '*'],
    cors: true,
    handlePreflightRequest: function (req, res) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_PRODUCTION_URL,
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "my-custom-header",
            "Access-Control-Allow-Credentials": true
        });
        res.end();
    }
});
app.get('/test', function (req, res) { return res.json({ message: 'fine' }); });
app.get('/*', function (req, res) {
    res.end();
});
//@ts-ignore
server.listen(process.env.SOCKET_PORT, function (error) {
    if (error) {
        throw error;
    }
    console.log("socket server is running on ".concat(process.env.SOCKET_PORT));
});
io.on('connection', function (socket) {
    socket.on('socketId', function () {
        socket.emit("socketId", socket.id);
    });
    socket.on('giveSocketsList', function () {
        var _a, _b, _c;
        socket.emit('takeSocketLists', (((_c = (_b = (_a = io.sockets) === null || _a === void 0 ? void 0 : _a.server) === null || _b === void 0 ? void 0 : _b.engine) === null || _c === void 0 ? void 0 : _c.clientsCount) || 1) - 1);
    });
    socket.on('setIdAndJoinConversation', function (userID, conversationId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            //setCustomId(userID)
            socket.join(conversationId);
            return [2 /*return*/];
        });
    }); });
    socket.on('joinConversation', function (conversation) {
        //console.log(conversation)
        socket.join(conversation);
    });
    socket.on('sendMessageToConversation', function (messageData, conversation) {
        // console.log(messageData)
        io.in(conversation).emit('receiveMessageFromConversation', messageData);
    });
    // ----------------------videoCall---------------------
    socket.on("disconnect", function () {
        try {
            var disconnectedUserData = chatroomOnlineUsers.find(function (u) { return u.socketId === socket.id; });
            if (disconnectedUserData) {
                chatroomOnlineUsers = chatroomOnlineUsers.filter(function (u) { return u.socketId !== socket.id; });
                socket.to(disconnectedUserData.chatRoomName).emit('userListUpdated', chatroomOnlineUsers);
            }
            // if (socket){
            //     socket.broadcast.emit("endCall")
            // }
        }
        catch (err) {
            console.log(err);
        }
    });
    socket.on("callUser", function (data) {
        socket.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
    });
    socket.on("callToConversation", function (data) {
        // socket.to(data.conversation).emit("callToConversation", { callerStreamData: data.callerStreamData, callerId: data.callerId, callerName: data.callerName,conversation:data.conversation })
        socket.to(data.conversation).emit("incomingCallFromConversation", data);
    });
    socket.on("answerCall", function (data) {
        socket.to(data.conversation).emit('callAccepted', data.signal);
    });
    socket.on('endCall', function (conversation) {
        socket.to(conversation).emit('endCall');
    });
    //--------------------chatroom--------------------------
    socket.on('joinUserToTheRoom', function (userData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var updatedUserList;
        return tslib_1.__generator(this, function (_a) {
            updatedUserList = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(chatroomOnlineUsers), false), [userData], false);
            //chatroomOnlineUsers = _.uniqBy(updatedUserList, e => e.username);
            chatroomOnlineUsers = (0, _uniqBy_1.default)(updatedUserList, 'username');
            io.in(userData.chatRoomName).emit('userListUpdated', chatroomOnlineUsers);
            return [2 /*return*/];
        });
    }); });
    socket.on('joinSocketToTheChatroom', function (chatRoomName) {
        socket.join(chatRoomName);
    });
    socket.on('onlineUsersList', function () {
        //io.to(socket.id).emit('onlineUsersList', _.uniqBy(chatroomOnlineUsers, e => e.username))
        io.to(socket.id).emit('onlineUsersList', (0, _uniqBy_1.default)(chatroomOnlineUsers, 'username'));
    });
    socket.on('messageToChatroom', function (newMessageData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var chatroomData, updatedMessagesLimited, updatedMessages, err_1;
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, chatroomSchema_1.default.findOne({ name: newMessageData.roomName }).exec()];
                case 1:
                    chatroomData = _d.sent();
                    if (chatroomData) {
                        if (((_a = chatroomData === null || chatroomData === void 0 ? void 0 : chatroomData.messages) === null || _a === void 0 ? void 0 : _a.length) > 50) {
                            updatedMessagesLimited = chatroomData.messages.slice(((_b = chatroomData.messages) === null || _b === void 0 ? void 0 : _b.length) - 50, ((_c = chatroomData.messages) === null || _c === void 0 ? void 0 : _c.length) + 1);
                            updatedMessages = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(updatedMessagesLimited), false), [newMessageData], false);
                            chatroomSchema_1.default.findOneAndUpdate({ name: newMessageData.roomName }, { messages: updatedMessages }, {
                                upsert: true,
                                new: true
                            }).then(function (updatedChatroomData) {
                                io.in(newMessageData.roomName).emit('messageFromChatroom', newMessageData);
                            });
                        }
                        else {
                            chatroomSchema_1.default.findOneAndUpdate({ name: newMessageData.roomName }, { $push: { messages: newMessageData } }, {
                                upsert: true,
                                new: true
                            }).then(function (updatedChatroomData) {
                                io.in(newMessageData.roomName).emit('messageFromChatroom', newMessageData);
                            });
                        }
                    }
                    else {
                        chatroomSchema_1.default.findOneAndUpdate({ name: newMessageData.roomName }, { $push: { messages: newMessageData } }, {
                            upsert: true,
                            new: true
                        }).then(function (updatedChatroomData) {
                            io.in(newMessageData.roomName).emit('messageFromChatroom', newMessageData);
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _d.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    socket.on('recentChatRoomMessages', function (chatRoomName) {
        chatroomSchema_1.default.findOne({ name: chatRoomName }).then(function (chatroomData) {
            io.to(socket.id).emit('recentChatRoomMessages', (chatroomData === null || chatroomData === void 0 ? void 0 : chatroomData.messages) || []);
        });
    });
    socket.on('startTyping', function (roomName, username) {
        socket.to(roomName).emit('startTyping', username);
    });
});
//# sourceMappingURL=index.js.map