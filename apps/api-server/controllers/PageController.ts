import {Request, Response} from "express";
import pageSchema from "@schemas/pageSchema";

class PageController{
    static async getPage(req: Request, res: Response){
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
    static async clientGetPagesData(req: Request, res: Response){
        pageSchema
            .find({})
            .exec()
            .then(pagesData => {
                res.json({ pagesData, error: false });
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({ message: 'not found' });
            });
    };

    //---------------------Dashboard--------------------

    static async dashboardCreateNewPage(req: Request, res: Response){
        const newPageDataToSave = new pageSchema(req.body.pageData)
        newPageDataToSave?.save().then(savedPage => {
            res.json({savedPageData: savedPage, error: false})
        }).catch(err => {
            console.log(err)
            res.end()
        })
    }

    static async dashboardUpdatePage(req: Request, res: Response){
        try {
            const updateData = req.body.pageData;
            pageSchema
                .findByIdAndUpdate(updateData._id, updateData, { new: true })
                .exec()
                .then(updated => {
                    res.json({ updated });
                });
        } catch (error) {}
    };

    static async dashboardGetPagesData(req: Request, res: Response){
        pageSchema.find({}).exec().then(pages => {
            res.json({pages, error: false})
        }).catch(err => {
            console.log(err)
            res.end()
        })
    }

    static async dashboardDeleteCustomPage(req: Request, res: Response){
        const pageId = req.body.id
        if (pageId) {
            await pageSchema.findByIdAndDelete(pageId).exec().then(pageData => {
                res.json({message: 'Page Deleted'})
            }).catch(err => {
                console.log(err)
                res.status(400).json({message: 'Page Deleted'})
            })
        } else {
            res.end()
        }
    }

    static async dashboardGetPageData(req: Request, res: Response){
        try {
            await  pageSchema.findById(req.body._id).exec().then(pageData=>{
                res.json({pageData,error:false})
            }).catch(err=>{
                res.status(404).json({message:'Not Found'})
            })
        }catch (err){
            res.status(500).json({message:'Something Went Wrong'})
        }
    }


}

export default PageController;