require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
app.use(cors())
console.log(process.env.REACT_APP_PRODUCTION_URL)
const io = require('socket.io')(server, {
    cors: {
        origin: [process.env.REACT_APP_PRODUCTION_URL,'*'],
    }
})

app.get('/*', (req, res) => {
   console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
});

server.listen(process.env.REACT_APP_SOCKET_PORT, () => {
    console.log(`socket server is running on ${process.env.REACT_APP_SOCKET_PORT}`);
});


io.on('connection', socket => {
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

