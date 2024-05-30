import {searchKeywordSchema} from 'models';
import {
    keywordXmlTemplateGenerator,
    sitemapItemTemplate,
    urlSetXmlTemplate
} from "../../_variables/sitemapVariables/xmlTemplateGenerators";
import {Request, Response} from "express";

export const searchSitemapsController= async ()=>{
    try {
        let finalXML = ''
        const keywordsCount = await searchKeywordSchema.countDocuments({count: {$gt:0}}).exec();
        const toDay = new Date();

        if (keywordsCount<2){
            return sitemapItemTemplate(
                `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-tax-search-1.xml`,
                toDay.toISOString()
            )
        }else {
            const lastKeyword = await searchKeywordSchema.findOne({count: {$gt:0}})
                .select(['createdAt'])
                .limit(1)
                .sort('-_id').exec();
//@ts-ignore
            const lastUpdate = lastKeyword?.createdAt ?
                //@ts-ignore
                new Date(lastKeyword.createdAt) :
                //@ts-ignore
                new Date(lastKeyword.createdAt)

            const countOfSiteMaps = Math.ceil(keywordsCount/2)
            const rangeOfSitemaps = [...Array(countOfSiteMaps).keys()]

            for (const currentPage of rangeOfSitemaps){
                finalXML += sitemapItemTemplate(
                    `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-tax-search-${currentPage+1}.xml`,
                    lastUpdate.toISOString()
                )
            }

            return finalXML

        }
    }catch (err){
        console.error(err)

    }
}

export const searchSitemapController = async (req:Request, res:Response)=>{

    try {
        const cleanParams = req.params['0'].replace('.xml', '')
        const splitParams =  cleanParams.split('-')
        const page =  splitParams?.[splitParams.length -1] || 1
        const keywords = await searchKeywordSchema.find({count: {$gt:0}}).limit(500).skip(500 * (page - 1)).exec();
        res.set('Content-Type', 'text/xml');
        res.send(
            urlSetXmlTemplate(
                keywordXmlTemplateGenerator(keywords)
            )
        )
    }catch (err){
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }

    // res.send('alive')
}

