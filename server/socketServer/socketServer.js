require('dotenv').config()
const io = require('socket.io')(process.env.REACT_APP_SOCKET_PORT, {
    cors: {
        origin: [process.env.REACT_APP_PRODUCTION_URL],
    }
})

io.on('connection', socket => {

    socket.on('joinConversation', conversation => {
        socket.join(conversation)
    })
    socket.on('sendMessageToConversation', (messageData, conversation) => {
        socket.to(conversation).emit('receiveMessageFromConversation', messageData)
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
})

