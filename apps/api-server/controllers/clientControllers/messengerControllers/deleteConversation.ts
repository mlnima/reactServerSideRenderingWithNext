// import {userSchema,conversationSchema} from 'models';


const deleteConversation = async (req, res) => {

    try {
        // const conversationId = req.query._id;
        // const userData = await userSchema.findById(req.userData._id).exec();
        // const conversationData = await conversationSchema.findById(conversationId).exec();
        // if (!userData || !conversationData ) res.status(404).json({message:'Can Not Find UserModel Or Conversation Data'})
        // if (conversationData?.users.includes(userData._id)){
        //     await userSchema.findByIdAndUpdate(req.userData._id,{$pull:{conversations:[conversationId]}}).exec()
        //     await userSchema.findByIdAndUpdate(conversationData?.users.find(user=>user._id !== userData._id),{$pull:{conversations:[conversationId]}}).exec()
        //     await conversationSchema.findByIdAndDelete(conversationId).exec().then(()=>{
        //         res.json({message:'Deleted'})
        //     }).catch(err=>{
        //         res.status(500).json({message:'Something Went Wrong',err})
        //     })
        // }else {
        //     res.status(400).json({message:'Something Went Wrong'})
        // }
        res.end()

    }catch (err){
        console.log(err)
        res.status(500).json({message:'Something Went Wrong'})
    }

}

export default deleteConversation