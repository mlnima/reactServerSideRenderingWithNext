const express = require('express');
const next = require('next');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userController = require('./controllers/userControllers');
const path = require('path');
const authMiddleware = require('./middlewares/authMiddleware');

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
    server.use(bodyParser.json())
    console.log(process.env.TEST );

    server.get('/robots.txt',(req,res)=>{
        console.log(path.dirname )
        return res.status(200).sendFile('robots.txt',robotsOptions)
    });
    server.post('/api/v1/users/register',(req,res)=>{userController.register(req,res)});
    server.post('/api/v1/users/login',(req,res)=>{userController.login(req,res)});
    server.post('/api/v1/users/getUserInfo',authMiddleware,(req,res)=>{userController.getUserInfo(req,res)});

    server.get('*',(req,res)=>{
        return handle(req,res)
    });
    server.listen(PORT,(err)=>{
        if (err) throw err;
        console.log( `server run on ${PORT}`)
    })
}).catch((ex)=>{
    console.log( 'exit error:',ex.stack)
})



// video 16 server side support