import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import {connectToDatabase} from 'custom-server-util';
connectToDatabase().finally()
import {userSchema} from 'models';
import bcrypt from 'bcryptjs';
import defaultAdminAccountData from "../asset/defaultAdminAccountData";

const resetAdminPassword = async ()=>{
   await bcrypt.hash(defaultAdminAccountData.password, 10, (error, hash) =>{
        if (error) {
            console.log(error)
            process.exit()
        } else if (hash) {
            userSchema.findOneAndUpdate({username:'Admin'},{$set:{password:hash}}).then(()=>{
                console.log('Admin Password Reset Was successfully')
            }).catch((error)=>{
                console.log(error)
                console.log('Something Went Wrong')
            }).finally(()=> process.exit())
        }
    });
}

resetAdminPassword()