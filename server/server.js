const express = require('express');
const next = require('next');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userController = require('./controllers/userControllers');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

mongoose.connect("mongodb://localhost:27017/nextDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB not connected', err));

app.prepare().then(()=>{
    const server = express();
    server.use(bodyParser.json())
    console.log(process.env.TEST );

    server.post('/api/v1/users/register',(req,res)=>{userController.register(req,res)});
    server.post('/api/v1/users/login',(req,res)=>{userController.login(req,res)});

    server.get('*',(req,res)=>{
        return handle(req,res)
    });
    server.listen(3000,(err)=>{
        if (err) throw err
        console.log( 'server is ready on 3000')
    })
}).catch((ex)=>{
    console.log( 'exit error:',ex.stack)
})



// video 16 server side support