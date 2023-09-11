import {userSchema} from 'models';

const adminDeleteUser = (req, res) => {
    userSchema.findByIdAndDelete(req.query._id).exec()
        .then((result) => {
            if (!result) {
                return res.status(404).json({message: 'No user found with this id'});
            }
            res.json({message: 'UserModel deleted'});
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({message: 'Something went wrong. Please try again later.'});
        });
};

export default adminDeleteUser;