import {
    urlSetXmlTemplate,
    postXmlTemplateGenerator, sitemapItemTemplate
} from "./xmlTemplateGenerators";
import {PostSchema} from 'shared-schemas';
import moment from 'moment';
import mongoDocumentDateCorrector from "./mongoDocumentDateCorrector";
import fs from "fs";

const getRangeOfTheDates = (firstCreatedPostDate:string, lastUpdatedPostDate:string) => {
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
};


export const postSitemapLinkForTheRoot = async (baseOutputPath:string) => {
    try {
        const oldestPost = await PostSchema.findOne({status: 'published'})
            .select(['createdAt'])
            .sort({'_id': 1})
            .exec();

        const lastPost = await PostSchema.findOne({status: 'published'})
            .select(['createdAt'])
            .sort({'_id': -1})
            .exec();


        const startDate = mongoDocumentDateCorrector(oldestPost?.createdAt, oldestPost?._id);
        const endDate = mongoDocumentDateCorrector(lastPost?.createdAt, lastPost?._id);

        const firstPostDate = `${startDate.getFullYear()}/${startDate.getMonth() + 1}`
        const lastPostDate = `${endDate.getFullYear()}/${endDate.getMonth() + 1}`

        const rangeOfTheMonths = firstPostDate === lastPostDate ?
            [firstPostDate] :
            getRangeOfTheDates(firstPostDate, lastPostDate)


        let finalXML = ''

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

            const postCountInThisMonth = await PostSchema.countDocuments(postQuery).exec();


            if (postCountInThisMonth){
                const maxPage = postCountInThisMonth <= 500 ? 1 : Math.ceil(postCountInThisMonth / 500)
                const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0]

                const lastDocumentUpdatedDate = await PostSchema.findOne(postQuery)
                    .select(['createdAt'])
                    .sort('-_id').exec()

                for await (const currentPage of amountOfPages) {
                    try {

                        const page = currentPage + 1
                        const skip = 500 * (page - 1) || 0;
                        const posts = await PostSchema.find(postQuery).limit(500).skip(skip).exec();
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
                            `${baseOutputPath}/${targetUrl}`,
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


