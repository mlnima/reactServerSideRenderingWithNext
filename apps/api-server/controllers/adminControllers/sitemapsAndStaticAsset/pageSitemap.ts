
import {sitemapItemTemplate} from "./xmlTemplateGenerators";
import fs from "fs";
import pageSchema from "@schemas/pageSchema";

export const pagesSitemapsLinksForRoot = async () =>{
    try {
        let finalXML = ''
        const findPageQuery = {status:'published'}
        const pagesCount = await pageSchema.countDocuments(findPageQuery).exec();
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

const pagesDataToXmlString = (pages:any[]) => pages.reduce((sitemap,currentPageData)=>{
    const pagesUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${currentPageData.pageName}`
    const date = (currentPageData?.updatedAt || currentPageData?.createdAt || currentPageData?._id?.getTimestamp() || Date.now()).toISOString()
    sitemap += `<url>
                     <loc>${pagesUrl}</loc>
                     <lastmod>${date}</lastmod>
                     <changefreq>weekly</changefreq>
                     <priority>1</priority>
                     </url>`
    return sitemap
},'')

const templateGenerator = (pages:any[]) => {
    const pagesDataToXmlData = pagesDataToXmlString(pages)

    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pagesDataToXmlData}
    </urlset>`
}

export const pagesSitemapGenerator = async (baseOutputPath:string) => {
    try {
        const pages = await pageSchema.find({status: 'published'}).exec() || []
        fs.writeFileSync(
            `${baseOutputPath}/sitemap-pt-page-1.xml`,
            templateGenerator(pages),
            {
                encoding: "utf8",
                flag: "w",
            })

    } catch (error) {
        console.error(error)

    }
}

