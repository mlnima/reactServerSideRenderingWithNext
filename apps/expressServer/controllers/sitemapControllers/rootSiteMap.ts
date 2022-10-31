import postSchema from '../../../../packages/models/src/postSchema';
import moment from 'moment';
import {rootTemplate, sitemapItemTemplate} from "../../_variables/sitemapVariables/xmlTemplateGenerators";
import {searchSitemapsController} from "./searchSitemapController";
import {metasSitemapsController} from "./metaSitemapController";
import {pagesSitemapsController} from "./pageSitemapController";

const monthsSitemapGenerator = async (allMonthsSinceStart) => {
    let finalXML = ''
    for await (const month of allMonthsSinceStart) {
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

        const postCountInThisMonth = await postSchema.countDocuments(postQuery).exec();
        const lastDocumentUpdatedDate = await postSchema.findOne(postQuery)
            .select(['createdAt'])
            .limit(1)
            .sort('-_id').exec()

        if (postCountInThisMonth > 0 && postCountInThisMonth < 500 ) {
            const lastUpdate = lastDocumentUpdatedDate?.createdAt ?
                new Date(lastDocumentUpdatedDate.createdAt) :
                new Date(lastDocumentUpdatedDate.createdAt)
            finalXML += sitemapItemTemplate(
                `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-pt-post-${fixedMonth}-1.xml`,
                lastUpdate.toISOString()
            )
        } else if (postCountInThisMonth > 0 && postCountInThisMonth > 500){
            const countOfSiteMapsForCurrentMonth = Math.ceil(postCountInThisMonth/500)
            const rangeOfSitemaps = [...Array(countOfSiteMapsForCurrentMonth).keys()]
            const lastUpdate = lastDocumentUpdatedDate?.createdAt ?
                new Date(lastDocumentUpdatedDate.createdAt) :
                new Date(lastDocumentUpdatedDate.createdAt)
            for (const currentMonthPage of rangeOfSitemaps){
                finalXML += sitemapItemTemplate(
                    `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-pt-post-${fixedMonth}-${currentMonthPage +1}.xml`,
                    lastUpdate.toISOString()
                )
            }
        }
    }
    return finalXML
}


const getDates = (firstCreatedPostDate, lastUpdatedPostDate) => {
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
        console.log('getDates :', err)
    }
};


export const rootSitemap = async (req, res) => {

    try {
        const oldestPost = await postSchema.findOne({status: 'published'})
            .select(['createdAt'])
            .exec();

        const lastPost = await postSchema.findOne({status: 'published'})
            .select(['createdAt'])
            .sort('-_id')
            .exec();

        const firstPostDate = `${oldestPost.createdAt.getFullYear()}/${oldestPost.createdAt.getMonth() + 1}`
        const lastPostDate = `${lastPost.createdAt.getFullYear()}/${lastPost.createdAt.getMonth() + 1}`

        const rangeOfTheMonths = firstPostDate === lastPostDate ?
            [firstPostDate] :
            getDates(firstPostDate, lastPostDate)

        res.set('Content-Type', 'text/xml');
        res.send(
            rootTemplate(`
                ${await searchSitemapsController()}
                ${await metasSitemapsController('categories')}
                ${await metasSitemapsController('tags')}
                ${await metasSitemapsController('actors')}
                ${await monthsSitemapGenerator(rangeOfTheMonths)}
                ${await pagesSitemapsController()}
            `)
        );
    } catch (error) {
        console.log(error)

        res.send('something webt wrong')
    }
};

export default rootSitemap
