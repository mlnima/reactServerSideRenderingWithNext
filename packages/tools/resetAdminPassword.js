import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from 'reacticum-server/custom-vaiables/connectToDatabase';
connectToDatabase().finally()
import userSchema from 'reacticum-server/models/userSchema';
import bcrypt from 'bcryptjs';

bcrypt.hash('Admin', 10, function (err, hash) {
    if (err) {
        console.log('Something Went Wrong')
        process.exit()
    } else if (hash) {
        userSchema.findOneAndUpdate({username:'Admin'},{$set:{password:hash}}).then(()=>{
            console.log('Admin Password Restarted')
        }).catch(()=>{
            console.log('Something Went Wrong')
        })
    }
});