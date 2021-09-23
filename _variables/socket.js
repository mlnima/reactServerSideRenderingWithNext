const io = require('socket.io-client')
// const url = process.env.NODE_ENV !== 'production' ?
//     process.env.NEXT_PUBLIC_PRODUCTION_URL.replace(process.env.NEXT_PUBLIC_PORT, process.env.NEXT_PUBLIC_SOCKET_PORT)  :
//     process.env.NEXT_PUBLIC_PRODUCTION_URL.replace(process.env.NEXT_PUBLIC_PORT, process.env.NEXT_PUBLIC_SOCKET_PORT)
const url = process.env.NEXT_PUBLIC_PRODUCTION_URL.replace(process.env.PORT, process.env.SOCKET_PORT)


module.exports = io(url)