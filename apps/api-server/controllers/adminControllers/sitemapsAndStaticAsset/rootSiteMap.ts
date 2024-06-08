import { rootTemplate } from './xmlTemplateGenerators';
import { searchSitemapsLinkForTheRoot } from './searchSitemap';
import { metasSitemapsLinkForRoot } from './metaSitemap';
import { pagesSitemapsLinksForRoot } from './pageSitemap';
import { postSitemapLinkForTheRoot } from './postSitemap';
import fs from 'fs';

export const rootSitemapGenerator = async (baseOutputPath: string) => {
    try {

        fs.writeFileSync(
            `${baseOutputPath}/sitemap.xml`,
            rootTemplate(`
                ${await searchSitemapsLinkForTheRoot()}
                ${await metasSitemapsLinkForRoot('categories')}
                ${await metasSitemapsLinkForRoot('tags')}
                ${await metasSitemapsLinkForRoot('actors')}
                ${await postSitemapLinkForTheRoot(baseOutputPath)}
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
