// @ts-nocheck
import {Request, Response} from "express";
import settingSchema from "@schemas/settingSchema";
import GlobalStore from "@store/GlobalStore";

class SettingController{
    static async getSettings(req: Request, res: Response){

        try {
            const requestedSettings = Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting];

            const settings = await settingSchema.find({type: {$in: requestedSettings}}).exec();
            const reduceSettings = settings.reduce((final, current) => {
                final[current.type] = current.data
                return final
            }, {})

            res.json({settings: reduceSettings});
        } catch
            (err) {
            console.error('Error fetching settings:', err);
            res.status(404).json({message: 'Not Found'});
        }
    }

    //---------------------Dashboard--------------------
    static async dashboardUpdateSetting(req: Request, res: Response){
        try {
            const type = req.body.type;
            const data = req.body.data;
            await settingSchema.findOneAndUpdate({type: type}, {data}, {new: true,upsert:true}).exec().then(() => {
                res.json({message:'Updated'})
            }).catch(err => {
                console.log(err)
                res.status(500)
            })

            if (type==='initialSettings'){
                await GlobalStore.setInitialSettings()
            }

        }catch (error){

        }

    };

    // static async dashboardGetSettings(req: Request, res: Response){
    //     const setting = await settingSchema.findOne({type: req.query.type}).exec();
    //     res.json({setting})
    // };
    static async dashboardGetSettings(req: Request, res: Response){
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
}

export default SettingController;