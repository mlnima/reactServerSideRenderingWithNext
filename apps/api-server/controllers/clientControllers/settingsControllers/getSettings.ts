import {Request, Response} from 'express';
import {SettingSchema} from 'shared-schemas';

interface GetSettingsQuery {
    setting: string | string[];
}

const getSettings = async (req: Request<{}, {}, {}, GetSettingsQuery>, res: Response): Promise<void> => {
        try {
            const requestedSettings = Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting];

            const settings = await SettingSchema.find({type: {$in: requestedSettings}}).exec();
            const reduceSettings = settings.reduce((final:{}, current:{type:string,data:{}}) => {
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

