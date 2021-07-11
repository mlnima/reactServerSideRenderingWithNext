const userSchema = require('../../../models/userSchema');

module.exports  = (req, res) =>{
    const userID = req.userData._id
    userSchema.findByIdAndUpdate(userID, {...req.body.data}, { new: true }).exec().then(savedData => {
        res.json({ updatedData: savedData })
        res.end()
    }).catch(err => {
        console.log(err)
        res.end()
    })
}
