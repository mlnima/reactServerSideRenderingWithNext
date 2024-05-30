import fs from "fs";

export const robotsTxtGenerator = async (baseOutputPath:string) => {
    fs.writeFileSync(
        `${baseOutputPath}/robots.txt`,
        `User-agent: *
Crawl-delay: 10
Disallow: /admin
Disallow: /admin/*
Disallow: /user
Disallow: /user/*
Disallow: /previewPost
Disallow: /dashboard
Disallow: /dashboard/*
Disallow: /profile/*
Disallow: /chatroom/*
Disallow: /page/test
Disallow: /editPost/*
Disallow: /*?preview=true*
Sitemap: ${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap.xml
Host: ${process.env.NEXT_PUBLIC_PRODUCTION_URL}`,
        {
            encoding: "utf8",
            flag: "w",
        })
}

