import userSchema from '../../../models/userSchema';

const adminDeleteUser = (req, res) => {
    userSchema.findByIdAndDelete(req.body.id).exec().then(() => {
        res.json({message: 'user deleted'});
    })
};

export default adminDeleteUser;