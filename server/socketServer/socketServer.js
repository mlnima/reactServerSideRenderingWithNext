require('dotenv').config()
require('../_variables/connectToDatabase')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const _ = require('lodash')
app.use(cors())
const chatroomSchema = require('../models/chatroomSchema')

const {userJoin, userLeave, getUsersListOfRoom} = require('./users')
let chatroomMessages = []
let chatroomOnlineUsers = []


const io = require('socket.io')(server, {
    origin: [process.env.NEXT_PUBLIC_PRODUCTION_URL, '*'],
    cors: true,
    handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_PRODUCTION_URL,
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "my-custom-header",
            "Access-Control-Allow-Credentials": true
        });
        res.end();
    }
})


app.get('/*', (req, res) => {
    res.end()
});

server.listen(process.env.SOCKET_PORT, () => {
    console.log(`socket server is running on ${process.env.SOCKET_PORT}`);
});


io.on('connection', socket => {

    socket.on('socketId', () => {
        socket.emit("socketId", socket.id)
    })

    socket.on('giveSocketsList', () => {
        socket.emit('takeSocketLists', (io.sockets?.server?.engine?.clientsCount || 1 )- 1)
    })


    socket.on('setIdAndJoinConversation', async (userID, conversationId) => {
        //setCustomId(userID)
        socket.join(conversationId)
    })

    socket.on('joinConversation', conversation => {
        //console.log(conversation)
        socket.join(conversation)
    })

    socket.on('sendMessageToConversation', (messageData, conversation) => {
        // console.log(messageData)
        io.in(conversation).emit('receiveMessageFromConversation', messageData)
    })


// ----------------------videoCall---------------------
    socket.on("disconnect", () => {
        try {
            const disconnectedUserData = chatroomOnlineUsers.find(u => u.socketId === socket.id)
            if (disconnectedUserData) {
                chatroomOnlineUsers = chatroomOnlineUsers.filter(u => u.socketId !== socket.id)
                socket.to(disconnectedUserData.chatRoomName).emit('userListUpdated', chatroomOnlineUsers)
            }

            // if (socket){
            //     socket.broadcast.emit("endCall")
            // }

        } catch (err) {
            console.log(err)
        }


    })

    socket.on("callUser", (data) => {
        socket.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
    })

    socket.on("callToConversation", data => {
        // socket.to(data.conversation).emit("callToConversation", { callerStreamData: data.callerStreamData, callerId: data.callerId, callerName: data.callerName,conversation:data.conversation })
        socket.to(data.conversation).emit("incomingCallFromConversation", data)
    })

    socket.on("answerCall", (data) => {
        socket.to(data.conversation).emit('callAccepted', data.signal)
    })

    socket.on('endCall', conversation => {
        socket.to(conversation).emit('endCall')
    })
//--------------------chatroom--------------------------

    socket.on('joinUserToTheRoom', async userData => {
        const updatedUserList = [...chatroomOnlineUsers, userData]
        chatroomOnlineUsers = _.uniqBy(updatedUserList, e => e.username);
        io.in(userData.chatRoomName).emit('userListUpdated', chatroomOnlineUsers)
    });

    socket.on('joinSocketToTheChatroom', chatRoomName => {
        socket.join(chatRoomName)
    });

    socket.on('onlineUsersList', () => {
        io.to(socket.id).emit('onlineUsersList', _.uniqBy(chatroomOnlineUsers, e => e.username))
    });

    socket.on('messageToChatroom', async newMessageData => {

        try {
            const chatroomData = await chatroomSchema.findOne({name: newMessageData.roomName}).exec()
            if (chatroomData) {
                if (chatroomData.messages.length > 50) {
                    let updatedMessagesLimited = chatroomData.messages.slice(chatroomData.messages.length - 50, chatroomData.messages.length + 1)
                    const updatedMessages = [...updatedMessagesLimited, newMessageData]
                    chatroomSchema.findOneAndUpdate({name: newMessageData.roomName}, {messages: updatedMessages}, {
                        upsert: true,
                        new: true
                    }).then(updatedChatroomData => {
                        io.in(newMessageData.roomName).emit('messageFromChatroom', newMessageData)
                    })
                } else {
                    chatroomSchema.findOneAndUpdate({name: newMessageData.roomName}, {$push: {messages: newMessageData}}, {
                        upsert: true,
                        new: true
                    }).then(updatedChatroomData => {
                        io.in(newMessageData.roomName).emit('messageFromChatroom', newMessageData)
                    })
                }
            } else {
                chatroomSchema.findOneAndUpdate({name: newMessageData.roomName}, {$push: {messages: newMessageData}}, {
                    upsert: true,
                    new: true
                }).then(updatedChatroomData => {
                    io.in(newMessageData.roomName).emit('messageFromChatroom', newMessageData)
                })
            }
        } catch (err) {
            console.log(err)
        }
    });

    socket.on('recentChatRoomMessages', chatRoomName => {
        chatroomSchema.findOne({name: chatRoomName}).then(chatroomData => {
            io.to(socket.id).emit('recentChatRoomMessages', chatroomData?.messages || [])
        })


    });

    socket.on('startTyping', (roomName, username) => {
        socket.to(roomName).emit('startTyping', username)
    });
})

