import postSchema from "@schemas/postSchema";
import xHSimilarFinder from "./xHSimilarFinder";

const findAnotherSimilarSourceLink = async (req, res) => {
    try {
        const postData = await postSchema.findById(req.query.postId).select('source');

        if (postData.source) {
            if (postData.source.includes("xhamster")) {
                const relatedPosts = await xHSimilarFinder({
                    relatedBy: req.query.relatedBy,
                    page: req.query.page,
                });
                res.status(200).json({relatedPosts})
                return
            }
        }

        res.status(200).json({relatedPosts: []})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export default findAnotherSimilarSourceLink;