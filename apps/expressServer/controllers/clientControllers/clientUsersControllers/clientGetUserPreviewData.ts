import userSchema from '../../../../../packages/models/src/userSchema';

const clientGetUserPreviewData = (req, res) => {
    const username  =  req.body.username;
    const _id = req.body._id;
    const defaultField = ['username', 'role' ,'profileImage', 'coverImage']
    const fields = req.body.fields  ?  [...defaultField,...req.body.fields] : defaultField

    userSchema.findOne({$or:[{username},{_id}]}).select(fields).exec().then(user=>{
        res.json({ userData: user });

    }).catch(err => {
        console.log(err);
        res.status(500);

    })
}

export default clientGetUserPreviewData