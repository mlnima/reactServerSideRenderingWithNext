import {PageSchema} from 'shared-schemas';
const adminGetPagesData = (req, res) => {
    PageSchema.find({}).exec().then(pages => {
        res.json({pages, error: false})
    }).catch(err => {
        console.log(err)
        res.end()
    })
}

export default adminGetPagesData;