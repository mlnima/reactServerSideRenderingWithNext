import mongoose from "mongoose";

export const mongoIdValidator = (_id:string) => {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    if (!_id || !objectIdPattern.test(_id)) {
        return false;
    }

    try {
        return mongoose.isValidObjectId(_id);
    } catch (err) {
        return false;
    }
    // try {
    //     return _id ? mongoose.isValidObjectId(_id) : false;
    // } catch (err) {
    //     return false;
    // }
};

export const usernameValidatorRegisterForm = username => {

    if (!username) return false;
    const regex = /^[a-zA-Z][a-zA-Z0-9]{5,14}$/;
    let isValid = regex.test(username);

    if (username.toLowerCase().includes('admin')) {
        isValid = false;
    }
    return isValid;
};

export const passwordValidatorRegisterForm = (password:string) => {
    if (!password) return false;
    return password
        ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/.test(password)
        : false;
};

export const emailValidator = (email:string) => {
    if (!email) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};