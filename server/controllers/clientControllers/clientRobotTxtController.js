module.exports = async (req, res) =>{
    res.set('Content-Type', 'text/plain;charset=utf-8');
    const robotTxtData = `User-agent: *
Disallow: /admin
Sitemap: ${process.env.REACT_APP_PRODUCTION_URL}/sitemap.xml
`
    res.send(robotTxtData);
    res.end();
}