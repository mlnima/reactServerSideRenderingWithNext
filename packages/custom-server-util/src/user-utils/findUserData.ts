import {UserSchema} from 'shared-schemas';

const fetchUserData = async(_id:string)=> {
    try {
        return await UserSchema.findById(_id).exec();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default fetchUserData;