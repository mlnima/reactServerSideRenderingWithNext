import 'module-alias/register';
// import dotenv from 'dotenv';
// dotenv.config({ path: '../../.env' });
import { connectToDatabase, createExpressServer } from 'custom-server-util';
connectToDatabase('Socket Server');
import express from 'express';
import cors from 'cors';
import { initializeSocket } from './controllers/socketController';
import initializeChatroomsToStore from "./utils/initializeChatroomsToStore";

const runSocketServer = async () => {
    try {
        const app = express();
        const server = await createExpressServer(app);
        app.use(cors());

        app.get('/', (req, res) => {
            res.send(`server running on ${process.env.SOCKET_SERVER_PORT}`)
        });
        app.get('/*', (req, res) => {
            res.end()
        });
        app.post('/*', (req, res) => {
            res.end()
        });

        server.listen(process.env.SOCKET_SERVER_PORT || 3005, () => {
            console.log(`process ${process.pid} : socket server is running at ${process.env.SOCKET_SERVER_PORT}`);
        });

        const io = require('socket.io')(server, {
            origin: [process.env.NEXT_PUBLIC_PRODUCTION_URL, '*'],
            cors: true,
            handlePreflightRequest: (req, res) => {
                res.writeHead(200, {
                    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_PRODUCTION_URL,
                    "Access-Control-Allow-Methods": "GET,POST",
                    "Access-Control-Allow-Headers": "my-custom-header",
                    "Access-Control-Allow-Credentials": true
                });
                res.end();
            }
        });

        await initializeChatroomsToStore()

        initializeSocket(io);

    } catch (error) {
        console.log('Socket Server Error=> ', error);
    }
}

runSocketServer();
