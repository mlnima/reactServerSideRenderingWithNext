const jwtDecoder = require('jwt-decode');
const tokenExpireTime = '1000h';

const dataDecoder = (token) => {
    return jwtDecoder(token)
}

module.exports = dataDecoder