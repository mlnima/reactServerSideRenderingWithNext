import {PostSchema} from 'shared-schemas';

const attendToEvent =async (req, res) => {
    try {

        let update

        if (req.body.actionType === 'attend') {
            update = {$addToSet: {'uniqueData.attenders': req.body.userId}}
        } else if (req.body.actionType === 'unAttend') {
            update = {$pull: {'uniqueData.attenders': req.body.userId}}
        }

       await PostSchema.findByIdAndUpdate(req.body.id, update, {new: true, timestamps: true})
            .select('uniqueData')
            .exec().then(updatedPost => {
            res.json({updatedPost})
        }).catch(err => {
            console.log(err)
            res.end()
        })


    } catch (error) {

    }


};

export default attendToEvent;