import {PageSchema} from 'shared-schemas';

const adminCreateNewPage = (req, res) => {
    const newPageDataToSave = new PageSchema(req.body.pageData)
    newPageDataToSave?.save().then(savedPage => {
        res.json({savedPageData: savedPage, error: false})
    }).catch(err => {
        console.log(err)
        res.end()
    })
}

export default adminCreateNewPage