import {UserSchema} from 'shared-schemas';

const updateUserData  = (req, res) =>{
    const userID = req.userData._id
    UserSchema.findByIdAndUpdate(userID, {...req.body.data}, { new: true }).exec().then(savedData => {
        res.json({ updatedData: savedData })

    }).catch(err => {
        console.log(err)
        res.end()
    })
}
export default updateUserData