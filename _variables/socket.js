//
// const io = require('socket.io-client')
//
// module.exports = io(process.env.NEXT_PUBLIC_SOCKET_URL)

import { io } from "socket.io-client";

export const socket =  io(process.env.NEXT_PUBLIC_SOCKET_URL)
// export default io(process.env.NEXT_PUBLIC_SOCKET_URL)