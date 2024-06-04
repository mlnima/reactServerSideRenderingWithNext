
import {sitemapItemTemplate, metaXmlTemplateGenerator, urlSetXmlTemplate} from "./xmlTemplateGenerators";
import fs from "fs";
import {convertMetasTypeToSingular} from '@util/units-convertor'
import metaSchema from "@schemas/metaSchema";

export const metasSitemapsLinkForRoot = async (metaType:string) => {
    try {
        let finalXML = ''
        const findMetaQuery = {$and: [{count: {$gt: 0}}, {status: 'published'}, {type: metaType}]}
        const metasCount = await metaSchema.countDocuments(findMetaQuery).exec();
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


export const metaSitemapGenerator = async (baseOutputPath:string) => {
    try {
        const metaTypes = ['categories', 'tags', 'actors']

        for await (const metaType of metaTypes) {
            const findMetaQuery = {$and: [{count: {$gt: 0}}, {status: 'published'}, {type: metaType}]}
            const metasCount = await metaSchema.countDocuments(findMetaQuery).exec();
            const maxPage = metasCount <= 500 ? 1 : Math.ceil(metasCount / 500)
            const amountOfPages = maxPage > 1 ? [...Array(maxPage).keys()] : [0]

            for await (const currentPage of amountOfPages) {
                const page = currentPage + 1
                const metas = await metaSchema.find(findMetaQuery).limit(500).skip(500 * (page - 1)).exec()
                fs.writeFileSync(
                    `${baseOutputPath}/sitemap-tax-${metaType}-${page}.xml`,
                    urlSetXmlTemplate(metaXmlTemplateGenerator(metas, metaType, '1', 'hourly', convertMetasTypeToSingular(metaType))),
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


