import pageSchema from '../../../models/pageSchema';

const adminDeleteCustomPage = (req, res) => {
    const pageId = req.body.id
    if (pageId) {
        pageSchema.findByIdAndDelete(pageId).exec().then(pageData => {
            res.json({message: 'Page Deleted'})
        }).catch(err => {
            console.log(err)
            res.status(400).json({message: 'Page Deleted'})
        })
    } else {
        res.end()
    }
}

export default adminDeleteCustomPage;