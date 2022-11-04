import {pageSchema} from 'models';
import {sitemapItemTemplate} from "../../_variables/sitemapVariables/xmlTemplateGenerators";

export const pagesSitemapsController = async () =>{
    try {
        let finalXML = ''
        const findPageQuery = {status:'published'}
        const pagesCount = await pageSchema.countDocuments(findPageQuery).exec();
        const toDay = new Date();

        if (pagesCount<500){
            return sitemapItemTemplate(
                `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap-pt-page-1.xml`,
                toDay.toISOString()
            )
        }else {
            const lastPage = await pageSchema.findOne(findPageQuery)
                .select(['createdAt'])
                .limit(1)
                .sort('-_id').exec();
//@ts-ignore
            const lastUpdate = lastPage?.createdAt ?
                //@ts-ignore
                new Date(lastPage.createdAt) :
                //@ts-ignore
                new Date(lastPage.createdAt)

            const countOfSiteMaps = Math.ceil(pagesCount/500)
            const rangeOfSitemaps = [...Array(countOfSiteMaps).keys()]

            for (const currentPage of rangeOfSitemaps){
                finalXML += sitemapItemTemplate(
                    `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemaps/sitemap-pt-page-${currentPage+1}.xml`,
                    lastUpdate.toISOString()
                )
            }

            return finalXML

        }
    }catch (err){
        console.error(err)

    }
}






const pagesDataToXmlString = (pages) => pages.reduce((sitemap,currentPageData)=>{
    const pagesUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${currentPageData.pageName}`
    const date = (currentPageData.updatedAt || currentPageData.createdAt || currentPageData._id.getTimestamp() || Date.now()).toISOString()
    sitemap += `<url>
                     <loc>${pagesUrl}</loc>
                     <lastmod>${date}</lastmod>
                     <changefreq>weekly</changefreq>
                     <priority>1</priority>
                     </url>`
    return sitemap
},'')

const templateGenerator = (pages) => {
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

const pageSitemapController = async (req, res) => {
    try {
        const pages = await pageSchema.find({status: 'published'}).exec() || []
        res.set('Content-Type', 'text/xml');
        res.send(templateGenerator(pages))
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Something went wrong please try again later'})
    }
}

export default pageSitemapController;