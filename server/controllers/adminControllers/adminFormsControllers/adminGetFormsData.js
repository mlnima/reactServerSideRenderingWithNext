const formSchema = require('../../../models/formSchema');

module.exports =  async (req, res) => {

    const size = parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size)
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
        res.end()

    })
}