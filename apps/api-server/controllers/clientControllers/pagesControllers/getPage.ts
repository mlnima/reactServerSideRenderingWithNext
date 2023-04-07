import {Request, Response} from 'express';
import {pageSchema} from 'models';

interface GetPageRequestQuery {
    pageName: string;
}

const getPage = async (req: Request<{}, {}, GetPageRequestQuery>, res: Response): Promise<void> => {
    const {pageName} = req.query;
    try {
        const pageData = await pageSchema.findOne({pageName}).exec();
        if (pageData) {
            res.json({pageData, error: false});
        } else {
            res.status(404).json({message: 'Not found'});
        }
    } catch (error) {
        console.error('Error fetching page:', error);
        res.status(500).json({message: 'Something went wrong'});
    }
};
export default getPage


// if (pageId){
//     pageSchema.findById(_id).exec().then(pageData=>{
//         res.json({pageData,error:false})
//     }).catch(err=>{
//         console.log(err)
//         res.status(404).json({message:'not found'})
//     })
// }else if (pageName){
//     pageSchema.findOne({pageName}).exec().then(pageData=>{
//         res.json({pageData,error:false})
//     }).catch(err=>{
//         console.log(err)
//         res.status(404).json({message:'not found'})
//     })
// }