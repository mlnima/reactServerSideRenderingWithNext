require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const _ = require('lodash')
app.use(cors())
const {userJoin, userLeave, getUsersListOfRoom} = require('./users')
let chatroomMessages = []
let chatroomOnlineUsers = []


const io = require('socket.io')(server, {
    origin: [process.env.REACT_APP_PRODUCTION_URL, '*'],
    cors: true,
    handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": process.env.REACT_APP_PRODUCTION_URL,
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "my-custom-header",
            "Access-Control-Allow-Credentials": true
        });
        res.end();
    }
})


app.get('/*', (req, res) => {

});

server.listen(process.env.REACT_APP_SOCKET_PORT, () => {
    console.log(`socket server is running on ${process.env.REACT_APP_SOCKET_PORT}`);
});


io.on('connection', socket => {

    socket.on('setIdAndJoinConversation', async (userID, conversationId) => {
        //setCustomId(userID)
        socket.join(conversationId)
    })

    socket.on('joinConversation', conversation => {
        //console.log(conversation)
        socket.join(conversation)
    })

    socket.on('sendMessageToConversation', (messageData, conversation) => {
        io.in(conversation).emit('receiveMessageFromConversation', messageData)
    })

    socket.on('mySocketId', () => {
        socket.emit("mySocketId", socket.id)
    })

    socket.emit("mySocketId", socket.id)
// ----------------------videoCall---------------------


    socket.on("disconnect", async () => {
        try{
            const disconnectedUserData =  chatroomOnlineUsers.filter(u=>u.socketId === socket.id)
            const newChatroomOnlineUsersList = chatroomOnlineUsers.filter(u=>u.socketId !== socket.id)
            await socket.to(disconnectedUserData.chatRoomName).emit('userListUpdated', newChatroomOnlineUsersList)
            chatroomOnlineUsers = newChatroomOnlineUsersList
            socket.broadcast.emit("endCall")
        }catch (err) {
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

    socket.on("answerCall", (signal, conversation) => {
        socket.to(conversation).emit("callAccepted", signal)
    })
    socket.on("endCall", conversation => {
        socket.to(conversation).emit("endCall")
    })
//--------------------chatroom--------------------------


    socket.on('joinSocketToTheRoom', userData => {
        socket.join(userData.chatRoomName)
        io.to(socket.id).emit('recentMessageOnTheRoom',chatroomMessages)
        chatroomOnlineUsers =  _.uniqBy([...chatroomOnlineUsers,userData],  e => e.username);
        socket.to(userData.chatRoomName).emit('userListUpdated', _.uniqBy([...chatroomOnlineUsers,userData],  e => e.username))
    });

    socket.on('onlineUsersList', () => {
        io.to(socket.id).emit('onlineUsersList',_.uniqBy(chatroomOnlineUsers,  e => e.username))
    });

    socket.on('message', newMessageData => {
            chatroomMessages.length > 100 ?
            chatroomMessages = [...chatroomMessages.shift(), newMessageData] :
            chatroomMessages = [...chatroomMessages, newMessageData]
        io.in(newMessageData.roomName).emit('message', newMessageData)
    });


    socket.on('startTyping', (roomName, username) => {
        socket.to(roomName).emit('startTyping', username)
    });


    // socket.on('myDataIs', (receiverId, roomName, username, userId, profileImage) => {
    //     io.to(receiverId).emit('getChatroomMemberData', roomName, username, userId, profileImage)
    // })


})

