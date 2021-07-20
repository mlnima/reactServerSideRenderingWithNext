const io = require('socket.io-client')
const url = process.env.NODE_ENV !== 'production' ?
    process.env.REACT_APP_PRODUCTION_URL.replace(process.env.REACT_APP_PORT, process.env.REACT_APP_SOCKET_PORT)  :
    process.env.REACT_APP_PRODUCTION_URL.replace(process.env.REACT_APP_PORT, process.env.REACT_APP_SOCKET_PORT)


module.exports = io(url,{
    path: '/socketServer'
})