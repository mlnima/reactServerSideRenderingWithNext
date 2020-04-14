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
const path = require('path');
const authMiddleware = require('./server/middlewares/authMiddleware');
const adminAuthMiddleware = require('./server/middlewares/adminAuthMiddleware');
const xmlparser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
//cache
const apicache = require('apicache')
const cache = apicache.middleware;
const onlyStatus200 = (req, res) => {
    // console.log( req.query.noCache)
    //     // if (req.query.noCache){
    //     //     return false
    //     // }else if ( res.statusCode === 200){
    //     //     return true
    //     // }
   return  res.statusCode === 200;
}
const cacheSuccesses = cache('1 day', onlyStatus200);
//--------

//--
mongoose.Promise = global.Promise;

const mongoDBConnectionUrl = process.env.DB_LOCAL ?
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` :
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(mongoDBConnectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));

//Issue with __dirname
const robotsOptions = {
    root:  './static/',
    headers: {'Content-Type':'text/plain;charset=utf-8'}
}
const PORT = process.env.REACT_APP_PORT || 3000;

app.prepare().then(()=>{
    const server = express();
    server.use(cookieParser());
    server.use(fileUpload());
    // server.use(fileUpload({
    //     useTempFiles: true,
    //     tempFileDir: './tmp/'
    // }));
    server.use(bodyParser.json());
    server.use(xmlparser());





    server.get('/robots.txt',(req,res)=>{
        return res.status(200).sendFile('robots.txt',robotsOptions)
    });
    server.get('/favicon.ico',(req,res)=>{
        return res.status(200).sendFile('/images/favicon/favicon.ico',robotsOptions)
    });

    //xml siteMap handler
    server.get('/sitemap.xsl',(req,res)=>{ return res.status(200).sendFile('sitemap.xsl',robotsOptions) });
    server.get('/sitemap.xml',(req,res)=>{siteMapController.siteMap(req,res)});
    server.get('/sitemaps/:month',(req,res)=>{siteMapsController.siteMapMonths(req,res)});
    server.get('/sitemap/:month/:pageNo',(req,res)=>{subSiteMapsController.siteMap(req,res)});

     //users handler
    server.post('/api/v1/users/register',(req,res)=>{userController.register(req,res)});
    server.post('/api/v1/users/login',(req,res)=>{userController.login(req,res)});
    server.post('/api/v1/users/getUserInfo',authMiddleware,(req,res)=>{userController.getUserInfo(req,res)});
    server.post('/api/v1/users/getUsersList',(req,res)=>{userController.getUsersList(req,res)});
    server.post('/api/v1/users/getUsersListAsAdmin',(req,res)=>{userController.getUsersListAsAdmin(req,res)});

    //posts handler
    // server.post('/api/v1/posts',authMiddleware,(req,res)=>{postsControllers.getPostsInfo(req,res)});
    server.post('/api/v1/posts',cacheSuccesses,(req,res)=>{postsControllers.getPostsInfo(req,res)});
    server.post('/api/v1/posts/post',cacheSuccesses,(req,res)=>{postsControllers.getPostInfo(req,res)});
    server.post('/api/v1/posts/createNewPost',(req,res)=>{postsControllers.createNewPost(req,res)});
    server.post('/api/v1/posts/updatePost',(req,res)=>{postsControllers.updatePost(req,res)});
    server.post('/api/v1/posts/deletePost',(req,res)=>{postsControllers.deletePost(req,res)});
    server.post('/api/v1/posts/postsBulkAction',(req,res)=>{postsControllers.postsBulkAction(req,res)});
    server.post('/api/v1/posts/likeDislikeView',(req,res)=>{postsControllers.likeDislikeView(req,res)});

    //meta data handler(tags,categories...)
    server.post('/api/v1/posts/getMeta',cacheSuccesses,(req,res)=>{postsControllers.getMeta(req,res)});

    //comments handler
    server.post('/api/v1/posts/newComment',(req,res)=>{postsControllers.newComment(req,res)});
    server.post('/api/v1/posts/getComments',cacheSuccesses,(req,res)=>{postsControllers.getComments(req,res)});
    server.post('/api/v1/posts/updateComment',(req,res)=>{postsControllers.updateComment(req,res)});

    //settings handler
    server.post('/api/v1/settings/update',(req,res)=>{settingsControllers.update(req,res)});
    server.post('/api/v1/settings/get',(req,res)=>{settingsControllers.get(req,res)});
    server.post('/api/v1/settings/getMultiple',cacheSuccesses,(req,res)=>{settingsControllers.getMultiple(req,res)});
    server.post('/api/v1/settings/addWidget',(req,res)=>{settingsControllers.addWidget(req,res)});
    server.post('/api/v1/settings/getWidget',(req,res)=>{settingsControllers.getWidget(req,res)});
    server.post('/api/v1/settings/getMultipleWidgetWithData',cacheSuccesses,(req,res)=>{settingsControllers.getMultipleWidgetWithData(req,res)});
    server.post('/api/v1/settings/getWidgetsWithData',cacheSuccesses,(req,res)=>{settingsControllers.getWidgetsWithData(req,res)});
    server.post('/api/v1/settings/updateWidget',(req,res)=>{settingsControllers.updateWidget(req,res)});
    server.post('/api/v1/settings/deleteWidget',(req,res)=>{settingsControllers.deleteWidget(req,res)});
    server.post('/api/v1/settings/saveCustomStyle',(req,res)=>{settingsControllers.saveCustomStyle(req,res)});
    //exe commands
    server.post('/api/v1/settings/executor',(req,res)=>{settingsControllers.executor(req,res)});
    // file manager
    server.post('/api/v1/settings/fileManagerControllers-readPath',(req,res)=>{fileManagerControllers.readPath(req,res)});
    server.post('/api/v1/settings/fileManagerControllers-uploadFile',(req,res)=>{ fileManagerControllers.uploadFile(req,res)});


//-------------------post route bad for SEO----------------------

    server.get('/posts',(req,res)=>{
        const targetComponent = '/posts';
        app.render(req,res,targetComponent)
    });

    server.get('/admin',(req,res)=>{
        const targetComponent = '/admin';
        app.render(req,res,targetComponent)
    });

    server.get('/errorPage',(req,res)=>{
        const targetComponent = '/errorPage';
        app.render(req,res,targetComponent)
    });




    // server.get('/tags',(req,res)=>{
    //     const targetComponent = '/metaPage';
    //     const params = {
    //         type:'tags'
    //     }
    //     app.render(req,res,targetComponent,params)
    // });
    // server.get('/posts',(req,res)=>{
    //     const targetComponent = '/posts';
    //     const params = {
    //         page:req.query.page,
    //         category:req.query.category,
    //         tag:req.query.tag,
    //         sort:req.query.sort,
    //         size:req.query.size,
    //         type:req.query.type,
    //         keyword:req.query.keyword,
    //         author:req.query.author,
    //     }
    //     app.render(req,res,targetComponent)
    // });
    // server.get('/page/tags',(req,res)=>{
    //     const targetComponent = '/page/tags';
    //     const params = {
    //         page:req.query.page,
    //         sort:req.query.sort,
    //         size:req.query.size,
    //     }
    //     app.render(req,res,targetComponent,params)
    // });



    server.get('/page/categories/:pageNo',(req,res)=>{
        const targetComponent = '/page/categories';
        const params = {pageNo:req.params.pageNo}
        app.render(req,res,targetComponent,params)
    });

    // server.get('/page/:pageNo',(req,res)=>{
    //     const targetComponent = '/page/categories';
    //     const params = {pageNo:req.params.pageNo}
    //     app.render(req,res,targetComponent,params)
    // });

    server.get('/:postTitle',(req,res)=>{
        const targetComponent = '/post';
        const params = {postTitle:req.params.postTitle}
        app.render(req,res,targetComponent,params)
    });

    server.get('*',(req,res)=>{
        return handle(req,res)
    });

    server.listen(PORT,(err)=>{
        if (err) throw err;
        console.log( `server run on ${PORT}`)
    })
}).catch((ex)=>{
    console.log( 'exit error:',ex.stack)
});


