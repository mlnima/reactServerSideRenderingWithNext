const express = require('express');
const next = require('next');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const userController = require('./server/controllers/userControllers');
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
//cache page
const cacheableResponse = require('cacheable-response')
const normalizeUrl = require('normalize-url');
const {resolve: urlResolve} = require('url');
const Keyv = require('keyv');
//cache api
const cacheSuccesses = require('./server/middlewares/apiCache')
const cors = require('cors')
require('dotenv').config()



// const pageCache = require('./server/tools/pageCache')
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
//------------------------------------------------------------Page Cache --------------------------
const cacheStore = new Keyv({namespace: 'ssr-cache'});

const _getSSRCacheKey = req => {
    return req.originalUrl
};
// const cacheManager=(req, res, pagePath, queryParams) =>{
//     return cacheableResponse({
//         ttl: 1000 * 60 * 60, // 1hour
//         get: async () => {
//             const rawResEnd = res.end
//             const data = await new Promise((resolve) => {
//                 res.end = (payload) => {
//                     resolve(res.statusCode === 200 && payload)
//                 }
//                 app.render(req, res, pagePath, queryParams)
//             })
//             res.end = rawResEnd
//             return { data }
//         },
//         send: ({ data  },res) => {
//             res.send(data)
//         },
//         cache: cacheStore,
//         getKey: _getSSRCacheKey(req),
//         compress: true
//     });
// }

function clearCompleteCache(res, req) {
    cacheStore.clear();
}

function clearCacheForRequestUrl(req, res) {
    let key = _getSSRCacheKey(req);
    console.log(key);
    cacheStore.delete(key);
    res.status(200);
    res.send({
        path: req.hostname + req.baseUrl + req.path,
        key: key,
        purged: true,
        clearedCompleteCache: false
    });
    res.end();
}




const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({ req, res,targetComponent,queryParams }) => {
        const rawResEnd = res.end
        const data = await new Promise((resolve) => {
            res.end = (payload) => {
                resolve(res.statusCode === 200 && payload)
            }
            app.render(req, res, targetComponent, queryParams)
        }).catch(err=>{
            console.log(err)
            app.render(req, res, targetComponent, queryParams)
        })
        res.end = rawResEnd
        return { data }
    },
    send: ({ data, res }) => res.send(data),
    cache: cacheStore,
    getKey: ({req})=>_getSSRCacheKey(req),
    // compress: true
})







//-------------------------------------------------------------------------------------------------
const robotsOptions = {
    root: './static/',
    headers: {'Content-Type': 'text/plain;charset=utf-8'}
}

const PORT = process.env.REACT_APP_PORT || 3000;
app.prepare().then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlparser());
  //  server.use(cors())

    //-------------------
    server.use('/static', express.static(path.join(__dirname, 'static')))
    //--------------------
    server.get('/robots.txt', (req, res) => {
        res.set('Content-Type', 'text/plain;charset=utf-8');
        const robotTxtData = `User-agent: *
Disallow: /admin
Sitemap: ${process.env.PRODUCTION_URL}/sitemap.xml
`
        res.send(robotTxtData);
        res.end()

    });
    // server.get('/', (req, res) => {
    //     const targetComponent = '/';
    //     const queryParams = {
    //         ...req.query,
    //         ...req.params,
    //     }
    //
    //     return renderAndCache(req, res, targetComponent)
    // });

    //xml siteMap handler
    server.get('/sitemap.xsl', (req, res) => {
        return res.status(200).sendFile('sitemap.xsl', robotsOptions)
    });
    server.get('/sitemap.xml', (req, res) => {
        siteMapController.siteMap(req, res)
    });
    server.get('/sitemaps/:month', (req, res) => {
        siteMapsController.siteMapMonths(req, res)
    });
    server.get('/sitemap/:month/:pageNo', (req, res) => {
        subSiteMapsController.siteMap(req, res)
    });

    //users handler
    server.post('/api/v1/users/register', (req, res) => {
        userController.register(req, res)
    });
    server.post('/api/v1/users/login', (req, res) => {
        userController.login(req, res)
    });
    server.post('/api/v1/users/resetPassword', authMiddleware, (req, res) => {
        userController.resetPassword(req, res)
    });
    server.post('/api/v1/users/getUserInfo', authMiddleware, (req, res) => {
        userController.getUserInfo(req, res)
    });
    server.post('/api/v1/users/getUserData', authMiddleware, (req, res) => {
        userController.getUserData(req, res)
    });
    // server.post('/api/v1/users/getMyProfileData',authMiddleware,(req,res)=>{userController.getMyProfileData(req,res)});
    server.post('/api/v1/users/updateUserData', adminAuthMiddleware, (req, res) => {
        userController.updateUserData(req, res)
    });
    server.post('/api/v1/users/getUsersList', (req, res) => {
        userController.getUsersList(req, res)
    });
    server.post('/api/v1/users/getUsersListAsAdmin', adminAuthMiddleware, (req, res) => {
        userController.getUsersListAsAdmin(req, res)
    });
    server.post('/api/v1/users/newAPIKey', adminAuthMiddleware, (req, res) => {
        userController.newAPIKey(req, res)
    });

    //posts handler
    // server.post('/api/v1/posts',authMiddleware,(req,res)=>{postsControllers.getPostsInfo(req,res)});
    server.post('/api/v1/posts',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        //cacheSuccesses
        postsControllers.getPostsInfo(req, res)
    });
    server.post('/api/v1/posts/post',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        postsControllers.getPostInfo(req, res)
    });
    server.post('/api/v1/posts/createNewPost', async (req, res) => {
        await postsControllers.createNewPost(req, res)
    });
    server.post('/api/v1/posts/updatePost', (req, res) => {
        postsControllers.updatePost(req, res)
    });
    server.post('/api/v1/posts/deletePost', (req, res) => {
        postsControllers.deletePost(req, res)
    });
    server.post('/api/v1/posts/postsBulkAction', (req, res) => {
        postsControllers.postsBulkAction(req, res)
    });
    server.post('/api/v1/posts/likeDislikeView', (req, res) => {
        postsControllers.likeDislikeView(req, res)
    });

    server.post('/api/v1/posts/bulkAction', (req, res) => {
        postsControllers.bulkAction(req, res)
    });


    //meta data handler(tags,categories...)
    server.post('/api/v1/posts/getMeta',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        postsControllers.getMeta(req, res)
    });
    server.post('/api/v1/posts/getSingleMeta', (req, res) => {
        //need to be cache id page cache doesnt work
        postsControllers.getSingleMeta(req, res)
    });
    server.post('/api/v1/posts/updateMeta', (req, res) => {
        postsControllers.updateMeta(req, res)
    });
    server.post('/api/v1/posts/deleteMeta', adminAuthMiddleware, (req, res) => {
        //need to be cache id page cache doesnt work
        postsControllers.deleteMeta(req, res)
    });

    //comments handler
    server.post('/api/v1/posts/newComment', (req, res) => {
        postsControllers.newComment(req, res)
    });
    server.post('/api/v1/posts/getComments', (req, res) => {
        postsControllers.getComments(req, res)
    });
    server.post('/api/v1/posts/updateComment', (req, res) => {
        postsControllers.updateComment(req, res)
    });
    server.post('/api/v1/posts/deleteComments', (req, res) => {
        postsControllers.deleteComments(req, res)
    });

    //settings handler
    server.post('/api/v1/settings/update', (req, res) => {
        settingsControllers.update(req, res)
    });
    server.post('/api/v1/settings/get', (req, res) => {
        settingsControllers.get(req, res)
    });
    server.post('/api/v1/settings/getMultiple',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        //cacheSuccesses
        settingsControllers.getMultiple(req, res)
    });
    server.post('/api/v1/settings/addWidget', (req, res) => {
        settingsControllers.addWidget(req, res)
    });
    server.post('/api/v1/settings/getSingleWidgetData', (req, res) => {
        settingsControllers.getSingleWidgetData(req, res)
    });
    server.post('/api/v1/settings/getWidget', (req, res) => {
        settingsControllers.getWidget(req, res)
    });
    server.post('/api/v1/settings/getMultipleWidgetWithData',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        //cacheSuccesses
        settingsControllers.getMultipleWidgetWithData(req, res)
    });
    server.post('/api/v1/settings/getWidgetsWithData',cacheSuccesses, (req, res) => {
        //need to be cache id page cache doesnt work
        //cacheSuccesses
        settingsControllers.getWidgetsWithData(req, res)
    });
    server.post('/api/v1/settings/updateWidget', (req, res) => {
        settingsControllers.updateWidget(req, res)
    });
    server.post('/api/v1/settings/deleteWidget', (req, res) => {
        settingsControllers.deleteWidget(req, res)
    });
    server.post('/api/v1/settings/saveCustomStyle', (req, res) => {
        settingsControllers.saveCustomStyle(req, res)
    });
    //exe commands
    server.post('/api/v1/settings/executor', (req, res) => {
        settingsControllers.executor(req, res)
    });
    //cache control
    server.post('/api/v1/settings/clearCaches', adminAuthMiddleware, (req, res) => {
        apicache.clear(req.params.collection)
        clearCompleteCache()
        res.end()
    });

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
    server.post('/api/v1/order/get',adminAuthMiddleware, (req, res) => {
        paymentControllers.getOrders(req, res)
    });
//-------------------post----------------------

    const shouldCompress = (req, res) => {
        if (req.headers['x-no-compression']) {
            return false
        }
        return compression.filter(req, res)
    }


    server.get('/admin', (req, res) => {app.render(req, res, '/admin',  {...req.query, ...req.params})});
    // server.get('/login', (req, res) => {ssrCache({req, res, targetComponent:'/auth/login', queryParams: {...req.query, ...req.params}})});
    // server.get('/register', (req, res) => {ssrCache({req, res, targetComponent:'/auth/register', queryParams: {...req.query, ...req.params}})});
    // server.get('/tags/:tag', (req, res) => {ssrCache({req, res, targetComponent:'/posts', queryParams: {...req.query, ...req.params,contentName: 'tag'}})});
    // server.get('/categories/:category', (req, res) => {ssrCache({req, res, targetComponent:'/posts', queryParams: {...req.query, ...req.params,contentName: 'category'}})});
    // server.get('/actors/:actor', (req, res) => {ssrCache({req, res, targetComponent:'/posts', queryParams: {...req.query, ...req.params,contentName: 'actor'}})});
    // server.get('/categories', (req, res) => {ssrCache({req, res, targetComponent:'/meta', queryParams: {...req.query, ...req.params,contentType:'categories'}})});
    // server.get('/tags', (req, res) => {ssrCache({req, res, targetComponent:'/meta', queryParams: {...req.query, ...req.params,contentType:'tags'}})});
    // server.get('/actors', (req, res) => {ssrCache({req, res, targetComponent:'/meta', queryParams: {...req.query, ...req.params,contentType:'actors'}})});
    // server.get('/video/:title', (req, res) => {ssrCache({req, res, targetComponent:'/post', queryParams: {...req.query, ...req.params}})});
    // server.get('/product/:title', (req, res) => {ssrCache({req, res, targetComponent:'/post', queryParams: {...req.query, ...req.params}})});
    // server.get('/article/:title', (req, res) => {ssrCache({req, res, targetComponent:'/post', queryParams: {...req.query, ...req.params}})});
    // server.get('/page/:pageName', (req, res) => {ssrCache({req, res, targetComponent:'/page', queryParams: {...req.query, ...req.params}})});





    //server.get('/:locale/admin', (req, res) => {ssrCache({req, res, targetComponent:'/admin', queryParams: {...req.query, ...req.params}})});



   // server.get('/:locale', (req, res) => {ssrCache({req, res, targetComponent:'/', queryParams: {...req.query, ...req.params}})});

                     // server.get('/:locale/posts', (req, res) => {ssrCache({req, res, targetComponent:'/posts', queryParams: {...req.query, ...req.params}})});
                        // server.get('/:locale/login', (req, res) => {ssrCache({req, res, targetComponent:'/auth/login', queryParams: {...req.query, ...req.params}})});
                        // server.get('/:locale/register', (req, res) => {ssrCache({req, res, targetComponent:'/auth/register', queryParams: {...req.query, ...req.params}})});
    // server.get('/:locale/tags/:tag', (req, res) => {ssrCache({req, res, targetComponent:'/posts', queryParams: {...req.query, ...req.params,contentName: 'tag'}})});
    // server.get('/:locale/categories/:category', (req, res) => {ssrCache({req, res, targetComponent:'/posts', queryParams: {...req.query, ...req.params,contentName: 'category'}})});
    // server.get('/:locale/actors/:actor', (req, res) => {ssrCache({req, res, targetComponent:'/posts', queryParams: {...req.query, ...req.params,contentName: 'actor'}})});
                        // server.get('/:locale/categories', (req, res) => {ssrCache({req, res, targetComponent:'/meta', queryParams: {...req.query, ...req.params,contentType:'categories'}})});
                        // server.get('/:locale/tags', (req, res) => {ssrCache({req, res, targetComponent:'/meta', queryParams: {...req.query, ...req.params,contentType:'tags'}})});
                        // server.get('/:locale/actors', (req, res) => {ssrCache({req, res, targetComponent:'/meta', queryParams: {...req.query, ...req.params,contentType:'actors'}})});
                     // server.get('/:locale/post/:title', (req, res) => {ssrCache({req, res, targetComponent:'/post', queryParams: {...req.query, ...req.params}})});
                     // server.get('/:locale/video/:title', (req, res) => {ssrCache({req, res, targetComponent:'/post', queryParams: {...req.query, ...req.params}})});
                     // server.get('/:locale/product/:title', (req, res) => {ssrCache({req, res, targetComponent:'/post', queryParams: {...req.query, ...req.params}})});
                     // server.get('/:locale/article/:title', (req, res) => {ssrCache({req, res, targetComponent:'/post', queryParams: {...req.query, ...req.params}})});
                    // server.get('/:locale/page/:pageName', (req, res) => {ssrCache({req, res, targetComponent:'/page', queryParams: {...req.query, ...req.params}})});
                    // server.get('/:locale/profile', (req, res) => {ssrCache({req, res, targetComponent:'/profile', queryParams: {...req.query, ...req.params}})});
                    // server.get('/:locale/checkout', (req, res) => {ssrCache({req, res, targetComponent:'/checkout', queryParams: {...req.query, ...req.params}})});








    // server.get('*', (req, res) => {
    //     const queryParams = {...req.query, ...req.params}
    //     ssrCache({req, res, targetComponent:req.path,queryParams })
    //     // return handle(req, res)
    // });
    server.get('/:locale/*', (req, res) => {
        return handle(req, res)
    });
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


