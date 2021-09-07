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

    socket.on('socketId', () => {
        socket.emit("socketId", socket.id)
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
        io.in(conversation).emit('receiveMessageFromConversation', messageData)
    })




// ----------------------videoCall---------------------


    socket.on("disconnect", () => {
        try{
            const disconnectedUserData =  chatroomOnlineUsers.find(u=>u.socketId === socket.id)
            if (disconnectedUserData ){
                const newChatroomOnlineUsersList = chatroomOnlineUsers.filter(u=>u.socketId !== socket.id)
                chatroomOnlineUsers = newChatroomOnlineUsersList
                socket.to(disconnectedUserData.chatRoomName).emit('userListUpdated', chatroomOnlineUsers)
            }

            // if (socket){
            //     socket.broadcast.emit("endCall")
            // }

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

    socket.on('joinUserToTheRoom', async userData => {
        const updatedUserList = [...chatroomOnlineUsers,userData]
        chatroomOnlineUsers =  _.uniqBy(updatedUserList,  e => e.username);
        io.in(userData.chatRoomName).emit('userListUpdated', chatroomOnlineUsers)
    });

    socket.on('joinSocketToTheChatroom', chatRoomName => {
        socket.join(chatRoomName)
    });

    socket.on('onlineUsersList', () => {
        io.to(socket.id).emit('onlineUsersList',_.uniqBy(chatroomOnlineUsers,  e => e.username))
    });

    socket.on('messageToChatroom', newMessageData => {
            chatroomMessages.length > 100 ?
            chatroomMessages = [...chatroomMessages.shift(), newMessageData] :
            chatroomMessages = [...chatroomMessages, newMessageData]
            io.in(newMessageData.roomName).emit('messageFromChatroom', newMessageData)
    });

    socket.on('recentChatRoomMessages', () => {
        io.to(socket.id).emit('recentChatRoomMessages',chatroomMessages)
    });

    socket.on('startTyping', (roomName, username) => {
        socket.to(roomName).emit('startTyping', username)
    });
})

