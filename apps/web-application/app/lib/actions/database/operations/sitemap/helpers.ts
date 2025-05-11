import { pagesTemplateGenerator, sitemapItemTemplate, urlSetXmlTemplate, urlXmlTemplate } from './templates';
import { searchKeywordSchema,pageSchema,postSchema,metaSchema } from '@repo/db';
import fs from 'fs-extra';
import { MetasType } from '@repo/typescript-types';
import { convertMetasTypeToSingular } from 'api-server/dist/util/units-convertor';
import moment from "moment/moment";
import path from 'path';
import { sitemapItemsPerPage, sitemapOutputPath } from './sitemapGenerator';

export const keywordXmlTemplateGenerator = (keywords:any[]) => {
  return keywords.reduce((finalXml, currentKeyword) => {
    const keywordsUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/search/${currentKeyword?.name}`
    const date = new Date (currentKeyword?.updatedAt || currentKeyword?.createdAt|| currentKeyword._id.getTimestamp() || Date.now() )
    finalXml += urlXmlTemplate(keywordsUrl,date.toISOString(),'hourly','1')
    return finalXml
  }, '')
};
export const postXmlTemplateGenerator = (posts:any[]) => {
  return posts.reduce((finalXml, currentPost) => {
    let postUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL + `/post/${currentPost?.postType}/${currentPost._id}`;
    let lastModify = new Date(currentPost.updatedAt || currentPost?.createdAt || currentPost._id.getTimestamp() || Date.now() );
    finalXml += urlXmlTemplate(postUrl,lastModify.toISOString(),'hourly','1')
    return finalXml
  }, '')
};
export const metaXmlTemplateGenerator = (metaData:any[],priority:string,changeFreq:string,metaUrlFormat:string) => {
  return metaData.reduce((sitemap,currentMeta)=>{
    const metaUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${metaUrlFormat}/${currentMeta._id}`
    const date = new Date(currentMeta.updatedAt || currentMeta.createdAt || currentMeta._id.getTimestamp() || Date.now())
    sitemap += urlXmlTemplate(metaUrl,date.toISOString(),changeFreq,priority)
    return sitemap
  },'' )
};

export const searchSitemapsPageCalculator =async () => {
  try {
    const amountOfKeywords = await searchKeywordSchema.countDocuments({count: {$gt: 0}})
    const maxPage = amountOfKeywords <= sitemapItemsPerPage ? 1 : Math.ceil(amountOfKeywords / sitemapItemsPerPage )
    return  maxPage > 1 ? [...Array(maxPage).keys()] : [0]

  }catch (error){
    console.log(`searchSitemapsPageCalculator=> `,error)
    return [0]
  }

}
export const searchSitemapsLinkForTheRoot = async() => {
  try {
    let finalXML = ''
    const amountOfPages = await searchSitemapsPageCalculator()
    const currentDayDate = new Date();
    for await (const currentPage of amountOfPages) {
      const page = currentPage + 1
      finalXML += sitemapItemTemplate(
        `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-tax-search-${page}.xml`,
        currentDayDate.toISOString()
      )
    }
    return finalXML
  } catch (error) {
    console.error(error)
    return ''
  }


}
export const searchKeywordsSitemapsGenerator = async() => {
  try {
    const amountOfPages = await searchSitemapsPageCalculator()
    for await (const currentPage of amountOfPages) {
      const page = currentPage + 1
      const skip = sitemapItemsPerPage * (page - 1) || 0;

      const keywords = await searchKeywordSchema.find({count: {$gt: 0}}).limit(sitemapItemsPerPage).skip(skip)
      fs.writeFileSync(
        `${sitemapOutputPath}/sitemap-tax-search-${page}.xml`,
        urlSetXmlTemplate(keywordXmlTemplateGenerator(keywords)),
        {
          encoding: "utf8",
          flag: "w",
        })
    }

  } catch (error) {
    console.error(error)
  }

}
export const mongoDocumentDateCorrector = (documentDate:Date, documentId:any):Date => {
  try {
    return documentDate ?? documentId?.getTimestamp()
  } catch (error) {
    console.log(error)
    return documentDate
  }

}
export const metasSitemapsLinkForRoot = async(metaType:MetasType) => {
  try {
    let finalXML = ''
    const findMetaQuery = {$and: [{count: {$gt: 0}}, {status: 'published'}, {type: metaType}]}
    const metasCount = await metaSchema.countDocuments(findMetaQuery)
    const currentDayDate = new Date();
    const maxPage = metasCount <= 500 ? 1 : Math.ceil(metasCount / 500)
    const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0]

    for await (const currentPage of amountOfPages) {
      const page = currentPage + 1
      finalXML += sitemapItemTemplate(
        `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-tax-${metaType}-${page}.xml`,
        currentDayDate.toISOString()
      )
    }
    return finalXML
  } catch (error) {
    console.log(error)
    return ''
  }

}

export const metaSitemapGenerator = async () => {

  try {
    const metaTypes = ['categories', 'tags', 'actors']

    for await (const metaType of metaTypes) {
      const findMetaQuery = {$and: [{count: {$gt: 0}}, {status: 'published'}, {type: metaType}]}
      const metasCount = await metaSchema.countDocuments(findMetaQuery)
      const maxPage = metasCount <= 500 ? 1 : Math.ceil(metasCount / 500)
      const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0]

      for await (const currentPage of amountOfPages) {
        const page = currentPage + 1
        const metas = await metaSchema.find(findMetaQuery).limit(500).skip(500 * (page - 1))
        fs.writeFileSync(
          `${sitemapOutputPath}/sitemap-tax-${metaType}-${page}.xml`,
          urlSetXmlTemplate(metaXmlTemplateGenerator(metas , '1', 'hourly', convertMetasTypeToSingular(metaType))),
          {
            encoding: "utf8",
            flag: "w",
          })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getRangeOfTheDates = (firstCreatedPostDate:string, lastUpdatedPostDate:string) => {
  try {
    let dateArray = [];
    let beginDate = moment(new Date(firstCreatedPostDate + '/01'));
    let endDate = moment(new Date(lastUpdatedPostDate + '/01')).endOf('month');
    dateArray.push(moment(beginDate).format('YYYY-MM'))

    while (beginDate < endDate) {
      dateArray.push(moment(beginDate).add(1, 'M').format('YYYY-MM'))
      beginDate = moment(beginDate).add(1, 'M');
    }

    return [...new Set(dateArray)].reverse();
  } catch (err) {
    console.log('getRangeOfTheDates :', err)
  }

}

export const postSitemapLinkForTheRoot = async () => {
  try {
    const oldestPost = await postSchema.findOne({status: 'published'})
      .select(['createdAt'])
      .sort({'_id': 1})
      

    const lastPost = await postSchema.findOne({status: 'published'})
      .select(['createdAt'])
      .sort({'_id': -1})
      


    const startDate = mongoDocumentDateCorrector(oldestPost?.createdAt, oldestPost?._id);
    const endDate = mongoDocumentDateCorrector(lastPost?.createdAt, lastPost?._id);

    const firstPostDate = `${startDate.getFullYear()}/${startDate.getMonth() + 1}`
    const lastPostDate = `${endDate.getFullYear()}/${endDate.getMonth() + 1}`

    const rangeOfTheMonths = firstPostDate === lastPostDate ?
      [firstPostDate] :
      getRangeOfTheDates(firstPostDate, lastPostDate)




    let finalXML = ''

    if (!rangeOfTheMonths){
      console.log(`rangeOfTheMonths is missing`,)
      return finalXML
    }

    for await (const month of rangeOfTheMonths) {
      const fixedMonth = month.includes('/') ? month.replace('/', '-') : month;
      const startDate = new Date(month + '-01');
      const endDate = moment(startDate).endOf('month');

      const postQuery = {
        $and: [
          {'createdAt': {$gte: startDate}},
          {'createdAt': {$lte: endDate}},
          {status: 'published'}
        ]
      }

      const postCountInThisMonth = await postSchema.countDocuments(postQuery)


      if (postCountInThisMonth){
        const maxPage = postCountInThisMonth <= 500 ? 1 : Math.ceil(postCountInThisMonth / 500)
        const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0]

        const lastDocumentUpdatedDate = await postSchema.findOne(postQuery)
          .select(['createdAt'])
          .sort('-_id')

        for await (const currentPage of amountOfPages) {
          try {

            const page = currentPage + 1
            const skip = 500 * (page - 1) || 0;
            const posts = await postSchema.find(postQuery).limit(500).skip(skip)
            const lastUpdate = new Date(mongoDocumentDateCorrector(lastDocumentUpdatedDate.createdAt, lastDocumentUpdatedDate._id));

            const targetUrl =  `/sitemap-pt-post-${fixedMonth}-page${page}.xml`
            const absoluteUrl =  `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${targetUrl}`

            finalXML += sitemapItemTemplate(
              // `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-pt-post-${fixedMonth}-${page}.xml`,
              absoluteUrl,
              lastUpdate.toISOString()
            )

            //here
            fs.writeFileSync(
              `${sitemapOutputPath}/${targetUrl}`,
              urlSetXmlTemplate(postXmlTemplateGenerator(posts)),
              {
                encoding: "utf8",
                flag: "w",
              })


          } catch (error) {
            console.log(error)
          }

        }

        //**
      }
    }
    return finalXML
  } catch (error) {

  }

}

export const pagesSitemapsLinksForRoot = async () => {
  try {
    let finalXML = ''
    const findPageQuery = {status:'published'}
    const pagesCount = await pageSchema.countDocuments(findPageQuery)
    const currentDayDate = new Date();
    const maxPage = pagesCount <= 500 ? 1 : Math.ceil(pagesCount / 500)
    const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0]

    for await (const currentPage of amountOfPages) {
      const page = currentPage + 1
      finalXML += sitemapItemTemplate(
        `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-pt-page-${page}.xml`,
        currentDayDate.toISOString()
      )
    }
    return finalXML
  }catch (err){
    console.error(err)

  }
}


export const pagesSitemapGenerator = async () => {
  try {
    const pages = await pageSchema.find({status: 'published'}) || []
    fs.writeFileSync(
      `${sitemapOutputPath}/sitemap-pt-page-1.xml`,
     await pagesTemplateGenerator(pages),
      {
        encoding: "utf8",
        flag: "w",
      })

  } catch (error) {
    console.error(error)

  }
}


export const cleanupOldPublicFolder = async () => {
  try {
    const files = await fs.readdir(sitemapOutputPath);
    const xmlFiles = files.filter(file => path.extname(file) === '.xml' || file === 'robots.txt' );

    const deletePromises = xmlFiles.map(file => {
      return fs.remove(path.join(sitemapOutputPath, file));
    });
    await Promise.all(deletePromises);
  } catch (error) {
    console.log(`Error on cleanupOldPublicFolder=> `,error)
  }
}