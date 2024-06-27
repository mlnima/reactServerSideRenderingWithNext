import { Request, Response } from 'express';
import fsExtra from 'fs-extra';
import path from 'path';
import metaSchema from '@schemas/metaSchema';
import fs from 'fs';

class BackupController {
    static async metas(req: Request, res: Response) {
        try {
            fsExtra.ensureDirSync(path.join(__dirname + `../../../../public/backups/`));
            const fieldsQuery = req.body.fields.map((field: string) => `-${field}`).join(' ');
            const metaTypeQuery = req.body.metaType ? { $and: [{ type: req.body.metaType }] } : {};
            const metas = await metaSchema
                .find(metaTypeQuery)
                .select(fieldsQuery)
                .limit(req.body.limit || -1)
                .sort('-count')
                .exec();
            const filePath = `/public/backups/${req.body.metaType}.json`;
            const fileAbsolutePath = path.join(__dirname + `../../../../${filePath}`);
            fs.writeFileSync(fileAbsolutePath, JSON.stringify(metas), {
                encoding: 'utf8',
                flag: 'w',
            });
            res.download(fileAbsolutePath);
        } catch (error) {
            res.end();
        }
    }
}

export default BackupController;
