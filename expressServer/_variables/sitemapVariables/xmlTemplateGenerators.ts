const toDay = new Date();

export const urlSetXmlTemplate = (data) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data}
    </urlset>`
}

export const rootTemplate = (data) => {
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

export const sitemapItemTemplate = (url, lastModifiedDate) => {
    return `<sitemap>
               <loc>${url}</loc>
               <lastmod>${lastModifiedDate}</lastmod>
           </sitemap>`;
}


export const urlXmlTemplate = (Url, date, changeFreq, priority) => {
    return `<url> 
             <loc>${Url}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>${changeFreq}</changefreq>
             <priority>${priority}</priority>
          </url>`
}

export const keywordXmlTemplateGenerator = (keywords) => keywords.reduce((finalXml, currentKeyword) => {
    const keywordsUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/search/${currentKeyword?.name}`
    const date = (currentKeyword?.updatedAt).toISOString()
    finalXml += urlXmlTemplate(keywordsUrl,date,'hourly','1')
    return finalXml
}, '')

export const postXmlTemplateGenerator = (posts) => posts.reduce((finalXml, currentPost) => {
    let postUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL + `/post/${currentPost?.postType}/${currentPost._id}`;
    let lastModify = new Date(currentPost.updatedAt);
    finalXml += urlXmlTemplate(postUrl,lastModify.toISOString(),'hourly','1')
    return finalXml
}, '')

export const metaXmlTemplateGenerator = (metaData,type:string,priority:string,changeFreq:string,metaUrlFormat:string) =>{
    return metaData.reduce((sitemap,currentMeta)=>{
        const metaUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${metaUrlFormat}/${currentMeta._id}`
        const date = (currentMeta.updatedAt || currentMeta.createdAt || currentMeta._id.getTimestamp() || Date.now()).toISOString()
        sitemap += urlXmlTemplate(metaUrl,date,changeFreq,priority)
        return sitemap
    },'' )
}