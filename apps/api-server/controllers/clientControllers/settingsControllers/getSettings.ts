import {Request, Response} from 'express';
import {settingSchema} from 'models';

interface GetSettingsQuery {
    setting: string | string[];
}

const getSettings = async (req: Request<{}, {}, {}, GetSettingsQuery>, res: Response): Promise<void> => {
        try {
            const requestedSettings = Array.isArray(req.query.setting) ? req.query.setting : [req.query.setting];

            const settings = await settingSchema.find({type: {$in: requestedSettings}}).exec();
            const reduceSettings = settings.reduce<Record<string, unknown>>((acc, setting) => {
                acc[setting.type] = setting.data
                return acc
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

