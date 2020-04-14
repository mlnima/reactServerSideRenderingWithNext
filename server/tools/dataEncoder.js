const jwt = require('jsonwebtoken');
const tokenExpireTime = '1000h';

const dataEncoder =  (data) =>{

   return   jwt.sign(data,
       process.env.REACT_APP_JWT_KEY,
        { expiresIn: tokenExpireTime });
}

module.exports = dataEncoder