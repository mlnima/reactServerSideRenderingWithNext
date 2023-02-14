import {chatroomSchema} from 'models';

const deleteChatroomMessage = async (req, res) => {

    try {
        // const chatroomData =  await chatroomSchema.findOne({roomName: req.query.chatroomName}).exec()


        console.log(req.query.chatroomName,req.query.messageId)
        // console.log(chatroomData)
        console.log('---------------')
        // res.end()

        await chatroomSchema.findOneAndUpdate({roomName: req.query.chatroomName}, {$pull:{messages:{$elemMatch:{id:req.query.messageId}}}},{new:true,multi: true}).exec()
        //await chatroomSchema.findOneAndUpdate({roomName: req.query.chatroomName}, {$pull:{messages:{id:req.query.messageId}}},{new:true,safe: true}).exec()
        // await chatroomSchema.findOneAndUpdate({roomName: req.query.chatroomName}, {$pull:{'messages.$[].id':req.query.messageId}},{new:true,safe: true}).exec()


            .then((updated) => {
            console.log(updated)
            res.json({message: 'user deleted'});
        })
    }catch (error) {
        res.end()
    }

};

export default deleteChatroomMessage;