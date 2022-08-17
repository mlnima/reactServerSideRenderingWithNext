//metaSitemapController
const metaSchema = require('../../models/metaSchema')
const metaSitemapController = {}

const template = (metaData,type) => {
    let metaXmlData = ''
    metaData.map(meta => {
        const metaUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${type}/${meta._id}`
        const date = (meta.updatedAt || meta.createdAt || meta._id.getTimestamp() || Date.now()).toISOString()
        metaXmlData +=`<url> 
                         <loc>${metaUrl}</loc>
                         <lastmod>${date}</lastmod>
                         <changefreq>weekly</changefreq>
                         <priority>1</priority>
                      </url>`
    })

    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${metaXmlData}
    </urlset>`
}


metaSitemapController.categories = async (req, res) => {
    try {
        const categories = await metaSchema.find({status: 'published',type:'categories'}).exec() || []
        res.set('Content-Type', 'text/xml');
        res.send(template(categories,'category'))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}

metaSitemapController.tags = async (req, res) => {
    try {
        const tags = await metaSchema.find({status: 'published',type:'tags'}).exec() || []
        res.set('Content-Type', 'text/xml');
        res.send(template(tags,'tag'))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}
metaSitemapController.actors = async (req, res) => {
    try {
        const actors = await metaSchema.find({status: 'published',type:'actors'}).exec() || []
        res.set('Content-Type', 'text/xml');
        res.send(template(actors,'actor'))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}


module.exports = metaSitemapController;