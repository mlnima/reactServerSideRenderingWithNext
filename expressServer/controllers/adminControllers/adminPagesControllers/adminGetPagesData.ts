import pageSchema from '../../../models/pageSchema';

const adminGetPagesData = (req, res) => {
    pageSchema.find({}).exec().then(pages => {
        res.json({pages, error: false})
    }).catch(err => {
        console.log(err)
        res.end()
    })
}

export default adminGetPagesData;