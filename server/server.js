const express = require('express');
const next = require('next');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userController = require('./controllers/userControllers');
const postsControllers = require('./controllers/postsControllers');
const siteMapController = require('./controllers/siteMapController');
const siteMapsController = require('./controllers/siteMapsController');
const subSiteMapsController = require('./controllers/subSiteMapsController');
const path = require('path');
const authMiddleware = require('./middlewares/authMiddleware');
const xmlparser = require("express-xml-bodyparser");
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

mongoose.connect("mongodb://localhost:27017/nextDB", {
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
const PORT = process.env.PORT || 3000;

app.prepare().then(()=>{
    const server = express();
    server.use(bodyParser.json());
    server.use(xmlparser());
    server.get('/robots.txt',(req,res)=>{
        return res.status(200).sendFile('robots.txt',robotsOptions)
    });
    server.get('/sitemap.xsl',(req,res)=>{ return res.status(200).sendFile('sitemap.xsl',robotsOptions) });


    server.get('/sitemap.xml',(req,res)=>{siteMapController.siteMap(req,res)});
    server.get('/sitemaps/:month',(req,res)=>{siteMapsController.siteMapMonths(req,res)});
    server.get('/sitemap/:month/:pageNo',(req,res)=>{subSiteMapsController.siteMap(req,res)});

    server.post('/api/v1/users/register',(req,res)=>{userController.register(req,res)});
    server.post('/api/v1/users/login',(req,res)=>{userController.login(req,res)});
    server.post('/api/v1/users/getUserInfo',authMiddleware,(req,res)=>{userController.getUserInfo(req,res)});
    // server.post('/api/v1/posts',authMiddleware,(req,res)=>{postsControllers.getPostsInfo(req,res)});
    server.post('/api/v1/posts',(req,res)=>{postsControllers.getPostsInfo(req,res)});
    server.post('/api/v1/posts/post',(req,res)=>{postsControllers.getPostInfo(req,res)});
    server.post('/api/v1/posts/createNewPost',authMiddleware,(req,res)=>{postsControllers.createNewPost(req,res)});
    server.post('/api/v1/posts/updatePost',authMiddleware,(req,res)=>{postsControllers.updatePost(req,res)});
    server.post('/api/v1/posts/deletePost',authMiddleware,(req,res)=>{postsControllers.deletePost(req,res)});
    server.post('/api/v1/posts/postsBulkAction',authMiddleware,(req,res)=>{postsControllers.postsBulkAction(req,res)});
    server.post('/api/v1/posts/likeDislikeView',(req,res)=>{postsControllers.likeDislikeView(req,res)});

//-------------------post route bad for SEO----------------------
    server.get('/post/:id/:postTitle',(req,res)=>{
        const targetComponent = '/post';
        app.render(req,res,targetComponent)

    });
//---------------------------------------------------------------
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


