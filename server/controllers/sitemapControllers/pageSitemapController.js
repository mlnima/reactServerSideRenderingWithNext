const pageSchema = require('../../models/pageSchema');

const template = (pagesData) => {
    let pagesXmlData = ''
    pagesData.map(page => {
        const pagesUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${page.pageName}`
        const date = (page.updatedAt || page.createdAt || page._id.getTimestamp() || Date.now()).toISOString()
        pagesXmlData +=`<url> 
                         <loc>${pagesUrl}</loc>
                         <lastmod>${date}</lastmod>
                         <changefreq>weekly</changefreq>
                         <priority>1</priority>
                      </url>`
    })

    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pagesXmlData}
    </urlset>`
}




const pageSitemapController = async (req,res)=>{
    try {
        const pages = await pageSchema.find({status:'publish'}).exec() || []
        res.set('Content-Type', 'text/xml');
        console.log(template(pages))
        res.send(template(pages))
    }catch (err){
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }

}

module.exports = pageSitemapController