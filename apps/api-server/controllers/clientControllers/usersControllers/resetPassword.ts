import bcrypt from 'bcryptjs';
import {userSchema} from 'models';

const resetPassword = (req, res) => {
    const userId = req.userData._id
    if (!userId) return res.status(403).json({message:'Unauthorized Access'})
    userSchema.findById(userId).exec().then(userData => {
        bcrypt.compare(req.body.data.password, userData.password, async function (err, isCorrect) {
            if (err || isCorrect === false) {
                res.status(403).json({message:'Wrong Password'})
            } else if (isCorrect) {
                if (req.body.data.newPassword === req.body.data.repeatNewPassword) {
                    await bcrypt.hash(req.body.data.newPassword, 10, function (err, hash) {
                        if (err) {
                            console.log(err)
                            res.status(400).json({message:'Something went wrong please try again later'})
                        } else if (hash) {
                            userSchema.findByIdAndUpdate(userId, { $set: { password: hash } },{new:true}).exec().then(()=>{
                                res.json({ message: 'Your Password Has Been Changed' });
                            })
                        }
                    });

                } else {
                    res.status(400).json({message:'Mismatch Passwords'})
                }

            }
        })
    })

}

export default resetPassword