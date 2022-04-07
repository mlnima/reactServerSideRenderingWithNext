const postSchema = require('../../../models/postSchema');
const mongoIdValidator = require('../../../../_variables/util/mongoIdValidator')
const arraySortRandom = require('../../../../_variables/util/arraySortRandom')

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
    'redirectLink',
    'updateAt',
    'createdAt',
]

const populateMeta = [
    {path: 'actors', select: {'name': 1, 'type': 1}},
    {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
    {path: 'tags', select: {'name': 1, 'type': 1}}
]


const getRelatedPosts = async (relatedByType,relatedIds,currentPostId,postType)=>{

    const sortOrder =  arraySortRandom(['likes','views','updateAt','createdAt']).reduce((final,current)=>{
        final[current] = 1
        return final
    },{})

    const findRelatedPostsQuery = {
        $and:[
            {[relatedByType]:{$in:relatedIds}},
            {status:'published'},
            {_id:{$ne:currentPostId}},
            {postType:postType}
        ]
    }
    try{
      const relatedPosts = await postSchema.find(
          findRelatedPostsQuery,
          defaultFieldForPosts,
          {sort:sortOrder}
      ).populate(populateMeta).limit(10).sort('-updatedAt').exec()
        return {[`${relatedByType}RelatedPosts`] : relatedPosts}
    }catch (e){
        return {[`${relatedByType}RelatedPosts`] : []}
    }
}



module.exports = async (req, res) => {

    try {
        const validateId = mongoIdValidator(req.query._id);
        if (validateId){
          const post = await postSchema.findOne({_id:req.query._id},'-comments').populate([
              {path: 'author',select:['username','profileImage','role']},
              {path: 'categories',select:{'name':1,'type':1}},
              {path: 'tags',select:{'name':1,'type':1}},
              {path: 'actors',select:{'name':1,'type':1}},
          ]).exec()
            if (post){

                res.json( {
                    post,
                    relatedPosts:{
                        ...await getRelatedPosts(
                            'actors',
                            //(post?.actors || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                            arraySortRandom((post?.actors || []))?.slice(0,5)?.map(meta=>meta._id),
                            post._id,
                            post.postType
                        ),
                        ...await getRelatedPosts(
                            'categories',
                           // (post?.categories || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                            arraySortRandom((post?.categories || []))?.slice(0,5)?.map(meta=>meta._id),
                            post._id,
                            post.postType
                        ),
                        ...await getRelatedPosts(
                            'tags',
                           // (post?.tags || []).reverse()?.slice(0,5)?.map(meta=>meta._id).reverse()
                            arraySortRandom((post?.tags || [])).reverse()?.slice(0,5)?.map(meta=>meta._id),
                            post._id,
                            post.postType
                        )
                    },
                    error: false
                });
            }
            else {
               // console.error('we didnt found')
                res.status(404).json({message:'not found'})
            }

        }else {
            res.status(404).json({message:'not found'})
        }

    }catch (err){
      //  console.error(err,'get post error')
        res.status(500).json({message:'Something went wrong please try again later'})
    }
};



//(post?.actors || []).filter((meta, index, arr) => index > (post?.actors || []).length - 6)
// ...await getRelatedPosts('actors',(post?.actors || [])?.slice(0,5)?.map(meta=>meta._id)),
// ...await getRelatedPosts('categories',(post?.categories || [])?.slice(0,5)?.map(meta=>meta._id)),
// ...await getRelatedPosts('tags',(post?.tags || [])?.slice(0,5)?.map(meta=>meta._id)),