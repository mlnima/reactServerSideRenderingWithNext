const jwtDecoder = require('jwt-decode');
const tokenExpireTime = '1000h';

const dataDecoder = async (token) => {
    console.log(token)
    try{
        return jwtDecoder(token.split(".")[1])
    }catch(e){
        console.log(e)
    }

}

module.exports = dataDecoder