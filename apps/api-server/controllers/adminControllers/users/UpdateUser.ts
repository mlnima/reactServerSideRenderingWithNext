import {userSchema} from 'models';

const updateUser = (req, res) => {
    const userID = req.body.data._id
    userSchema.findByIdAndUpdate(userID, {...req.body.data}, {new: true}).exec().then(savedData => {
        res.json({updatedData: savedData})
    }).catch(err => {
        console.log(err)
        res.end()
    })
}
export default updateUser