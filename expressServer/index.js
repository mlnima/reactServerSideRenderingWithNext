"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
var connectToDatabase_1 = tslib_1.__importDefault(require("./_variables/connectToDatabase"));
(0, connectToDatabase_1.default)('Express Server');
// require('./_variables/connectToDatabase')
var express_1 = tslib_1.__importDefault(require("express"));
var next_1 = tslib_1.__importDefault(require("next"));
var body_parser_1 = tslib_1.__importDefault(require("body-parser"));
var express_fileupload_1 = tslib_1.__importDefault(require("express-fileupload"));
var cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
var path_1 = tslib_1.__importDefault(require("path"));
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("./middlewares/adminAuthMiddleware"));
var express_xml_bodyparser_1 = tslib_1.__importDefault(require("express-xml-bodyparser"));
var apicache_1 = tslib_1.__importDefault(require("apicache"));
var cors_1 = tslib_1.__importDefault(require("cors"));
var compression_1 = tslib_1.__importDefault(require("compression"));
var shouldCompress_1 = tslib_1.__importDefault(require("./_variables/shouldCompress"));
var apiCache_1 = tslib_1.__importDefault(require("./middlewares/apiCache"));
var adminMainRouter_1 = tslib_1.__importDefault(require("./controllers/adminControllers/adminMainRouter"));
var clientMainRouter_1 = tslib_1.__importDefault(require("./controllers/clientControllers/clientMainRouter"));
var clientMainFestController_1 = tslib_1.__importDefault(require("./controllers/clientControllers/clientMainFestController"));
var clientRobotTxtController_1 = tslib_1.__importDefault(require("./controllers/clientControllers/clientRobotTxtController"));
var siteMapController_1 = tslib_1.__importDefault(require("./controllers/sitemapControllers/siteMapController"));
var siteMapsController_1 = tslib_1.__importDefault(require("./controllers/sitemapControllers/siteMapsController"));
var subSiteMapsController_1 = tslib_1.__importDefault(require("./controllers/sitemapControllers/subSiteMapsController"));
var metaSitemapController_1 = tslib_1.__importDefault(require("./controllers/sitemapControllers/metaSitemapController"));
var pageSitemapController_1 = tslib_1.__importDefault(require("./controllers/sitemapControllers/pageSitemapController"));
var searchSitemapController_1 = tslib_1.__importDefault(require("./controllers/sitemapControllers/searchSitemapController"));
var dev = process.env.NODE_ENV !== 'production';
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
var staticServeOptions = {
    root: './static/',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }
};
var runServer = function () {
    var server = (0, express_1.default)();
    server.use((0, cors_1.default)());
    server.use((0, cookie_parser_1.default)());
    server.use((0, express_fileupload_1.default)());
    // expressServer.use(middleware());
    server.use(body_parser_1.default.json());
    server.use((0, express_xml_bodyparser_1.default)());
    server.use((0, compression_1.default)({ filter: shouldCompress_1.default }));
    var staticPath = dev ? '../static' : '../../static';
    var publicPath = dev ? '../public' : '../../public';
    server.use('/static', express_1.default.static(path_1.default.join(__dirname, staticPath), { maxAge: "604800000" }));
    server.use('/public', express_1.default.static(path_1.default.join(__dirname, publicPath), { maxAge: "604800000" }));
    server.get('/api/admin/settings/clearCaches', adminAuthMiddleware_1.default, function (req, res) {
        var _a;
        //@ts-ignore
        apicache_1.default.clear((_a = req.params) === null || _a === void 0 ? void 0 : _a.collection);
        res.json({ message: 'Deleting Cache Command Executed' });
    });
    server.get('/robots.txt', function (req, res) { return (0, clientRobotTxtController_1.default)(req, res); });
    server.get('/manifest.json', apiCache_1.default, function (req, res) { return (0, clientMainFestController_1.default)(req, res); });
    //xml siteMap routes
    server.get('/sitemap.xsl', function (req, res) {
        return res.status(200).sendFile('sitemap.xsl', staticServeOptions);
    });
    server.get('/sitemap.xml', apiCache_1.default, function (req, res) { return siteMapController_1.default.siteMap(req, res); });
    server.get('/sitemap', apiCache_1.default, function (req, res) { return siteMapController_1.default.siteMap(req, res); });
    server.get('/sitemaps/search.xml', apiCache_1.default, function (req, res) { return (0, searchSitemapController_1.default)(req, res); });
    server.get('/sitemaps/actors.xml', apiCache_1.default, function (req, res) { return metaSitemapController_1.default.actors(req, res); });
    server.get('/sitemaps/categories.xml', apiCache_1.default, function (req, res) { return metaSitemapController_1.default.categories(req, res); });
    server.get('/sitemaps/tags.xml', apiCache_1.default, function (req, res) { return metaSitemapController_1.default.tags(req, res); });
    server.get('/sitemaps/pages.xml', apiCache_1.default, function (req, res) { return (0, pageSitemapController_1.default)(req, res); });
    server.get('/sitemaps/:month', apiCache_1.default, function (req, res) { return siteMapsController_1.default.siteMapMonths(req, res); });
    server.get('/sitemap/:month/:pageNo', apiCache_1.default, function (req, res) { return subSiteMapsController_1.default.subSiteMapsController(req, res); });
    //api routes
    server.use('/api/admin', adminMainRouter_1.default);
    server.use('/api/v1', clientMainRouter_1.default);
    //rest of the routes
    server.get('*', apiCache_1.default, function (req, res) { return handle(req, res); });
    //@ts-ignore
    server.listen(process.env.PORT || 3000, function (error) {
        if (error)
            throw error;
        console.log("process ".concat(process.pid, " : server ").concat(process.env.PORT || 3000, " "));
    });
};
app.prepare().then(function () { return runServer(); }).catch(function (ex) {
    console.log('exit error:', ex.stack);
});
// if (!process.env.CPU_CORES_ALLOW_TO_USE || process.env.NODE_ENV !== 'production'){
//     app.prepare().then(()=>runServer()).catch((ex) => {
//         console.log('exit error:', ex.stack)
//     });
// }else{
//     if (cluster.isMaster){
//         const numberOfCpus = os.cpus()?.length
//         const numberOfCpusToUse = parseInt(process.env.CPU_CORES_ALLOW_TO_USE) || 1
//
//         if (numberOfCpusToUse < numberOfCpus ){
//             [...Array(numberOfCpusToUse)].forEach(()=>{
//                 cluster.fork()
//             })
//         }
//     }else {
//
//         app.prepare().then(()=>runServer()).catch((ex) => {
//             console.log('exit error:', ex.stack)
//         });
//     }
// }
//# sourceMappingURL=index.js.map