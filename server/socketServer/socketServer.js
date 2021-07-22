require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
app.use(cors())
console.log(process.env.REACT_APP_PRODUCTION_URL)
const io = require('socket.io')(server, {
    origin: [process.env.REACT_APP_PRODUCTION_URL,'*'],
    cors:true,
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
        socket.broadcast.emit("endCall")
    })

    socket.on("callUser", (data) => {
        socket.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("callToConversation", data => {
       // socket.to(data.conversation).emit("callToConversation", { callerStreamData: data.callerStreamData, callerId: data.callerId, callerName: data.callerName,conversation:data.conversation })
        socket.to(data.conversation).emit("incomingCallFromConversation", data)
    })

    socket.on("answerCall", (signal , conversation) => {
        socket.to(conversation).emit("callAccepted", signal)
    })
    socket.on("endCall", conversation => {
        socket.to(conversation).emit("endCall" )
    })

})

