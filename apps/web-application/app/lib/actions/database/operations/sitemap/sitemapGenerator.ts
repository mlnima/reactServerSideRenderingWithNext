'use server';
import axios from 'axios';
import path from 'path';
import {
  cleanupOldPublicFolder, metaSitemapGenerator,
  metasSitemapsLinkForRoot, pagesSitemapGenerator,
  pagesSitemapsLinksForRoot,
  postSitemapLinkForTheRoot,
  searchKeywordsSitemapsGenerator,
  searchSitemapsLinkForTheRoot,

} from './helpers';
import { rootTemplate } from './templates';
import { connectToDatabase } from '@repo/db/dist/index';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';
import { writeFile  } from 'fs/promises';

const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const dev = process.env.NODE_ENV !== 'production';

const sitemapItemsPerPage = 500;

const sitemapOutputPath = path.join(process.cwd(), 'public');

export const rootSitemapGenerator = async () => {
  try {

    await writeFile(
      `${sitemapOutputPath}/sitemap.xml`,
      rootTemplate(`
                ${await searchSitemapsLinkForTheRoot()}
                ${await metasSitemapsLinkForRoot('categories')}
                ${await metasSitemapsLinkForRoot('tags')}
                ${await metasSitemapsLinkForRoot('actors')}
                ${await postSitemapLinkForTheRoot()}
                ${await pagesSitemapsLinksForRoot()}
            `),
      {
        encoding: 'utf8',
        flag: 'w',
      },
    );


  } catch (error) {
    console.log(error);
  }
};


export const generateSitemaps = async () => {
  await connectToDatabase('generateSitemaps');
  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined;
    }>,
  );

  try {

    await cleanupOldPublicFolder();
    await searchKeywordsSitemapsGenerator();
    await metaSitemapGenerator();
    await pagesSitemapGenerator();
    await rootSitemapGenerator();
    // ManifestController.generateManifestJson()
  } catch (e) {
    console.log(`Error while generating sitemap=> `, e);
  }

  try {

    if (!!initialSettings?.headDataSettings?.favIconUrl) {
      const isAbsolute = initialSettings?.headDataSettings?.favIconUrl.includes('http');

      const response = await axios({
        url: `${isAbsolute ? '' : productionUrl}${initialSettings?.headDataSettings?.favIconUrl}`,
        responseType: 'arraybuffer',
      });
      if (!!response.data) {

        await writeFile(
          `${sitemapOutputPath}/favicon.ico`,
          //@ts-ignore
          response.data,
        );
      }
    }
  } catch (error) {
    console.log(`Error while convert and copy favicon.ico => `, error);
  }
};
