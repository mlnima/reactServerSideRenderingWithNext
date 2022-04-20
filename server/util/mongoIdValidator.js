const mongoose = require('mongoose')

const mongoIdValidator = (_id)=>{
    try {
        return  _id ? mongoose.isValidObjectId(_id) && _id?.match(/^[0-9a-fA-F]{24}$/) : false;
    }catch (err){
        return false
    }
}

module.exports = mongoIdValidator