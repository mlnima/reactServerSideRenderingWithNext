module.exports = async (req, res) =>{
    res.set('Content-Type', 'text/plain;charset=utf-8');
    const robotTxtData = `User-agent: *
Crawl-delay: 10
Disallow: /admin
Disallow: /admin/*
Disallow: /profile/*
Disallow: /chatroom/*
Disallow: /messenger/*
Sitemap: ${process.env.NEXT_PUBLIC_PRODUCTION_URL}/sitemap.xml
Host: ${process.env.NEXT_PUBLIC_PRODUCTION_URL}
`
    res.send(robotTxtData);

}