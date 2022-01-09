//resetAdminPassword
const userSchema = require('../server/models/userSchema')
const bcrypt = require('bcryptjs');
require('../server/_variables/connectToDatabase')

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