const postSchema = require('../../../models/postSchema');
const mongoose = require("mongoose");

const defaultFieldForPosts= [
    'title',
    'mainThumbnail',
    'quality',
    'likes',
    'disLikes',
    'views',
    'duration',
    'postType',
    'price',
    'translations',
    'videoTrailerUrl',
    'rating',
    'redirectLink'
]

const populateMeta = [
    {path: 'actors', select: {'name': 1, 'type': 1}},
    {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
    {path: 'tags', select: {'name': 1, 'type': 1}}
]


const getRelatedPosts = async (relatedByType,relatedIds)=>{
    try{
      const relatedPosts = await postSchema.find(
            {$and:[{[relatedByType]:{$in:relatedIds}},{status:'published'}]},
            defaultFieldForPosts
        ).populate(populateMeta).limit(6).sort('-updatedAt').exec()
        return {[`${relatedByType}RelatedPosts`] : relatedPosts}
    }catch (e){
        return {[`${relatedByType}RelatedPosts`] : []}
    }
}



module.exports = async (req, res) => {
    // const _id = req.query._id;

    try {
        const validateId = req.query._id ? mongoose.isValidObjectId(req.query._id) && req.query._id.match(/^[0-9a-fA-F]{24}$/) : false;
        if (validateId){
          const post = await postSchema.findOne({_id:req.query._id,status:'published'},'-comments').populate([
              {path: 'author',select:['username','profileImage','role']},
              {path: 'categories',select:{'name':1,'type':1}},
              {path: 'tags',select:{'name':1,'type':1}},
              {path: 'actors',select:{'name':1,'type':1}},
          ]).exec()
            if (post){
                res.json( {
                    post,
                    relatedPosts:{
                        ...await getRelatedPosts('actors',(post?.actors || [])?.slice(0,5)?.map(meta=>meta._id)),
                        ...await getRelatedPosts('categories',(post?.categories || [])?.slice(0,5)?.map(meta=>meta._id)),
                        ...await getRelatedPosts('tags',(post?.tags || [])?.slice(0,5)?.map(meta=>meta._id)),
                    },
                    error: false
                });
            }
            else {
                console.error('we didnt found')
                res.status(404).json({message:'not found'})
            }



        }else {
            res.status(404).json({message:'not found'})
        }
    }catch (err){
        console.error(err,'get post error')
        res.status(500).json({message:'Something went wrong please try again later'})
    }
};