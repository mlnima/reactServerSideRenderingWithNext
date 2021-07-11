const express = require('express');
const { createServer } = require("https");
const next = require('next');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const userController = require('./server/controllers/userControllers');
const adminUsersController = require('./server/controllers/adminControllers/adminUsersController');
const clientUsersController = require('./server/controllers/clientControllers/clientUsersController');
const postsControllers = require('./server/controllers/postsControllers');
const siteMapController = require('./server/controllers/siteMapController');
const siteMapsController = require('./server/controllers/siteMapsController');
const subSiteMapsController = require('./server/controllers/subSiteMapsController');
const settingsControllers = require('./server/controllers/settingsControllers');
const fileManagerControllers = require('./server/controllers/fileManagerControllers');
const pageControllers = require('./server/controllers/pageControllers');
const formController = require('./server/controllers/formController');
const apiPostControllers = require('./server/controllers/apiControllers/apiPostsControllers');
const youtubeDataScrapper = require('./server/dataScrappers/youtube');
const paymentControllers = require('./server/controllers/paymentControllers');
const path = require('path');
const authMiddleware = require('./server/middlewares/authMiddleware');
const adminAuthMiddleware = require('./server/middlewares/adminAuthMiddleware');
const apiRequestMiddleware = require('./server/middlewares/apiRequestMiddleware');
const xmlparser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const apicache = require('apicache')
const compression = require('compression')
require('dotenv').config()
const fs = require('fs');
const {parse} = require('url')
const cors = require('cors')
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

const sslOptions = process.env.REACT_APP_SSL === 'true' ? {
    key: fs.readFileSync('./server/https/key.key'),
    cert: fs.readFileSync('./server/https/certificate.crt')
} : {}

app.prepare().then(() => {
   // if (process.env.REACT_APP_SSL === 'true'){
   //     createServer(sslOptions, (req, res) => {
   //         const parsedUrl = parse(req.url, true);
   //         handle(req, res, parsedUrl);
   //     }).listen(3443, (err) => {
   //         if (err) throw err;
   //         console.log("> Server started on https://localhost:3443");
   //     });
   // }

    // console.log(process.env.REACT_APP_SSL)
    //console.log(sslOptions)


    const server = express(sslOptions);
    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlparser());
    server.use(compression({filter: shouldCompress}));
    server.use('/static', express.static(path.join(__dirname, 'static')))

    const serverLog = (req,res)=>{
        //console.log(req.url)
    }

    server.post('/api/v1/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        
        apicache.clear(req.params.collection)
        res.end()
    });

    server.get('/robots.txt', (req, res) => {
        res.set('Content-Type', 'text/plain;charset=utf-8');
        const robotTxtData = `User-agent: *
Disallow: /admin
Sitemap: ${process.env.PRODUCTION_URL}/sitemap.xml
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
        // console.log(identityData, process.env.PRODUCTION_URL, identityData?.data?.favIcon)
        const manifestJsonData = {
            "theme_color": identityData.data.themeColor || '#000',
            "background_color": identityData.data.themeColor || '#000',
            "name": identityData.data.title || 'React CMS website',
            "icons": [

                {
                    "src": identityData?.data?.pwa192 || process.env.PRODUCTION_URL + '/static/images/pwa/192.png',
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any maskable"
                },
                {
                    "src": identityData?.data?.pwa384 || process.env.PRODUCTION_URL + '/static/images/pwa/384.png',
                    "sizes": "384x384",
                    "type": "image/png",
                    "purpose": "any maskable"
                },
                {
                    "src": identityData?.data?.pwa512 || process.env.PRODUCTION_URL + '/static/images/pwa/512.png',
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
    //users handler
    server.use('/api/v1/users',clientUsersController)
    server.use('/api/admin/users',adminUsersController)


    // server.post('/api/v1/users/register', (req, res) => {clientUsersController.clientRegisterNewUser(req, res)});
    // server.post('/api/v1/users/login', (req, res) => {clientUsersController.clientUserLogin(req, res)});
    // server.post('/api/v1/users/resetPassword', authMiddleware, (req, res) => {clientUsersController.ClientResetUserPassword(req, res)});
    // server.post('/api/v1/users/getUserInfo', authMiddleware, (req, res) => { clientUsersController.clientGetUserInfo(req, res)});
    // server.post('/api/v1/users/getUserData', authMiddleware, (req, res) => {clientUsersController.clientGetUserData(req, res)});
    // server.post('/api/v1/users/updateUserData', authMiddleware, (req, res) => {clientUsersController.clientUpdateUserData(req,res)});
    // server.post('/api/v1/users/getUserPreviewData', (req, res) => {clientUsersController.clientGetUserPreviewData(req, res)});
    // server.post('/api/v1/users/getMultipleUserDataById', (req, res) => {clientUsersController.clientGetUserPreviewData(req, res)});
    //server.post('/api/v1/users/getUsersList', (req, res) => {userController.getUsersList(req, res)});
    // server.post('/api/v1/users/getUsersListAsAdmin', adminAuthMiddleware, (req, res) => {userController.getUsersListAsAdmin(req, res)});
    //server.post('/api/v1/users/newAPIKey', adminAuthMiddleware, (req, res) => {userController.newAPIKey(req, res)});



    //user social route
    // server.post('/api/v1/users/followUser',authMiddleware, (req, res) => {clientUsersController.clientFollowUser(req, res)});
    // server.post('/api/v1/users/unFollowUser',authMiddleware, (req, res) => {clientUsersController.clientUnFollowUser(req, res)});
    //posts handler
    // server.post('/api/v1/posts',authMiddleware,(req,res)=>{postsControllers.getPostsInfo(req,res)});
    server.post('/api/v1/posts', cacheSuccesses, async (req, res) => {await postsControllers.getPostsInfo(req, res)});
    server.post('/api/v1/posts/post', cacheSuccesses, (req, res) => {postsControllers.getPostInfo(req, res)});
    server.post('/api/v1/posts/createNewPost', adminAuthMiddleware, async (req, res) => {await postsControllers.createNewPost(req, res)});
    server.post('/api/v1/posts/updatePost', adminAuthMiddleware, async (req, res) => {await postsControllers.updatePost(req, res)});
    server.post('/api/v1/posts/deletePost', adminAuthMiddleware, (req, res) => {postsControllers.deletePost(req, res)});
    server.post('/api/v1/posts/postsBulkAction', adminAuthMiddleware, (req, res) => {postsControllers.postsBulkAction(req, res)});
    server.post('/api/v1/posts/likeDislikeView', (req, res) => {postsControllers.likeDislikeView(req, res)});
    server.post('/api/v1/posts/bulkAction', adminAuthMiddleware, (req, res) => {postsControllers.bulkAction(req, res)});
    server.post('/api/v1/posts/checkRemovedContent', (req, res) => {postsControllers.checkRemovedContent(req, res)});


    //meta data handler(tags,categories...)
    server.post('/api/v1/posts/getMeta', cacheSuccesses, (req, res) => {postsControllers.getMeta(req, res)});
    server.post('/api/v1/posts/getSingleMeta', (req, res) => {postsControllers.getSingleMeta(req, res)});
    server.post('/api/v1/posts/updateMeta', adminAuthMiddleware, (req, res) => {postsControllers.updateMeta(req, res)});
    server.post('/api/v1/posts/deleteMeta', adminAuthMiddleware, (req, res) => {postsControllers.deleteMeta(req, res)});

    //comments handler
    server.post('/api/v1/posts/newComment', (req, res) => {postsControllers.newComment(req, res)});
    server.post('/api/v1/posts/getComments', (req, res) => { postsControllers.getComments(req, res)});
    server.post('/api/v1/posts/updateComment', adminAuthMiddleware, (req, res) => { postsControllers.updateComment(req, res)});
    server.post('/api/v1/posts/deleteComments', adminAuthMiddleware, (req, res) => {postsControllers.deleteComments(req, res)});

    //settings handler
    server.post('/api/v1/settings/update', adminAuthMiddleware, (req, res) => {settingsControllers.update(req, res)});
    server.post('/api/v1/settings/get', (req, res) => {settingsControllers.get(req, res)});
    server.post('/api/v1/settings/getMultiple', cacheSuccesses, (req, res) => {settingsControllers.getMultiple(req, res)});
    server.post('/api/v1/settings/addWidget', adminAuthMiddleware, (req, res) => { settingsControllers.addWidget(req, res)});
    server.post('/api/v1/settings/getSingleWidgetData', (req, res) => {settingsControllers.getSingleWidgetData(req, res)});
    server.post('/api/v1/settings/getWidget', (req, res) => {settingsControllers.getWidget(req, res)});

    //cacheSuccesses
    server.post('/api/v1/settings/getMultipleWidgetWithData', cacheSuccesses, (req, res) => {settingsControllers.getMultipleWidgetWithData(req, res)});


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

    //page
    server.post('/api/v1/pages/new', (req, res) => pageControllers.new(req, res));
    server.post('/api/v1/pages/update', (req, res) => pageControllers.update(req, res));
    server.post('/api/v1/pages/getPageData', (req, res) => pageControllers.getPageData(req, res));
    server.post('/api/v1/pages/getPagesData', (req, res) => pageControllers.getPagesData(req, res));
    server.post('/api/v1/pages/deletePage', (req, res) => pageControllers.deletePage(req, res));

    // file manager
    server.post('/api/v1/settings/fileManagerControllers-readPath', (req, res) => {
        fileManagerControllers.readPath(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-readFile', (req, res) => {
        fileManagerControllers.readFile(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-deleteFile', (req, res) => {
        fileManagerControllers.deleteFile(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-uploadFile', (req, res) => {
        fileManagerControllers.uploadFile(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-postThumbnailsUpload', (req, res) => {
        fileManagerControllers.postThumbnailsUpload(req, res)
    });
    server.post('/api/v1/settings/fileManagerControllers-uploadFiles', (req, res) => {
        fileManagerControllers.uploadFiles(req, res)
    });
    //need auth
    server.post('/api/v1/settings/fileManagerControllers-userImageUpload', authMiddleware, (req, res) => {
        fileManagerControllers.userImageUpload(req, res)
    });

    //API
    server.post('/api/v1/posts/createNewByApi', apiRequestMiddleware, (req, res) => {
        apiPostControllers.creatPost(req, res)
    });

    //data scrapper
    server.post('/api/v1/scrap/youtube', adminAuthMiddleware, (req, res) => {
        youtubeDataScrapper.gettingInfo(req, res)
    });

    //exporter
    server.post('/api/v1/posts/export', (req, res) => {
        postsControllers.export(req, res)
    });

    //payments
    server.post('/api/v1/order/create/payPal', (req, res) => {
        paymentControllers.order_payPal(req, res)
    });
    server.post('/api/v1/order/get', adminAuthMiddleware, (req, res) => {
        paymentControllers.getOrders(req, res)
    });
//------------------------------- custom routes ---------------------------------

//     server.get('/',(req, res) => {
//         return app.render(req, res,  '/')
//     });
//     server.get('/_next/static/development/_devPagesManifest.json', ({ req, res }) => handle(req, res));
//     server.get('/_next/build-manifest.json', ({ req, res }) => handle(req, res));

    server.get('*', (req, res) => {
        
        return handle(req, res)
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`server run on ${PORT}`)
    })
}).catch((ex) => {
    console.log('exit error:', ex.stack)
});


