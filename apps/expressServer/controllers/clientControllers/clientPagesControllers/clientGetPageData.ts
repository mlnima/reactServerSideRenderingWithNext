import pageSchema from '../../../../../packages/models/src/pageSchema';

const clientGetPageData = (req, res) =>{
    const pageId = req.body.id
    const pageName = req.query.pageName

    if (pageId){
        pageSchema.findById(pageId).exec().then(pageData=>{
            res.json({pageData,error:false})
        }).catch(err=>{
            console.log(err)
            res.status(404).json({message:'not found'})
        })
    }else if (pageName){
        pageSchema.findOne({pageName}).exec().then(pageData=>{
            res.json({pageData,error:false})
        }).catch(err=>{
            console.log(err)
            res.status(404).json({message:'not found'})
        })
    }
}

export default clientGetPageData