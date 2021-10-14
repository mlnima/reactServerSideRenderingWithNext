const jwtDecoder = require('jwt-decode');
const tokenExpireTime = '1000h';

const dataDecoder = async (token) => {

    try{
        return jwtDecoder(token.split(".")[1])
    }catch(err){
        console.log(err)
    }

}

module.exports = dataDecoder