import {PostSchema} from 'shared-schemas';
import fs from 'fs';

const adminPostsBulkAction = async (req, res) => {
    const ids = req.body.ids || [];
    const status = req.body.status;
    let actions;

    if (status === 'delete') {
        actions = ids.map(async id => {
            return PostSchema.findByIdAndDelete(id).exec().then(doc=>{
                if (!doc.mainThumbnail.includes('http')){
                    fs.unlinkSync(`.${doc.mainThumbnail}`);
                }
            })
        })
    } else {
        actions = ids.map(async id => {
            return PostSchema.findByIdAndUpdate(id, {$set: {status}})
        })
    }
    Promise.all(actions).then(() => {
        return res.status(200).json({
            message: 'all done'
        });
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        });
    })
};

export default adminPostsBulkAction;