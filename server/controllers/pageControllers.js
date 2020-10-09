let pageControllers = {}
const pageSchema = require('../models/pageSchema')
pageControllers.new = (req, res) =>{
    const newPageDataToSave = new pageSchema(req.body.pageData)
    newPageDataToSave.save().then(savedPage=>{
        res.json({savedPageData:savedPage,error:false})
        res.end()
    }).catch(err=>{
        console.log(err)
        res.end()
    })
}
pageControllers.update = (req, res) =>{
    const updateData = req.body.pageData
    console.log(req.body)
    pageSchema.findByIdAndUpdate(updateData._id,updateData, {new: true}).exec().then(updated=>{
        res.json({updated,error:false})
        res.end()
    })
}
pageControllers.getPageData = (req, res) =>{
    const pageId = req.body.id
    const pageName = req.body.pageName
    console.log(req.body)
    if (pageId){
        pageSchema.findById(pageId).exec().then(pageData=>{
            res.json({pageData,error:false})
            res.end()
        }).catch(err=>{
            console.log(err)
            res.end()
        })
    }else if (pageName){
        pageSchema.findOne({pageName}).exec().then(pageData=>{
            console.log(pageData)
            res.json({pageData,error:false})
            res.end()
        }).catch(err=>{
            console.log(err)
            res.end()
        })
    }


}

pageControllers.getPagesData = (req, res) =>{
    pageSchema.find({}).exec().then(pagesData=>{
        res.json({pagesData,error:false})
        res.end()
    }).catch(err=>{
        console.log(err)
        res.end()
    })
}
//

module.exports = pageControllers