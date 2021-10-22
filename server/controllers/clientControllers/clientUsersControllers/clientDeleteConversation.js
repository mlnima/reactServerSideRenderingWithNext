//clientDeleteConversation
const userSchema = require('../../../models/userSchema')
const conversationSchema = require('../../../models/conversationSchema')


module.exports = async (req, res) => {
    console.log(req.query._id,req.userData._id)
    try {
        const conversationId = req.query._id;
        const userData = await userSchema.findById(req.userData._id).exec();
        const conversationData = await conversationSchema.findById(conversationId).exec();
        if (!userData || !conversationData ) res.sendStatus(404).json({message:'Can Not Find User Or Conversation Data'})
        if (conversationData?.users.includes(userData._id)){
            await userSchema.findByIdAndUpdate(req.userData._id,{$pull:{conversations:[conversationId]}}).exec()
            await userSchema.findByIdAndUpdate(conversationData?.users.find(user=>user._id !== userData._id),{$pull:{conversations:[conversationId]}}).exec()
            await conversationSchema.findByIdAndDelete(conversationId).exec().then(()=>{
                res.json({message:'Deleted'})
            }).catch(err=>{
                res.sendStatus(500).json({message:'Something Went Wrong',err})
            })
        }else {
            res.sendStatus(400).json({message:'Something Went Wrong'})
        }

    }catch (err){
        console.log(err)
        res.sendStatus(500).json({message:'Something Went Wrong'})
    }

}