import metaSchema from '@schemas/metaSchema';

const adminDeleteMeta = (req, res) => {
    const _id = req.body._id;
    metaSchema
        .findByIdAndDelete(_id)
        .exec()
        .then(() => {
            res.json({ message: 'deleted' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Can Not Delete', err });
        });
};

export default adminDeleteMeta;
