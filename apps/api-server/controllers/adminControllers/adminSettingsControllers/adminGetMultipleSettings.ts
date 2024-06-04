import settingSchema from "@schemas/settingSchema";


const adminGetMultipleSettings = async (req, res) => {
    try {

        const requestedSettings = Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting]
        let responseData = {}

        for await (const setting of requestedSettings){
            responseData = {
                ...responseData,
                [setting]: await settingSchema.findOne({type: setting}).exec() || {}
            }
        }

        res.json({settings:responseData})


    } catch (err) {
        console.log(err)
        res.status(404).json('Not Found')
    }
};

export default adminGetMultipleSettings;