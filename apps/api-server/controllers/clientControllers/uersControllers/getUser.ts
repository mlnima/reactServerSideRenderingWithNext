import { userSchema } from 'models';

const getUser = async (req, res) => {
    try {
        const { username, _id, fields } = req.query;
        const defaultFields = ['username', 'role', 'profileImage'];
        const selectedFields = fields ? [...defaultFields, ...fields] : defaultFields;

        userSchema
            .findOne({ $or: [{ username }, { _id }] })
            .select(selectedFields)
            .populate([
                { path: 'profileImage', select: { 'filePath': 1 }, model: 'file' },
                { path: 'images', select: { 'filePath': 1 }, model: 'file' },
            ])
            .exec()
            .then((user) => {
                res.json({ userData: user });
            })
            .catch((err) => {
                console.error('Error fetching user:', err);
                res.status(500).json({ message: 'Something went wrong' });
            });
    } catch (e) {
        console.error('Error in getUser function:', e);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default getUser;