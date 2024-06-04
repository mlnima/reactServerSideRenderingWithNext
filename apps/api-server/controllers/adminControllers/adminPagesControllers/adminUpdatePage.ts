import pageSchema from '@schemas/pageSchema';

const adminUpdatePage = (req, res) => {
    try {
        const updateData = req.body.pageData;
        pageSchema
            .findByIdAndUpdate(updateData._id, updateData, { new: true })
            .exec()
            .then(updated => {
                res.json({ updated });
            });
    } catch (error) {}
};

export default adminUpdatePage;
