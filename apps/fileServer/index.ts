import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import connectToDatabase from 'custom-server-util/src/connectToDatabase';
connectToDatabase('File Server')
import express from 'express';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import xmlParser from 'express-xml-bodyparser';
import path from 'path';
import apiCache from 'apicache';
import cors from 'cors';
import bodyParser from "body-parser";

const server = express();
const dev = process.env.NODE_ENV !== 'production';


const fileServer = ()=>{
    server.use(cors())
    server.use(cookieParser());
    server.use(fileUpload());
    server.use(bodyParser.json());
    server.use(xmlParser());

    server.listen(process.env.FILE_SERVER_PORT || 3002, () => {
        console.log(`process ${process.pid} : file server started at ${process.env.FILE_SERVER_PORT || 3002} `)
    })
}

fileServer()