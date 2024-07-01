// @ts-nocheck
import { Request, Response } from 'express';
import fsExtra from 'fs-extra';
import path from 'path';
import metaSchema from '@schemas/metaSchema';
import fs from 'fs';
import {multiQueryUniquer} from "@util/queryUtil";

const dev = process.env.NODE_ENV !== 'production';
const outputFolderFromHere = dev ? `../public/backups/`:`../../public/backups/`
const outputPath =  path.join(__dirname , outputFolderFromHere)
class BackupController {
    static async metas(req: Request, res: Response) {
        const {fields,metaType,limit}  = req.query
        try {
            fsExtra.ensureDirSync(outputPath);
            const fieldsQuery = fields.map((field: string) => `-${field}`).join(' ');
            const metaTypeQuery = req.query.metaType ? { $and: [{ type: metaType }] } : {};
            const metas = await metaSchema
                .find(metaTypeQuery)
                .select(fieldsQuery)
                .limit(req.query.limit? parseInt(multiQueryUniquer(limit)) :-1)
                .sort('-count')
                .exec();

            // const filePath = `${outputPath}${metaType}.json`;
            // const fileAbsolutePath = path.join(__dirname , (dev ? `../public/backups/${metaType}.json`:`../../public/backups/${metaType}.json`));
            // console.log(`1=> `,outputPath)
            // console.log(`1=> `,fileAbsolutePath)
            // console.log(`1=> `,filePath)
            fs.writeFileSync(`${outputPath}${metaType}.json`, JSON.stringify(metas), {
                encoding: 'utf8',
                flag: 'w',
            });
            res.download(fileAbsolutePath);

            res.end();
        } catch (error) {
            res.end();
        }
    }
}

export default BackupController;
