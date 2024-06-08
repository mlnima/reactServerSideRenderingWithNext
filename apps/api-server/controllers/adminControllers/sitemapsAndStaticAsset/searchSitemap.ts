import {keywordXmlTemplateGenerator, sitemapItemTemplate, urlSetXmlTemplate} from "./xmlTemplateGenerators";
import fs from "fs";
import searchKeywordSchema from "@schemas/searchKeywordSchema";
const perPage = 10;


const searchSitemapsPageCalculator = async ()=>{
    try {
        const amountOfKeywords = await searchKeywordSchema.countDocuments({count: {$gt: 0}}).exec();
        const maxPage = amountOfKeywords <= perPage ? 1 : Math.ceil(amountOfKeywords / perPage )
        return  maxPage > 1 ? [...Array(maxPage).keys()] : [0]

    }catch (error){
        console.log(`searchSitemapsPageCalculator=> `,error)
        return [0]
    }
}



export const searchSitemapsLinkForTheRoot = async () => {
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

export const searchKeywordsSitemapsGenerator = async (baseOutputPath:string) => {

    try {
        const amountOfPages = await searchSitemapsPageCalculator()
        for await (const currentPage of amountOfPages) {
            const page = currentPage + 1
            const skip = perPage * (page - 1) || 0;

            const keywords = await searchKeywordSchema.find({count: {$gt: 0}}).limit(perPage).skip(skip).exec();
            fs.writeFileSync(
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

