const io = require('socket.io-client')
const url = process.env.NODE_ENV !== 'production' ?
    process.env.REACT_APP_PRODUCTION_URL.replace(process.env.REACT_APP_PORT, parseInt(process.env.REACT_APP_PORT) + 1) :
    process.env.REACT_APP_PRODUCTION_URL.replace(process.env.REACT_APP_PORT, parseInt(process.env.REACT_APP_PORT) + 1)


module.exports = io(url)