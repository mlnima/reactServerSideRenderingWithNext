//searchSitemapController
const searchKeywordSchema = require('../../models/searchKeywordSchema')


const searchSitemapController = async (req,res)=>{
    try {
        let metaXmlData = ''
        const keywords = await searchKeywordSchema.find({count: {$gt:0}}).exec()

        for await (const keyword of keywords){
            const keywordsUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/search/${keyword?.name}`
            const date = (keyword?.updatedAt).toISOString()
            metaXmlData +=`<url> 
                         <loc>${keywordsUrl}</loc>
                         <lastmod>${date}</lastmod>
                         <changefreq>always</changefreq>
                         <priority>1</priority>
                      </url>`
        }

        const finalXml =  `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${metaXmlData}
    </urlset>`

        res.set('Content-Type', 'text/xml');
        res.send(finalXml)

    }catch (err){
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}

module.exports = searchSitemapController