
import userSchema from '../../../models/userSchema';

const clientSendMessage = async (req, res) => {
    try{
        const senderTheMessageData = req.userData;
        const receiverOfTheMessageId = req.body._id;
        const theMessageDataForReceiver = {
            message : req.body.message,
            sender : senderTheMessageData._id,
            date:Date.now(),
            read:false
        };
        const theMessageDataForSender = {
            message : req.body.message,
            receiver : receiverOfTheMessageId,
            date:Date.now(),
        };
        const updateReceiverOfTheMessageData = await userSchema.findByIdAndUpdate(receiverOfTheMessageId,{$push:{inbox:[theMessageDataForReceiver]}}).exec();
        const updateSenderOfTheMessageData = await userSchema.findByIdAndUpdate(senderTheMessageData._id,{$push:{outBox:[theMessageDataForSender]}}).exec();
        Promise.all([updateReceiverOfTheMessageData,updateSenderOfTheMessageData]).then(actionsResults=>{
            res.json({ serverResponse : 'message has been sent' });

        }).catch(err=>{
            console.log(err)
            res.status(500);
        })
    }catch (err) {
        console.log(err)
        res.status(500);

    }

}

export default clientSendMessage