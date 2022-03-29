const {isValidObjectId} = require("mongoose");

const mongoIdValidator = (_id)=>{
    try {

        return _id.match(/^[0-9a-fA-F]{24}$/) && isValidObjectId(_id)
    }catch (err){
        return false
    }
}

module.exports = mongoIdValidator