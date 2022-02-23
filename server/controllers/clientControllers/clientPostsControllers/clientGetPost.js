const postSchema = require('../../../models/postSchema');


module.exports = async (req, res) => {
    const _id = req.query._id;
    try {
        if (_id){
          await  postSchema.findById(_id).populate([
                {path: 'categories',select:{'name':1,'type':1}},
                {path: 'tags',select:{'name':1,'type':1}},
                {path: 'actors',select:{'name':1,'type':1}},
                {
                    path:'comments',
                    limite:10,
                    populate:[
                        {
                            path:'author',
                            select:['username','profileImage']
                        }
                        ]
                }
            ]).exec().then(async post => {
                const postMessageToSend = {post, error: false}

                res.json(postMessageToSend);
            }).catch(err => {
                res.status(404).json({message:'not found'})
            })
        }else {
            res.status(404).json({message:'not found'})
        }
    }catch (err){
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
};