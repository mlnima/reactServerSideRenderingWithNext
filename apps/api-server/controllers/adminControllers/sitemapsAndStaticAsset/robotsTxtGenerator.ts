import fs from "fs";


//this is not in use from 20/06/2024, Nextjs handles it
export const robotsTxtGenerator = async (baseOutputPath:string) => {
    fs.writeFileSync(
        `${baseOutputPath}/robots.txt`,
        `User-agent: *
Crawl-delay: 10
Disallow: /admin/*
Disallow: /user/*
Disallow: /previewPost/*
Disallow: /dashboard/*
Disallow: /profile/*
Disallow: /chatroom/*
Disallow: /page/test
Disallow: /editPost/*
Disallow: /messenger/*
Disallow: /account/*
Disallow: /*?preview=true*
Sitemap: ${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap.xml
Host: ${process.env.NEXT_PUBLIC_PRODUCTION_URL}`,
        {
            encoding: "utf8",
            flag: "w",
        })
}

// need to be set dynamicaly from the settings

// User-agent: GPTBot
// Disallow: /
// User-agent: ChatGPT-User
// Disallow: /
// User-agent: CCBot
// Disallow: /
// User-agent: Google-Extended
// Disallow: /
// User-agent: FacebookBot
// Disallow: /
// User-agent: Omgilibot
// Disallow: /