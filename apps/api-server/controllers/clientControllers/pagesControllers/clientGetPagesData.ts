import {PageSchema} from 'shared-schemas';

const clientGetPagesData = (req, res) =>{
    PageSchema.find({}).exec().then(pagesData=>{
        res.json({pagesData,error:false})
    }).catch(err=>{
        console.log(err)
        res.status(404).json({message:'not found'})
    })
}

export default clientGetPagesData