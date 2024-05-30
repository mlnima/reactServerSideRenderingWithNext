const toDay = new Date();
const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL

export const urlSetXmlTemplate = (data:string) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data}
    </urlset>`
}

export const rootTemplate = (data:string) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
                                        <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
                                          <!-- generated-on="${toDay.toUTCString()}" -->     
                                            <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                                          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                                                          http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" 
                                                          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                                                          ${data}    
                                            </sitemapindex>`;
}

export const sitemapItemTemplate = (url:string, lastModifiedDate:string) => {
    return `<sitemap>
               <loc>${url}</loc>
               <lastmod>${lastModifiedDate}</lastmod>
           </sitemap>`;
}


export const urlXmlTemplate = (Url:string, date:string, changeFreq:string, priority:string) => {
    return `<url> 
             <loc>${Url}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>${changeFreq}</changefreq>
             <priority>${priority}</priority>
          </url>`
}

export const keywordXmlTemplateGenerator = (keywords: any[]) => keywords.reduce((finalXml, currentKeyword) => {
    const keywordsUrl = `${productionUrl}/search/${currentKeyword?.name}`
    const date = new Date (currentKeyword?.updatedAt || currentKeyword?.createdAt|| currentKeyword._id.getTimestamp() || Date.now() )
    finalXml += urlXmlTemplate(keywordsUrl,date.toISOString(),'hourly','1')
    return finalXml
}, '')

export const postXmlTemplateGenerator = (posts:any[]) => posts.reduce((finalXml, currentPost) => {
    let postUrl = productionUrl + `/post/${currentPost?.postType}/${currentPost._id}`;
    let lastModify = new Date(currentPost.updatedAt || currentPost?.createdAt || currentPost._id.getTimestamp() || Date.now() );
    finalXml += urlXmlTemplate(postUrl,lastModify.toISOString(),'hourly','1')
    return finalXml
}, '')

export const metaXmlTemplateGenerator = (metaData:any[],type:string,priority:string,changeFreq:string,metaUrlFormat:string) =>{
    return metaData.reduce((sitemap,currentMeta)=>{
        const metaUrl = `${productionUrl}/${metaUrlFormat}/${currentMeta._id}`
        const date = new Date(currentMeta.updatedAt || currentMeta.createdAt || currentMeta._id.getTimestamp() || Date.now())
        sitemap += urlXmlTemplate(metaUrl,date.toISOString(),changeFreq,priority)
        return sitemap
    },'' )
}