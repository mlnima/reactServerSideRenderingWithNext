import {userSchema} from 'models';

const fetchUserData = async(_id:string)=> {
    try {
        return await userSchema.findById(_id).exec();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default fetchUserData;