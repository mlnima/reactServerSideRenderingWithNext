import postSchema from "@schemas/postSchema";
import xHSimilarFinder from "./xHSimilarFinder";
import {Request,Response} from "express";


const findAnotherSimilarSourceLink = async (req:Request, res:Response) => {
    try {
        const postData = await postSchema.findById(req.query.postId).select('source');

        if (postData.source) {
            if (postData.source.includes("xhamster")) {
                const relatedPosts = await xHSimilarFinder({
                    relatedBy: req.query.relatedBy as string,
                    page: parseInt(req.query.page as string) ,
                });
                res.status(200).json({relatedPosts})
                return
            }
        }

        res.status(200).json({relatedPosts: []})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something Went Wrong' });
    }
}

export default findAnotherSimilarSourceLink;