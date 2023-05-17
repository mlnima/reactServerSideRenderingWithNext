import {userSchema} from 'models';

const fetchUserData = async(userId)=> {
    try {
        return await userSchema.findById({_id: userId}).exec();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default fetchUserData;