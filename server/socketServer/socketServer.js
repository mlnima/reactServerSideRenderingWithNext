require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const socketIo = require("socket.io");


// const io = socketIo(server);

// app.get('/', (req, res) => {
//     res.send('<h1>Access Denied</h1>');
// });

app.get('*', (req, res) => {
   console.log(req.url)
});

server.listen(process.env.REACT_APP_SOCKET_PORT, () => {
    console.log(`socket server is running on ${process.env.REACT_APP_SOCKET_PORT}`);
});






const io = require('socket.io')(server, {
    // path: '/socketServer',
    cors: {
        origin: [process.env.REACT_APP_PRODUCTION_URL],
    }
})


const setCustomId = (id) =>{
    io.engine.generateId = () => {
        return id
    };
}


io.on('connection', socket => {
    console.log(socket.id)
    socket.on('setIdAndJoinConversation', async (userID , conversationId) => {
        //setCustomId(userID)
        socket.join(conversationId)
    })

    socket.on('joinConversation', conversation => {
        socket.join(conversation)
    })

    socket.on('sendMessageToConversation', (messageData, conversation) => {
        socket.to(conversation).emit('receiveMessageFromConversation', messageData)
    })

// -------------------------------------------------
    socket.emit("mySocketId", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        socket.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("callToConversation", data => {
       // socket.to(data.conversation).emit("callToConversation", { callerStreamData: data.callerStreamData, callerId: data.callerId, callerName: data.callerName,conversation:data.conversation })
        socket.to(data.conversation).emit("incomingCallFromConversation", data)
    })

    socket.on("answerCall", (data) => {
        //socket.to(data.to).emit("callAccepted", data.signal)
        socket.to(data.to).emit("callAccepted", data.signal)
    })

})

