import fs from "fs";

export const robotsTxtGenerator = async (baseOutputPath) => {
    await fs.writeFileSync(
        `${baseOutputPath}/robots.txt`,
        `User-agent: *
Crawl-delay: 10
Disallow: /admin
Disallow: /admin/*
Disallow: /profile/*
Disallow: /chatroom/*
Disallow: /messenger/*
Sitemap: ${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap.xml
Host: ${process.env.NEXT_PUBLIC_PRODUCTION_URL}`,
        {
            encoding: "utf8",
            flag: "w",
        })
}

