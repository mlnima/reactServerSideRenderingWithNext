import { Request, Response } from 'express';
import { rootSitemapGenerator } from './rootSiteMap';
import { searchKeywordsSitemapsGenerator } from './searchSitemap';
import { metaSitemapGenerator } from './metaSitemap';
import { pagesSitemapGenerator } from './pageSitemap';
import { robotsTxtGenerator } from './robotsTxtGenerator';
// import { GenerateSitemapXlsStyle } from './GenerateSitemapXlsStyle';
import axios from 'axios';
import settingSchema from "@schemas/settingSchema";
import fs from 'fs-extra';
import path from 'path';

const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const dev = process.env.NODE_ENV !== 'production';

const productionPublicDirPath = path.join(
    __dirname,
    dev? `../../../../web-application/public` : `../../../../../web-application/public`,
);

const cleanupOldPublicFolder = async (targetPath: string) => {
    try {
        const files = await fs.readdir(targetPath);
        const xmlFiles = files.filter(file => path.extname(file) === '.xml' || file === 'robots.txt' );

        const deletePromises = xmlFiles.map(file => {
           return fs.remove(path.join(targetPath, file));
        });
        await Promise.all(deletePromises);
    } catch (error) {
        console.log(`Error on cleanupOldPublicFolder=> `,error)
    }
};

const generateSitemapsAndStaticAssets = async (req: Request, res: Response) => {
    try {
        await cleanupOldPublicFolder(productionPublicDirPath)

        await searchKeywordsSitemapsGenerator(productionPublicDirPath);
        await metaSitemapGenerator(productionPublicDirPath);
        await pagesSitemapGenerator(productionPublicDirPath);
        await rootSitemapGenerator(productionPublicDirPath);

        // await GenerateSitemapXlsStyle(productionPublicDirPath);
    } catch (e) {
        console.log(`Error while generating sitemap=> `, e);
    }

    // try {
    //     await robotsTxtGenerator(productionPublicDirPath);
    // } catch (e) {
    //     console.log(`Error while generating robots.txt=> `, e);
    // }

    try {
        const initialSettings = await settingSchema.findOne({
            type: 'initialSettings',
        })
            .exec()
            //@ts-ignore
            .then((initialSettings: { data: any }) => initialSettings.data);

        if (initialSettings?.headDataSettings?.favIconUrl) {
            const isAbsolute = initialSettings?.headDataSettings?.favIconUrl.includes('http')

            const response = await axios({
                url: `${isAbsolute ? '' : productionUrl}${initialSettings?.headDataSettings?.favIconUrl}`,
                responseType: 'arraybuffer',
            });
            if (!!response.data) {
                await fs.writeFile(
                    `${productionPublicDirPath}/favicon.ico`,
                    response.data,
                );
            }
        }
    } catch (error) {
        console.log(`Error while convert and copy favicon.ico => `, error);
    }

    res.end();
};

export default generateSitemapsAndStaticAssets;
