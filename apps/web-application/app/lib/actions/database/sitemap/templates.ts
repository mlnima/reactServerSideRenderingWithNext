export const urlSetXmlTemplate = (data: string) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data}
    </urlset>`;
};

export const rootTemplate = (data: string) => {
  const toDay = new Date();
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
  <!-- generated-on="${toDay.toUTCString()}" -->     
    <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                  http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" 
                  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                  ${data}    
    </sitemapindex>`;
};


export const sitemapItemTemplate = (url:string, lastModifiedDate:string) => {
  return `<sitemap>
               <loc>${url}</loc>
               <lastmod>${lastModifiedDate}</lastmod>
           </sitemap>`;
};
export const urlXmlTemplate = (Url:string, date:string, changeFreq:string, priority:string) => {
  return `<url> 
             <loc>${Url}</loc>
             <lastmod>${date}</lastmod>
             <changefreq>${changeFreq}</changefreq>
             <priority>${priority}</priority>
          </url>`
};

export const pagesDataToXmlString = async (pages:any[]) => {
  return pages.reduce((sitemap,currentPageData)=>{
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
}

export const pagesTemplateGenerator = async (pages:any[]) => {
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