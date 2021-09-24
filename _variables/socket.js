const io = require('socket.io-client')
module.exports = io(process.env.NEXT_PUBLIC_SOCKET_URL)