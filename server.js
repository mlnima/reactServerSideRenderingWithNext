const express = require('express');
// const https = require("https");
// const http = require("http");
// const { parse } = require("url");
const next = require('next');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const adminUsersRouter = require('./server/controllers/adminControllers/adminUsersRouter');
const adminSettingsRouter = require('./server/controllers/adminControllers/adminSettingsRouter');
const adminPostsRouter = require('./server/controllers/adminControllers/adminPostsRouter');
const adminWidgetsRouter = require('./server/controllers/adminControllers/adminWidgetsRouter');

const clientUsersRouter = require('./server/controllers/clientControllers/clientUsersRouter');
const clientSettingsRouter = require('./server/controllers/clientControllers/clientSettingsRouter');
const clientPostsRouter = require('./server/controllers/clientControllers/clientPostsRouter');
const clientWidgetsRouter = require('./server/controllers/clientControllers/clientWidgetsRouter');


//const postsControllers = require('./server/controllers/postsControllers');
const siteMapController = require('./server/controllers/siteMapController');
const siteMapsController = require('./server/controllers/siteMapsController');
const subSiteMapsController = require('./server/controllers/subSiteMapsController');
const settingsControllers = require('./server/controllers/settingsControllers');
const fileManagerControllers = require('./server/controllers/fileManagerControllers');
const pageControllers = require('./server/controllers/pageControllers');
const formController = require('./server/controllers/formController');
//const apiPostControllers = require('./server/controllers/apiControllers/apiPostsControllers');
const youtubeDataScrapper = require('./server/dataScrappers/youtube');
const paymentControllers = require('./server/controllers/paymentControllers');
const path = require('path');
const authMiddleware = require('./server/middlewares/authMiddleware');
const adminAuthMiddleware = require('./server/middlewares/adminAuthMiddleware');
//const apiRequestMiddleware = require('./server/middlewares/apiRequestMiddleware');
const xmlparser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apicache = require('apicache')
const compression = require('compression')
require('dotenv').config()
const cors = require('cors')
// const fs = require('fs');

//cache api
const cacheSuccesses = require('./server/middlewares/apiCache')
const settingSchema = require('./server/models/settings/settingSchema')


mongoose.Promise = global.Promise;
const mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));
//------------------------------------------------------------Page Cache doesnt work well--------------------------

const robotsOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

const PORT = process.env.REACT_APP_PORT || 3000;

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
}

// const credentials = process.env.REACT_APP_SSL === 'true' ? {
//     key: fs.readFileSync('./server/https/localhost-key.pem'),
//     cert: fs.readFileSync('./server/https/localhost.pem')
// } : {}

app.prepare().then(() => {
    const server = express();
    server.use(cors())
    // http.createServer(server).listen(3000)
    // https.createServer(credentials, server).listen(443)
    //
    // //  https.createServer(credentials,server).listen(PORT, (err) => {
    // //     if (err) throw err;
    // //     console.log(`server run on ${PORT}`)
    // // })

    // // const expressApp = express();
    // // const server = http.createServer(expressApp);
    // // const httpsServer = https.createServer(credentials, expressApp);

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`server run on ${PORT}`)
    })

    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlparser());
    server.use(compression({filter: shouldCompress}));
    server.use('/static', express.static(path.join(__dirname, 'static'),{maxAge: "365d"}))

    server.post('/api/v1/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        
        apicache.clear(req.params.collection)
        res.end()
    });

    server.get('/robots.txt', (req, res) => {
        res.set('Content-Type', 'text/plain;charset=utf-8');
        const robotTxtData = `User-agent: *
Disallow: /admin
Sitemap: ${process.env.REACT_APP_PRODUCTION_URL}/sitemap.xml
`
        res.send(robotTxtData);
        res.end();
    });

//     server.get('/sw.js' , (req, res) => {
//         res.set('Content-Type', 'text/javascript');
//         const serviceWorkerData = `self.addEventListener("install", function (event) {
// });
// `
//         res.send(serviceWorkerData);
//         res.end()
//     });

    //manifest
    server.get('/manifest.json', cacheSuccesses, async (req, res) => {
        
        const identityData = await settingSchema.findOne({type: 'identity'})
        const manifestJsonData = {
            "theme_color": identityData.data.themeColor || '#000',
            "background_color": identityData.data.themeColor || '#000',
            "name": identityData.data.title || 'React CMS website',
            "icons": [
                {
                    "src": identityData?.data?.pwa192 || process.env.REACT_APP_PRODUCTION_URL + '/static/images/pwa/192.png',
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any maskable"
                },
                {
                    "src": identityData?.data?.pwa384 || process.env.REACT_APP_PRODUCTION_URL + '/static/images/pwa/384.png',
                    "sizes": "384x384",
                    "type": "image/png",
                    "purpose": "any maskable"
                },
                {
                    "src": identityData?.data?.pwa512 || process.env.REACT_APP_PRODUCTION_URL + '/static/images/pwa/512.png',
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any maskable"
                }
            ],
            "display": "standalone",
            "start_url": "/",
            "orientation": "portrait"
        }
        res.json(manifestJsonData)
        res.end()
    });

    //xml siteMap handler
    server.get('/sitemap.xsl', (req, res) => {return res.status(200).sendFile('sitemap.xsl', robotsOptions)});
    server.get('/sitemap.xml', (req, res) => {siteMapController.siteMap(req , res)});
    server.get('/sitemaps/:month', (req, res) => {siteMapsController.siteMapMonths(req , res)});
    server.get('/sitemap/:month/:pageNo', (req, res) => {subSiteMapsController.siteMap(req , res)});

    server.use('/api/admin/users',adminUsersRouter)
    server.use('/api/admin/posts',adminPostsRouter)
    server.use('/api/admin/settings',adminSettingsRouter)
    server.use('/api/admin/widgets',adminWidgetsRouter)

    server.use('/api/v1/users',clientUsersRouter)
    server.use('/api/v1/posts',clientPostsRouter)
    server.use('/api/v1/settings',clientSettingsRouter)
    server.use('/api/v1/widgets',clientWidgetsRouter)



    //settings handler


    //server.post('/api/v1/settings/getSingleWidgetData', (req, res) => {settingsControllers.getSingleWidgetData(req, res)});
    server.post('/api/v1/settings/getWidget', (req, res) => {settingsControllers.getWidget(req, res)});
    server.post('/api/v1/settings/getWidgetsWithData', cacheSuccesses, (req, res) => {settingsControllers.getWidgetsWithData(req, res)});
    server.post('/api/v1/settings/updateWidget', adminAuthMiddleware, (req, res) => {settingsControllers.updateWidget(req, res)});
    server.post('/api/v1/settings/deleteWidget', adminAuthMiddleware, (req, res) => {settingsControllers.deleteWidget(req, res)});
    server.post('/api/v1/settings/saveCustomStyle', adminAuthMiddleware, (req, res) => {settingsControllers.saveCustomStyle(req, res)});
    //exe commands
    server.post('/api/v1/settings/executor', adminAuthMiddleware, (req, res) => {settingsControllers.executor(req, res)});
    //cache control


    //form
    server.post('/api/v1/form/contact', (req, res) => formController.contact(req, res));
    server.post('/api/v1/forms/save', (req, res) => formController.widgetForm(req, res));
    server.post('/api/v1/forms/get', (req, res) => formController.getFormsData(req, res));
    server.post('/api/v1/forms/getFormData', (req, res) => formController.getFormData(req, res));



    // file manager
    server.post('/api/v1/settings/fileManagerControllers-readPath', (req, res) => {fileManagerControllers.readPath(req, res)});
    server.post('/api/v1/settings/fileManagerControllers-readFile', (req, res) => {fileManagerControllers.readFile(req, res)});
    server.post('/api/v1/settings/fileManagerControllers-deleteFile', (req, res) => {fileManagerControllers.deleteFile(req, res)});
    server.post('/api/v1/settings/fileManagerControllers-uploadFile', (req, res) => {fileManagerControllers.uploadFile(req, res)});
    server.post('/api/v1/settings/fileManagerControllers-postThumbnailsUpload', (req, res) => {fileManagerControllers.postThumbnailsUpload(req, res)});
    server.post('/api/v1/settings/fileManagerControllers-uploadFiles', (req, res) => {fileManagerControllers.uploadFiles(req, res)});

    //need auth
    server.post('/api/v1/settings/fileManagerControllers-userImageUpload', authMiddleware, (req, res) => {
        fileManagerControllers.userImageUpload(req, res)
    });

    //pages
    server.post('/api/v1/pages/new', (req, res) => pageControllers.new(req, res));
    server.post('/api/v1/pages/update', (req, res) => pageControllers.update(req, res));
    server.post('/api/v1/pages/getPageData', (req, res) => pageControllers.getPageData(req, res));
    server.post('/api/v1/pages/getPagesData', (req, res) => pageControllers.getPagesData(req, res));
    server.post('/api/v1/pages/deletePage', (req, res) => pageControllers.deletePage(req, res));



    //data scrapper
    server.post('/api/v1/scrap/youtube', adminAuthMiddleware, (req, res) => {
        youtubeDataScrapper.gettingInfo(req, res)
    });



    //payments
    server.post('/api/v1/order/create/payPal', (req, res) => {
        paymentControllers.order_payPal(req, res)
    });
    server.post('/api/v1/order/get', adminAuthMiddleware, (req, res) => {
        paymentControllers.getOrders(req, res)
    });
//------------------------------- custom routes ---------------------------------

    server.get('*', (req, res) => {
        return handle(req, res)
    });



}).catch((ex) => {
    console.log('exit error:', ex.stack)
});


