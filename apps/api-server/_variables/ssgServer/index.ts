import dotenv from 'dotenv';
dotenv.config();
import {connectToDatabase} from 'custom-server-util';
connectToDatabase('Express Server')

import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from 'path';
import {adminAuthMiddleware} from 'custom-server-util';
import xmlParser from 'express-xml-bodyparser';
import apiCache from 'apicache';
import cors from 'cors';
import compression from 'compression';
import shouldCompress from 'custom-server-util/src/shouldCompress';
import cacheSuccesses from '../../middlewares/apiCache';
import adminMainRouter from '../../controllers/adminControllers/adminMainRouter';
import clientMainRouter from '../../controllers/clientControllers/clientMainRouter';


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/admin', adminMainRouter);
app.use('/api/v1', clientMainRouter);


//@ts-ignore
app.listen(process.env.PORT || 3000, (error) => {
    if (error) throw error
    console.log(`process ${process.pid} : server ${process.env.PORT || 3000} `)
})