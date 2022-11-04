import {pageSchema} from 'models';

const adminCreateNewPage = (req, res) => {
    const newPageDataToSave = new pageSchema(req.body.pageData)
    newPageDataToSave?.save().then(savedPage => {
        res.json({savedPageData: savedPage, error: false})
    }).catch(err => {
        console.log(err)
        res.end()
    })
}

export default adminCreateNewPage