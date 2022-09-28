import metaSchema from '../../models/metaSchema';

const xmlTemplate = (data) =>{
    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data}
    </urlset>`
}

const metaXmlTemplateGenerator = (metaData,type:string,priority:string,changeFreq:string) =>{
    return metaData.reduce((sitemap,currentMeta)=>{
        const metaUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${type}/${currentMeta._id}`
        const date = (currentMeta.updatedAt || currentMeta.createdAt || currentMeta._id.getTimestamp() || Date.now()).toISOString()
        sitemap +=`<url> 
                         <loc>${metaUrl}</loc>
                         <lastmod>${date}</lastmod>
                         <changefreq>${changeFreq}</changefreq>
                         <priority>${priority}</priority>
                      </url>`

        return sitemap
    },'' )
}


export const categories = async (req, res) => {
    try {
        const categories = await metaSchema.find({status: 'published',type:'categories'}).exec() || []
        res.set('Content-Type', 'text/xml');
        res.send(xmlTemplate(metaXmlTemplateGenerator(categories,'category','1','hourly')))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}


export const tags = async (req, res) => {
    try {
        const tags = await metaSchema.find({status: 'published',type:'tags'}).exec() || []
        res.set('Content-Type', 'text/xml');
        res.send(xmlTemplate(metaXmlTemplateGenerator(tags,'tag','1','hourly')))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}

export const actors = async (req, res) => {
    try {
        const actors = await metaSchema.find({status: 'published',type:'actors'}).exec() || []
        res.set('Content-Type', 'text/xml');
        res.send(xmlTemplate(metaXmlTemplateGenerator(actors,'actor','1','hourly')))
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Something went wrong please try again later'})
    }
}


