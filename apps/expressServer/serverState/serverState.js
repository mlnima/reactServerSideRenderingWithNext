// const settingSchema = require('../models/settings/settingSchema');
import settingSchema from '../../../packages/models/src/settings/settingSchema';

class ServerState {
    constructor() {
        this.state={

        }
    }

    getSettings (){
        const identitySetting = settingSchema.findOne({type:'identity'}).exec()
    }
}

module.exports = ServerState