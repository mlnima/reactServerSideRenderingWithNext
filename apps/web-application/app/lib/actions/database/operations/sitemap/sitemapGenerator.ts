import fs from 'fs-extra';
import globalStore from 'api-server/dist/store/GlobalStore';
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

const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const dev = process.env.NODE_ENV !== 'production';

export const sitemapItemsPerPage = 500;

export const sitemapOutputPath = path.join(process.cwd(), 'public');

export const rootSitemapGenerator = async () => {
  try {

    fs.writeFileSync(
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
    //const initialSettings = globalStore.getInitialSettings()
    const initialSettings = globalStore.getSetting('initialSettings');

    if (!!initialSettings?.headDataSettings?.favIconUrl) {
      const isAbsolute = initialSettings?.headDataSettings?.favIconUrl.includes('http');

      const response = await axios({
        url: `${isAbsolute ? '' : productionUrl}${initialSettings?.headDataSettings?.favIconUrl}`,
        responseType: 'arraybuffer',
      });
      if (!!response.data) {

        fs.writeFile(
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
