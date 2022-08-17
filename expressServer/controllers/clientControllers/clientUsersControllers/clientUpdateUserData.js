const userSchema = require('../../../models/userSchema');

module.exports  = (req, res) =>{
    const userID = req.userData._id
    userSchema.findByIdAndUpdate(userID, {...req.body.data}, { new: true }).exec().then(savedData => {
        res.json({ updatedData: savedData })

    }).catch(err => {
        console.log(err)
        res.end()
    })
}
