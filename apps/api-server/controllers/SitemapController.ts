// @ts-nocheck
import fs from 'fs-extra';
import path from 'path';
import { searchKeywordSchema, metaSchema, postSchema, pageSchema } from '@repo/db';

import { convertMetasTypeToSingular } from '@util/units-convertor';
import moment from 'moment/moment';

import { Request, Response } from 'express';
import globalStore from '@store/GlobalStore';
import axios from 'axios';
import ManifestController from './ManifestController';
import { MetasType } from '@repo/typescript-types';

const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const dev = process.env.NODE_ENV !== 'production';
const perPage = 500;

const baseOutputPath = path.join(__dirname, dev ? `../../web-application/public` : `../../../web-application/public`);

class SitemapController {
  //------------------helpers---------------------
  static async cleanupOldPublicFolder() {
    try {
      const files = await fs.readdir(baseOutputPath);
      const xmlFiles = files.filter((file) => path.extname(file) === '.xml' || file === 'robots.txt');

      const deletePromises = xmlFiles.map((file) => {
        return fs.remove(path.join(baseOutputPath, file));
      });
      await Promise.all(deletePromises);
    } catch (error) {
      console.log(`Error on cleanupOldPublicFolder=> `, error);
    }
  }

  static urlSetXmlTemplate(data: string) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data}
    </urlset>`;
  }

  static rootTemplate(data: string) {
    const toDay = new Date();
    return `<?xml version="1.0" encoding="UTF-8"?>
                                        <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
                                          <!-- generated-on="${toDay.toUTCString()}" -->     
                                            <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                                          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                                                          http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" 
                                                          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                                                          ${data}    
                                            </sitemapindex>`;
  }

  static sitemapItemTemplate(url: string, lastModifiedDate: string) {
    return `<sitemap>
               <loc>${url}</loc>
               <lastmod>${lastModifiedDate}</lastmod>
           </sitemap>`;
  }

  static urlXmlTemplate(Url: string, date: string, changeFreq: string, priority: string) {
    return `<url> 
             <loc>${Url}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>${changeFreq}</changefreq>
             <priority>${priority}</priority>
          </url>`;
  }

  static keywordXmlTemplateGenerator(keywords: any[]) {
    return keywords.reduce((finalXml, currentKeyword) => {
      const keywordsUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/search/${currentKeyword?.name}`;
      const date = new Date(currentKeyword?.updatedAt || currentKeyword?.createdAt || currentKeyword._id.getTimestamp() || Date.now());
      finalXml += SitemapController.urlXmlTemplate(keywordsUrl, date.toISOString(), 'hourly', '1');
      return finalXml;
    }, '');
  }

  static postXmlTemplateGenerator(posts: any[]) {
    return posts.reduce((finalXml, currentPost) => {
      let postUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL + `/post/${currentPost?.postType}/${currentPost._id}`;
      let lastModify = new Date(currentPost.updatedAt || currentPost?.createdAt || currentPost._id.getTimestamp() || Date.now());
      finalXml += SitemapController.urlXmlTemplate(postUrl, lastModify.toISOString(), 'hourly', '1');
      return finalXml;
    }, '');
  }

  static metaXmlTemplateGenerator(metaData: any[], priority: string, changeFreq: string, metaUrlFormat: string) {
    return metaData.reduce((sitemap, currentMeta) => {
      const metaUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${metaUrlFormat}/${currentMeta._id}`;
      const date = new Date(currentMeta.updatedAt || currentMeta.createdAt || currentMeta._id.getTimestamp() || Date.now());
      sitemap += SitemapController.urlXmlTemplate(metaUrl, date.toISOString(), changeFreq, priority);
      return sitemap;
    }, '');
  }

  static async searchSitemapsPageCalculator() {
    try {
      const amountOfKeywords = await searchKeywordSchema.countDocuments({ count: { $gt: 0 } }).exec();
      const maxPage = amountOfKeywords <= perPage ? 1 : Math.ceil(amountOfKeywords / perPage);
      return maxPage > 1 ? [...Array(maxPage).keys()] : [0];
    } catch (error) {
      console.log(`searchSitemapsPageCalculator=> `, error);
      return [0];
    }
  }

  static async searchSitemapsLinkForTheRoot() {
    try {
      let finalXML = '';
      const amountOfPages = await SitemapController.searchSitemapsPageCalculator();
      const currentDayDate = new Date();
      for await (const currentPage of amountOfPages) {
        const page = currentPage + 1;
        finalXML += SitemapController.sitemapItemTemplate(
          `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-tax-search-${page}.xml`,
          currentDayDate.toISOString(),
        );
      }
      return finalXML;
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  static async searchKeywordsSitemapsGenerator() {
    try {
      const amountOfPages = await SitemapController.searchSitemapsPageCalculator();
      for await (const currentPage of amountOfPages) {
        const page = currentPage + 1;
        const skip = perPage * (page - 1) || 0;

        const keywords = await searchKeywordSchema
          .find({ count: { $gt: 0 } })
          .limit(perPage)
          .skip(skip)
          .exec();
        fs.writeFileSync(
          `${baseOutputPath}/sitemap-tax-search-${page}.xml`,
          SitemapController.urlSetXmlTemplate(SitemapController.keywordXmlTemplateGenerator(keywords)),
          {
            encoding: 'utf8',
            flag: 'w',
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  static mongoDocumentDateCorrector(documentDate: string, documentId: any) {
    try {
      return documentDate ?? documentId?.getTimestamp();
    } catch (error) {
      console.log(error);
      return documentDate;
    }
  }

  static async metasSitemapsLinkForRoot(metaType: MetasType) {
    try {
      let finalXML = '';
      const findMetaQuery = { $and: [{ count: { $gt: 0 } }, { status: 'published' }, { type: metaType }] };
      const metasCount = await metaSchema.countDocuments(findMetaQuery).exec();
      const currentDayDate = new Date();
      const maxPage = metasCount <= 500 ? 1 : Math.ceil(metasCount / 500);
      const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0];

      for await (const currentPage of amountOfPages) {
        const page = currentPage + 1;
        finalXML += SitemapController.sitemapItemTemplate(
          `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-tax-${metaType}-${page}.xml`,
          currentDayDate.toISOString(),
        );
      }
      return finalXML;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  static async metaSitemapGenerator() {
    try {
      const metaTypes = ['categories', 'tags', 'actors'];

      for await (const metaType of metaTypes) {
        const findMetaQuery = { $and: [{ count: { $gt: 0 } }, { status: 'published' }, { type: metaType }] };
        const metasCount = await metaSchema.countDocuments(findMetaQuery).exec();
        const maxPage = metasCount <= 500 ? 1 : Math.ceil(metasCount / 500);
        const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0];

        for await (const currentPage of amountOfPages) {
          const page = currentPage + 1;
          const metas = await metaSchema
            .find(findMetaQuery)
            .limit(500)
            .skip(500 * (page - 1))
            .exec();
          fs.writeFileSync(
            `${baseOutputPath}/sitemap-tax-${metaType}-${page}.xml`,
            SitemapController.urlSetXmlTemplate(
              SitemapController.metaXmlTemplateGenerator(metas, '1', 'hourly', convertMetasTypeToSingular(metaType)),
            ),
            {
              encoding: 'utf8',
              flag: 'w',
            },
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static getRangeOfTheDates(firstCreatedPostDate: string, lastUpdatedPostDate: string) {
    try {
      let dateArray = [];
      let beginDate = moment(new Date(firstCreatedPostDate + '/01'));
      let endDate = moment(new Date(lastUpdatedPostDate + '/01')).endOf('month');
      dateArray.push(moment(beginDate).format('YYYY-MM'));

      while (beginDate < endDate) {
        dateArray.push(moment(beginDate).add(1, 'M').format('YYYY-MM'));
        beginDate = moment(beginDate).add(1, 'M');
      }

      return [...new Set(dateArray)].reverse();
    } catch (err) {
      console.log('getRangeOfTheDates :', err);
    }
  }

  static async postSitemapLinkForTheRoot() {
    try {
      const oldestPost = await postSchema.findOne({ status: 'published' }).select(['createdAt']).sort({ _id: 1 }).exec();

      const lastPost = await postSchema.findOne({ status: 'published' }).select(['createdAt']).sort({ _id: -1 }).exec();

      const startDate = SitemapController.mongoDocumentDateCorrector(oldestPost?.createdAt, oldestPost?._id);
      const endDate = SitemapController.mongoDocumentDateCorrector(lastPost?.createdAt, lastPost?._id);

      const firstPostDate = `${startDate.getFullYear()}/${startDate.getMonth() + 1}`;
      const lastPostDate = `${endDate.getFullYear()}/${endDate.getMonth() + 1}`;

      const rangeOfTheMonths =
        firstPostDate === lastPostDate ? [firstPostDate] : SitemapController.getRangeOfTheDates(firstPostDate, lastPostDate);

      let finalXML = '';

      for await (const month of rangeOfTheMonths) {
        const fixedMonth = month.includes('/') ? month.replace('/', '-') : month;
        const startDate = new Date(month + '-01');
        const endDate = moment(startDate).endOf('month');

        const postQuery = {
          $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }, { status: 'published' }],
        };

        const postCountInThisMonth = await postSchema.countDocuments(postQuery).exec();

        if (postCountInThisMonth) {
          const maxPage = postCountInThisMonth <= 500 ? 1 : Math.ceil(postCountInThisMonth / 500);
          const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0];

          const lastDocumentUpdatedDate = await postSchema.findOne(postQuery).select(['createdAt']).sort('-_id').exec();

          for await (const currentPage of amountOfPages) {
            try {
              const page = currentPage + 1;
              const skip = 500 * (page - 1) || 0;
              const posts = await postSchema.find(postQuery).limit(500).skip(skip).exec();
              const lastUpdate = new Date(
                SitemapController.mongoDocumentDateCorrector(lastDocumentUpdatedDate.createdAt, lastDocumentUpdatedDate._id),
              );

              const targetUrl = `/sitemap-pt-post-${fixedMonth}-page${page}.xml`;
              const absoluteUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${targetUrl}`;

              finalXML += SitemapController.sitemapItemTemplate(
                // `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-pt-post-${fixedMonth}-${page}.xml`,
                absoluteUrl,
                lastUpdate.toISOString(),
              );

              //here
              fs.writeFileSync(
                `${baseOutputPath}/${targetUrl}`,
                SitemapController.urlSetXmlTemplate(SitemapController.postXmlTemplateGenerator(posts)),
                {
                  encoding: 'utf8',
                  flag: 'w',
                },
              );
            } catch (error) {
              console.log(error);
            }
          }

          //**
        }
      }
      return finalXML;
    } catch (error) {}
  }

  static async pagesSitemapsLinksForRoot() {
    try {
      let finalXML = '';
      const findPageQuery = { status: 'published' };
      const pagesCount = await pageSchema.countDocuments(findPageQuery).exec();
      const currentDayDate = new Date();
      const maxPage = pagesCount <= 500 ? 1 : Math.ceil(pagesCount / 500);
      const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0];

      for await (const currentPage of amountOfPages) {
        const page = currentPage + 1;
        finalXML += SitemapController.sitemapItemTemplate(
          `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-pt-page-${page}.xml`,
          currentDayDate.toISOString(),
        );
      }
      return finalXML;
    } catch (err) {
      console.error(err);
    }
  }

  static async pagesDataToXmlString(pages: any[]) {
    return pages.reduce((sitemap, currentPageData) => {
      const pagesUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${currentPageData.pageName}`;
      const date = (
        currentPageData?.updatedAt ||
        currentPageData?.createdAt ||
        currentPageData?._id?.getTimestamp() ||
        Date.now()
      ).toISOString();
      sitemap += `<url>
                     <loc>${pagesUrl}</loc>
                     <lastmod>${date}</lastmod>
                     <changefreq>weekly</changefreq>
                     <priority>1</priority>
                     </url>`;
      return sitemap;
    }, '');
  }

  static pagesTemplateGenerator(pages: any[]) {
    const pagesDataToXmlData = SitemapController.pagesDataToXmlString(pages);

    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pagesDataToXmlData}
    </urlset>`;
  }

  static async pagesSitemapGenerator() {
    try {
      const pages = (await pageSchema.find({ status: 'published' }).exec()) || [];
      fs.writeFileSync(`${baseOutputPath}/sitemap-pt-page-1.xml`, SitemapController.pagesTemplateGenerator(pages), {
        encoding: 'utf8',
        flag: 'w',
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async rootSitemapGenerator() {
    try {
      fs.writeFileSync(
        `${baseOutputPath}/sitemap.xml`,
        SitemapController.rootTemplate(`
                ${await SitemapController.searchSitemapsLinkForTheRoot()}
                ${await SitemapController.metasSitemapsLinkForRoot('categories')}
                ${await SitemapController.metasSitemapsLinkForRoot('tags')}
                ${await SitemapController.metasSitemapsLinkForRoot('actors')}
                ${await SitemapController.postSitemapLinkForTheRoot()}
                ${await SitemapController.pagesSitemapsLinksForRoot()}
            `),
        {
          encoding: 'utf8',
          flag: 'w',
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  //---------------------Dashboard--------------------

  static async generateSitemaps(req: Request, res: Response) {
    try {
      await SitemapController.cleanupOldPublicFolder();
      await SitemapController.searchKeywordsSitemapsGenerator();
      await SitemapController.metaSitemapGenerator();
      await SitemapController.pagesSitemapGenerator();
      await SitemapController.rootSitemapGenerator();
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
            `${baseOutputPath}/favicon.ico`,
            //@ts-ignore
            response.data,
          );
        }
      }
    } catch (error) {
      console.log(`Error while convert and copy favicon.ico => `, error);
    }

    res.end();
  }
}

export default SitemapController;
