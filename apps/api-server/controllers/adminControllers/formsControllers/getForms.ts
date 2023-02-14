import {formSchema} from 'models';

const getForms = async (req, res) => {
    
    try {
        console.log(req.query)
        const size = req.query.size ? parseInt(req.query.size) > 500 ? 500 : parseInt(req.query.size) : 30
        const searchQuery = {$or: [{widgetID: new RegExp(req.query.keyword, 'i')}, {data: new RegExp(req.query.keyword, 'i')}]};
        const pageNo = req.query.pageNo || 1;
        let sortQuery = (req.query.sort === 'latest' || !req.query.sort ) ? {_id:-1} : {[req.query.sort]: -1}
//@ts-ignore
        const forms = await formSchema.find().limit(size).sort(sortQuery).exec();
        const totalCount = await formSchema.countDocuments({}).exec()

        res.json({forms, error: false, totalCount})
    }catch (error) {
        console.log(error)
        res.end()
    }

//     const size = req.query.size ? parseInt(req.query.size) > 500 ? 500 : parseInt(req.query.size) : 30
//     const searchQuery = {$or: [{widgetID: new RegExp(req.query.keyword, 'i')}, {data: new RegExp(req.query.keyword, 'i')}]};
//     const pageNo = req.query.pageNo || 1;
//     let sortQuery = (req.query.sort === 'latest' || !req.query.sort ) ? {_id:-1} : {[req.query.sort]: -1}
// console.log(req.body)
//     //   let formsData = formsSchema.find({$and:[searchQuery]}).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec();
//     //  let formsCount = await postSchema.count({$and: [postTypeQuery, statusQuery, authorQuery, searchQueryGenerator(), metaQuery]}).exec()
//     //@ts-ignore
//     let formsData = await formSchema.find().limit(size).sort(sortQuery).exec();
//     let formsCount = await formSchema.countDocuments({}).exec()
//     Promise.all([formsData, formsCount]).then(async foundFormsData => {
//         const forms = foundFormsData[0]
//         res.json({forms, error: false, totalCount: foundFormsData[1]})
//     }).catch(err => {
//
//         res.end()
//     })
}

export default getForms;