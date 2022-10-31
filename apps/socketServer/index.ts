import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';
connectToDatabase('Socket Server')
import http from 'http'
import express from 'express'
import cors from 'cors'
import {chatroomSchema} from 'models'
import {uniqArrayBy} from "custom-util";
const app = express();
const server = http.createServer(app);
// import proxy from 'http-proxy-middleware'
//
// const wsProxy = proxy('/socket.io', {target:'ws://my-websocket.com/', changeOrigin: true, ws:true});


app.use(cors())

// const {userJoin, userLeave, getUsersListOfRoom} = require('./users')
// let chatroomMessages = []
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

//@ts-ignore
server.listen(process.env.SOCKET_SERVER_PORT || 3005, (error) => {
    console.log(`process ${process.pid} : socket server is running at ${process.env.SOCKET_SERVER_PORT}`);
});


io.on('connection', socket => {

    // server.on('upgrade', wsProxy.upgrade);

    // io.on('connection', function (socket) {
    //     setInterval(() => {
    //         console.log('****************************************************I am the Socket Server')
    //         io.emit('event', { data: 'worked successfully!' });
    //     }, 1000);
    // });


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
        //chatroomOnlineUsers = _.uniqBy(updatedUserList, e => e.username);
        chatroomOnlineUsers = uniqArrayBy(updatedUserList, 'username');
        io.in(userData.chatRoomName).emit('userListUpdated', chatroomOnlineUsers)
    });

    socket.on('joinSocketToTheChatroom', chatRoomName => {
        socket.join(chatRoomName)
    });

    socket.on('onlineUsersList', () => {
        //io.to(socket.id).emit('onlineUsersList', _.uniqBy(chatroomOnlineUsers, e => e.username))
        io.to(socket.id).emit('onlineUsersList', uniqArrayBy(chatroomOnlineUsers, 'username'))
    });

    socket.on('messageToChatroom', async newMessageData => {

        try {
            const chatroomData = await chatroomSchema.findOne({name: newMessageData.roomName}).exec()
            //@ts-ignore
            if (chatroomData?.messages) {
                //@ts-ignore
                if (chatroomData?.messages?.length > 50) {
                    //@ts-ignore
                    let updatedMessagesLimited = chatroomData.messages.slice(chatroomData.messages?.length - 50, chatroomData.messages?.length + 1)
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
            //@ts-ignore
            io.to(socket.id).emit('recentChatRoomMessages', chatroomData?.messages || [])
        })


    });

    socket.on('startTyping', (roomName, username) => {
        socket.to(roomName).emit('startTyping', username)
    });
})

