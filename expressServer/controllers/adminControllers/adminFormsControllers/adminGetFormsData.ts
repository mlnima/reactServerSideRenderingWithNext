import formSchema from '../../../models/formSchema';

const adminGetFormsData = async (req, res) => {

    const size = req.body.size ? parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size) : 30
    const searchQuery = {$or: [{widgetID: new RegExp(req.body.keyword, 'i')}, {data: new RegExp(req.body.keyword, 'i')}]};
    const pageNo = req.body.pageNo || 1;
    let sortQuery = req.body.sort === 'latest' ? '-_id' : {[req.body.sort]: -1}

    //   let formsData = formsSchema.find({$and:[searchQuery]}).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec();
    //  let formsCount = await postSchema.count({$and: [postTypeQuery, statusQuery, authorQuery, searchQueryGenerator(), metaQuery]}).exec()
    let formsData = await formSchema.find().limit(size).sort(sortQuery).exec();
    let formsCount = await formSchema.countDocuments({}).exec()
    Promise.all([formsData, formsCount]).then(async foundFormsData => {
        const forms = foundFormsData[0]
        res.json({forms, error: false, totalCount: foundFormsData[1]})
    }).catch(err => {

        res.end()
    })
}

export default adminGetFormsData;