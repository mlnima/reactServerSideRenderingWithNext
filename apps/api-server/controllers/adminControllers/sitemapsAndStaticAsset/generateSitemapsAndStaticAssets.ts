import path from 'path';
import { Request, Response } from 'express';
import fs from 'fs-extra';
import { rootSitemapGenerator } from './rootSiteMap';
import { searchKeywordsSitemapsGenerator } from './searchSitemap';
import { metaSitemapGenerator } from './metaSitemap';
import { pagesSitemapGenerator } from './pageSitemap';
import { robotsTxtGenerator } from './robotsTxtGenerator';
import { GenerateSitemapXlsStyle } from './GenerateSitemapXlsStyle';
import axios from 'axios';
import settingSchema from "@schemas/settingSchema";

const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const dev = process.env.NODE_ENV !== 'production';

const productionPublicDirPath = path.join(
    __dirname,
    dev? `../../../../web-application/public` : `../../../../../web-application/public`,
);

const generateSitemapsAndStaticAssets = async (req: Request, res: Response) => {
    try {
        await rootSitemapGenerator(productionPublicDirPath);
        await searchKeywordsSitemapsGenerator(productionPublicDirPath);
        await metaSitemapGenerator(productionPublicDirPath);
        await pagesSitemapGenerator(productionPublicDirPath);
        // await GenerateSitemapXlsStyle(productionPublicDirPath);
    } catch (e) {
        console.log(`Error while generating sitemap=> `, e);
    }

    try {
        await robotsTxtGenerator(productionPublicDirPath);
    } catch (e) {
        console.log(`Error while generating robots.txt=> `, e);
    }

    try {
        const initialSettings = await settingSchema.findOne({
            type: 'initialSettings',
        })
            .exec()
            //@ts-ignore
            .then((initialSettings: { data: any }) => initialSettings.data);

        if (initialSettings?.headDataSettings?.favIconUrl) {
            const response = await axios({
                url: `${productionUrl}${initialSettings?.headDataSettings?.favIconUrl}`,
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
