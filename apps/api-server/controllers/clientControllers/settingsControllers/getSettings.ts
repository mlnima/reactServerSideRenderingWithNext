import {Request, Response} from 'express';
import settingSchema from "@schemas/settingSchema";

interface GetSettingsQuery {
    setting: string | string[];
}


const getSettings = async (req: Request<{}, {}, {}, GetSettingsQuery>, res: Response): Promise<void> => {
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
;
export default getSettings;

