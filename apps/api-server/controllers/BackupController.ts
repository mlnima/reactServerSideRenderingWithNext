// @ts-nocheck
import { Request, Response } from 'express';
import fsExtra from 'fs-extra';
import path from 'path';
import metaSchema from '@schemas/metaSchema';
import fs from 'fs';
import { multiQueryUniquer } from '@util/queryUtil';
import postSchema from '@schemas/postSchema';
import GlobalStore from '@store/GlobalStore';
import { folderCompressor, folderRemover } from '@util/file-utils';
import shell from 'shelljs';

const dev = process.env.NODE_ENV !== 'production';
const outputFolderFromHere = dev ? `../public/backups/` : `../../public/backups/`;
const outputPath = path.join(__dirname, outputFolderFromHere);

class BackupController {
    static outputPath = path.join(__dirname, process.env.NODE_ENV !== 'production' ? `../public/backups/` : `../../public/backups/`);

    static fieldsQueryGenerator = (fields: string[]) => fields.map((field: string) => `-${field}`).join(' ');

    static async metas(req: Request, res: Response) {
        const { fields, metaType, limit } = req.query;

        try {
            fsExtra.ensureDirSync(outputPath);
            const fieldsQuery = (fields as string[]).map((field: string) => `-${field}`).join(' ');
            const typeQuery = metaType ? { $and: [{ type: metaType }] } : {};
            const metas = await metaSchema
                .find(typeQuery)
                .select(fieldsQuery)
                .limit(req.query.limit ? parseInt(multiQueryUniquer(limit)) : -1)
                .sort('-count')
                .exec();

            const fileAbsolutePath = `${outputPath}${metaType}.json`;
            fs.writeFileSync(fileAbsolutePath, JSON.stringify(metas), {
                encoding: 'utf8',
                flag: 'w',
            });
            res.download(fileAbsolutePath);
        } catch (error) {
            console.log(`error=> `, error);
            res.end();
        }
    }

    static async posts(req: Request, res: Response) {
        const { fields, postType } = req.query;
        try {
            fsExtra.ensureDirSync(outputPath);
            const fieldsQuery = BackupController.fieldsQueryGenerator(fields as string[]);
            const typeQuery = postType ? { $and: [{ type: postType }] } : {};
            const posts = await postSchema.find({ typeQuery }).select(fieldsQuery).exec();
            const fileAbsolutePath = `${outputPath}${postType ? postType : 'posts'}.json`;

            console.log(`fileAbsolutePath=> `, fileAbsolutePath);
            // fs.writeFileSync(fileAbsolutePath, JSON.stringify(posts), {
            //     encoding: 'utf8',
            //     flag: 'w',
            // });
            // res.download(fileAbsolutePath);
        } catch (error) {
            res.end();
        }
    }

    static mongoDumpQueryGenerator(backupPath: string, archive = true) {
        if (archive) {
            return `mongodump --uri="mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}" --archive=${backupPath}/db.gz --gzip`;
        } else {
            return `mongodump --uri="mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}" --out=${backupPath}  `;
        }
    }

    static backupFileNameGenerator = (): string => {
        return `backup_${GlobalStore.initialSettings.headDataSettings.siteName.replace(' ', '-')}_${Date.now()}.zip`;
    };

    static async backup(req: Request, res: Response) {
        try {
            const backupFilePath = `./public/backups/${BackupController.backupFileNameGenerator()}`;
            const tempPath = path.join(__dirname, '../public/backups/temp');
            fsExtra.ensureDirSync(tempPath);

            const dumpQuery = BackupController.mongoDumpQueryGenerator(`./public/backups/temp`);


            shell.exec(dumpQuery, async (code, stdout, stderr)=>{
                fs.copyFile(path.join(__dirname, '../../../.env'), path.join(__dirname, '../public/backups/temp/.env'), err => {
                    if (err) {
                        console.error('Error copying file:', err);
                    } else {
                        console.log('File copied successfully');
                    }
                });

                try {
                    await folderCompressor(
                        path.join(__dirname, '../public/uploads'),
                        path.join(__dirname, '../public/backups/temp/uploads_backup.zip'),
                    );
                } catch (error) {
                    console.log(`error archiving uploads folder`, error);
                }
                await folderCompressor(path.join(__dirname, '../public/backups/temp'), backupFilePath);

                await folderRemover(tempPath,true);
            });


            res.end();
        } catch (error) {
            res.end();
        }
    }
}

export default BackupController;

// if (!!dumpQuery){
//     await GlobalStore.execCommand(dumpQuery)
// }
