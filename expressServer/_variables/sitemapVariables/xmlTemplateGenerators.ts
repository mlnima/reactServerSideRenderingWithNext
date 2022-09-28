const toDay = new Date();

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

export const sitemapItemTemplate = (url,lastModifiedDate) => {
    return `<sitemap>
               <loc>${url}</loc>
               <lastmod>${lastModifiedDate}</lastmod>
           </sitemap>`;
}

export const xmlParentTemplate = (data) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data}
    </urlset>`
}

export const xmlSubTemplateGenerator = (data) => {
    return `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
                                <!-- generated-on="${toDay.toUTCString()}" -->
                                <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" 
                                              xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                                              ${data} 
                                 </sitemapindex>`;
}

export const postXmlTemplateGenerator = (posts)=>posts.reduce((finalXml,currentPost)=>{
    let postUrl =process.env.NEXT_PUBLIC_PRODUCTION_URL + `/post/${currentPost?.postType}/${currentPost._id}` ;
    let lastModify = new Date(currentPost.updatedAt);
    finalXml+=`<url>
                    <loc>${ postUrl }</loc>
                    <lastmod>${ lastModify.toISOString()}</lastmod>
                    <changefreq>always</changefreq>
                    <priority>1</priority>
               </url>`
    return finalXml
},'')

export const postsXmlTemplateGenerator = (postsXmlData)=>{
    return `<?xml version="1.0" encoding="UTF-8"?>
                                 <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
                                 <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                                         xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
                                         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                                  ${postsXmlData}
                                 </urlset>`;
}