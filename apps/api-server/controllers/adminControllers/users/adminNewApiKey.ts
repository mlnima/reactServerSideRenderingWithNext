import {UserSchema} from 'shared-schemas';
import uuidAPIKey from 'uuid-apikey';

const adminNewApiKey = (req, res) => {
    const newAPIKey = uuidAPIKey.create()
    const newUserData = {
        ...req.userData,
        API_KEY: newAPIKey.apiKey,
        uuid: newAPIKey.uuid
    }
    UserSchema.findByIdAndUpdate(req.userData._id, newUserData).exec().then(savedData => {
        res.json({updatedData: savedData})

    }).catch(err => {
        console.log(err)
        res.end()
    })
}

export default adminNewApiKey;