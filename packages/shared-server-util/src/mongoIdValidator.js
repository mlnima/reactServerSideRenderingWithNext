import mongoose from 'mongoose';

const mongoIdValidator = (_id:string) => {
    try {
        return _id ? mongoose.isValidObjectId(_id)  : false;
    } catch (err) {
        return false
    }
}

export default mongoIdValidator;