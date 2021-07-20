const io = require('socket.io-client')
const url = process.env.NODE_ENV !== 'production' ?
    process.env.REACT_APP_PRODUCTION_URL.replace(process.env.REACT_APP_PORT, process.env.REACT_APP_SOCKET_PORT) + '/socketIoServer' :
    process.env.REACT_APP_PRODUCTION_URL.replace(process.env.REACT_APP_PORT, process.env.REACT_APP_SOCKET_PORT) + '/socketIoServer'


module.exports = io(url,{
    path: '/socketIoServer'
})