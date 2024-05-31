import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';
connectToDatabase().finally()
import {UserSchema} from 'shared-schemas';
import bcrypt from 'bcryptjs';
import defaultAdminAccountData from "../asset/defaultAdminAccountData";

const resetAdminPassword = async ()=>{
   await bcrypt.hash(defaultAdminAccountData.password, 10, (error, hash) =>{
        if (error) {
            console.log(error)
            process.exit()
        } else if (hash) {
            UserSchema.findOneAndUpdate({username:'dashboard'},{$set:{password:hash}}).then(()=>{
                console.log('dashboard Password Reset Was successfully')
            }).catch((error)=>{
                console.log(error)
                console.log('Something Went Wrong')
            }).finally(()=> process.exit())
        }
    });
}

resetAdminPassword()