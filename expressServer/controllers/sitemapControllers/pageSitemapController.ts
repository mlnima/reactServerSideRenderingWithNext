import pageSchema from '../../models/pageSchema';

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
        console.log(templateGenerator(pages))
        res.set('Content-Type', 'text/xml');
        res.send(templateGenerator(pages))
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Something went wrong please try again later'})
    }
}

export default pageSitemapController;