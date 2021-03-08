const contactFromSchema = require('../models/contactFromSchema')
const formsSchema = require('../models/formSchema')
const formController = {}


formController.contact = (req, res) => {
    const contactData = req.body.data
    const ContactDataToSave = new contactFromSchema(contactData)
    ContactDataToSave.save().then(savedData => {
        res.json({savedData})
        res.end()
    }).catch(err => {
        console.log(err)
    })

}


formController.widgetForm = (req, res) => {
    const formData = req.body.data
    const formDataDataToSave = new formsSchema(formData)
    formDataDataToSave.save().then(savedData => {
        res.json({savedData})
        res.end()
    }).catch(err => {
        console.log(err)
    })
}

formController.getFormsData = async (req, res) => {

    const size = parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size)
    const searchQuery = {$or: [{widgetID: new RegExp(req.body.keyword, 'i')}, {data: new RegExp(req.body.keyword, 'i')}]};
    const pageNo = req.body.pageNo || 1;
    let sortQuery = req.body.sort === 'latest' ? '-_id' : {[req.body.sort]: -1}

    //   let formsData = formsSchema.find({$and:[searchQuery]}).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec();
    //  let formsCount = await postSchema.count({$and: [postTypeQuery, statusQuery, authorQuery, searchQueryGenerator(), metaQuery]}).exec()
    let formsData = await formsSchema.find().limit(size).sort(sortQuery).exec();
    let formsCount = await formsSchema.countDocuments({}).exec()
    Promise.all([formsData, formsCount]).then(async foundFormsData => {
        const forms = foundFormsData[0]
        res.json({forms, error: false, totalCount: foundFormsData[1]})
        res.end()

    })
}
formController.getFormData = async (req, res) => {
    const _id = req.body._id
    console.log(req.body)
    formsSchema.findById(_id).exec().then(formData=>{
        res.json({form:formData,error:false})
        res.end()
    })
}


module.exports = formController;