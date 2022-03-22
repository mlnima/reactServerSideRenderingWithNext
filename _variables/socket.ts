import { io } from "socket.io-client";
export default io(process.env.NEXT_PUBLIC_SOCKET_URL)




// const io = require('socket.io-client')
//module.exports = io(process.env.NEXT_PUBLIC_SOCKET_URL)