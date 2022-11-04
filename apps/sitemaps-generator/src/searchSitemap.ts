import {searchKeywordSchema} from 'models';
import {keywordXmlTemplateGenerator, sitemapItemTemplate, urlSetXmlTemplate} from "../asset/xmlTemplateGenerators";
import fs from "fs";

export const searchSitemapsLinkForTheRoot = async () => {
    try {
        let finalXML = ''
        const amountOfKeywords = await searchKeywordSchema.countDocuments({count: {$gt: 0}}).exec();
        const maxPage = amountOfKeywords <= 500 ? 1 : Math.ceil(amountOfKeywords / 500)
        const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0]
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

export const searchKeywordsSitemapsGenerator = async (baseOutputPath) => {

    try {
        const amountOfKeywords = await searchKeywordSchema.countDocuments({count: {$gt: 0}}).exec();
        const maxPage = amountOfKeywords >= 500 ? 1 : Math.ceil(amountOfKeywords / 500)
        const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0]

        for await (const currentPage of amountOfPages) {
            const page = currentPage + 1
            const skip = 500 * (page - 1) || 0;

            const keywords = await searchKeywordSchema.find({count: {$gt: 0}}).limit(500).skip(skip).exec();
            await fs.writeFileSync(
                `${baseOutputPath}/sitemap-tax-search-${page}.xml`,
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

